import { StudentServices } from './student.service'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import httpStatus from 'http-status'

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retrieved successfully',
    meta: result.meta,
    data: result.result,
  })
})

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const result = await StudentServices.getSingleStudentFromDB(studentId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Student: ${studentId} retrieved successfully`,
    data: result,
  })
})

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const { student } = req.body

  const result = await StudentServices.updateStudentIntoDB(studentId, student)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  })
})

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const result = await StudentServices.deleteStudentFromDB(studentId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Student : ${studentId} deleted successfully`,
    data: result,
  })
})

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
}
