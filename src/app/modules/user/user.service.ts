/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { TAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'
import { Faculty } from '../faculty/faculty.model'
import { TFaculty } from '../faculty/faculty.interface'
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary'

const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: TStudent
) => {
  // create an user object
  const userData: Partial<TUser> = {}

  // use default password if password is not given
  userData.password = password || (config.default_password as string)

  // set user role
  userData.role = 'student'
  userData.email = payload.email

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  )

  if (!admissionSemester) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Admission Semester Not Found')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set generated id
    userData.id = await generateStudentId(admissionSemester)

    const imageName = `${userData.id}${payload?.name?.firstName}`
    const path = file?.path
    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path)

    // create an user (transaction-1)
    const newUser = await User.create([userData], { session }) // array

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    // set id, id as user

    payload.id = newUser[0].id // auto generated id
    payload.user = newUser[0]._id // reference id
    payload.profileImg = secure_url

    // create a student (transaction-2)
    const newStudent = await Student.create([payload], { session }) // array

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, `${error?.message}`)
    }

    await session.commitTransaction()
    await session.endSession()

    return newStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, `${error?.message}`)
  }
}

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {}

  //if password is not given , use default password
  userData.password = password || (config.default_password as string)

  //set student role
  userData.role = 'admin'
  userData.email = payload.email

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // userData.id = 'A-0001'
    userData.id = await generateAdminId()

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session })

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session })

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }

    await session.commitTransaction()
    await session.endSession()

    return newAdmin
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    console.log(err)
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
  }
}

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {}

  //if password is not given , use default password
  userData.password = password || (config.default_password as string)

  //set student role
  userData.role = 'faculty'
  userData.email = payload.email

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // userData.id = 'A-0001'
    userData.id = await generateFacultyId()

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session })

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a admin (transaction-2)
    const newFaculty = await Faculty.create([payload], { session })

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty')
    }

    await session.commitTransaction()
    await session.endSession()

    return newFaculty
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty')
  }
}

const getCurrentUser = async (userId: string, role: string) => {
  let result = null
  if (role === 'student') {
    result = await Student.findOne({ id: userId }).populate('user')
  }
  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user')
  }

  if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId }).populate('user')
  }

  return result
}

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })

  return result
}

export const UserServices = {
  createStudentIntoDB,
  createAdminIntoDB,
  createFacultyIntoDB,
  getCurrentUser,
  changeStatus,
}
