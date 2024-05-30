import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create an user object
  const userData: Partial<TUser> = {}

  // use default password if password is not given
  userData.password = password || (config.default_password as string)

  // set user role
  userData.role = 'student'

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  )

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set generated id
    userData.id = await generateStudentId(admissionSemester)

    // create an user (transaction-1)
    const newUser = await User.create([userData], { session }) // array

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    // set id, id as user

    payload.id = newUser[0].id // auto generated id
    payload.user = newUser[0]._id // reference id

    // create a student (transaction-2)
    const newStudent = await Student.create([payload], { session }) // array

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
  }
}

export const UserServices = {
  createStudentIntoDB,
}
