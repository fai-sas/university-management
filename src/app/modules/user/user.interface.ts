/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'

export interface TUser {
  id: string
  email: string
  password: string
  needsPasswordChange: boolean
  passwordChangedAt?: Date
  role: 'admin' | 'student' | 'faculty'
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByCustomId(id: string): Promise<TUser>

  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean>

  //instance methods for checking if jwt issued before password changed
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean
}

export type TUserRole = keyof typeof USER_ROLE
