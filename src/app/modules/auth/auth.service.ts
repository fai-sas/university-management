import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { TLoginUser } from './auth.interface'
import { User } from '../user/user.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { createToken } from './auth.utils'
import config from '../../config'
import { sendEmail } from '../../utils/sendEmail'

const loginUser = async (payload: TLoginUser) => {
  // check if the user exists
  const user = await User.isUserExistsByCustomId(payload.id)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }

  // check if the user is already deleted
  const isUserDeleted = user.isDeleted

  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // check if the user is blocked
  const userStatus = user.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  // check if password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')
  }

  // create token and send it to client

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  }
}

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  // check if the user is exist
  const user = await User.isUserExistsByCustomId(userData.userId)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }

  // check if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // check if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  //check if the password is correct
  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  )

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    }
  )
  // return null
}

const refreshToken = async (token: string) => {
  // check if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload

  const { userId, iat } = decoded

  // check if the user is exist
  const user = await User.isUserExistsByCustomId(userId)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }

  // check if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // check if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  )

  return {
    accessToken,
  }
}

const forgetPassword = async (userId: string) => {
  // check if the user is exist
  const user = await User.isUserExistsByCustomId(userId)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }

  // check if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // check if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m'
  )

  const resetPasswordLink = `${config.reset_password_ui_link}?id=${user.id}&token=${resetToken} `

  sendEmail(user.email, resetPasswordLink)

  console.log({ resetPasswordLink })
}

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(payload?.id)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string
  ) as JwtPayload

  //localhost:3000?id=A-0001&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI4NTA2MTcsImV4cCI6MTcwMjg1MTIxN30.-T90nRaz8-KouKki1DkCSMAbsHyb9yDi0djZU3D6QO4

  if (payload.id !== decoded.userId) {
    console.log(payload.id, decoded.userId)
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!')
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  )

  await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  )
}

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
}
