import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicSemesterServices } from './academicSemester.service'
import status from 'http-status'

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body
  )

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  })
})

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB()

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic semesters retrieved successfully',
    data: result,
  })
})

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params

  const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(
    semesterId
  )

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic semester retrieved successfully',
    data: result,
  })
})

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params

  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body
  )

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic semester updated successfully',
    data: result,
  })
})

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
}
