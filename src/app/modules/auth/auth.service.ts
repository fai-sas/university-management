import { JwtPayload } from 'jsonwebtoken'
import { TLoginUser } from './auth.interface'

const loginUser = async (payload: TLoginUser) => {}

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
