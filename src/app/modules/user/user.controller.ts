import { NextFunction, Request, Response } from 'express'
import status from 'http-status'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: studentData } = req.body

    const result = await UserServices.createStudentIntoDB(password, studentData)

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const UserControllers = {
  createStudent,
}
