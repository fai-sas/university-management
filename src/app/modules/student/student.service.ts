import mongoose from 'mongoose'
import { Student } from './student.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { TStudent } from './student.interface'
import QueryBuilder from '../../builder/QueryBuilder'
import { studentSearchableFields } from './student.constant'
import { User } from '../user/user.model'

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await studentQuery.modelQuery

  return result
}

const getSingleStudentFromDB = async (_id: string) => {
  const result = await Student.findOne({ _id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })

  // const result = await Student.aggregate([{ $match: { id } }])

  return result
}

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }

  const result = await Student.findOneAndUpdate(
    { _id: id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    }
  )
  console.log(result)

  return result
}

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, runValidators: true, session }
    )

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }

    // get user _id from deletedStudent
    const userId = deletedStudent.user

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session, runValidators: true }
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }

    session.commitTransaction()
    session.endSession()

    return deletedStudent
  } catch (error) {
    session.abortTransaction()
    session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
  }
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
}
