import { JwtPayload } from 'jsonwebtoken'
import { TLoginUser } from './auth.interface'
import { User } from '../user/user.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { createToken } from './auth.utils'
import config from '../../config'

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
) => {}

const refreshToken = async (token: string) => {}

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
}
