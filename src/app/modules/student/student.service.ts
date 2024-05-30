import mongoose from 'mongoose'
import { Student } from './student.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })

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
  deleteStudentFromDB,
}
