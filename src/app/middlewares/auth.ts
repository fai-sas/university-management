import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import AppError from '../errors/AppError'
import { TUserRole } from '../modules/user/user.interface'
import catchAsync from '../utils/catchAsync'
import config from '../config'
import { User } from '../modules/user/user.model'
import { NextFunction, Request, Response } from 'express'

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    // check if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
    }

    // check if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload

    const { role, userId, iat } = decoded

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
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, `You are not authorized !`)
    }

    req.user = decoded as JwtPayload
    next()
  })
}

export default auth
