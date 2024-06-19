import status from 'http-status'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'
import catchAsync from '../../utils/catchAsync'
import httpStatus from 'http-status'

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body

  const result = await UserServices.createStudentIntoDB(password, studentData)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  })
})

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body

  const result = await UserServices.createAdminIntoDB(password, adminData)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  })
})

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body

  const result = await UserServices.createFacultyIntoDB(password, facultyData)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  })
})

const getCurrentUser = catchAsync(async (req, res) => {
  const { userId, role } = req.user

  const result = await UserServices.getCurrentUser(userId, role)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  })
})

const changeStatus = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await UserServices.changeStatus(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated successfully',
    data: result,
  })
})

export const UserControllers = {
  createStudent,
  createAdmin,
  createFaculty,
  getCurrentUser,
  changeStatus,
}
