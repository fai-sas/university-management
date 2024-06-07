import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { RegistrationStatus } from './semesterRegistration.constant'
import { TSemesterRegistration } from './semesterRegistration.interface'
import { SemesterRegistration } from './semesterRegistration.model'
import { AcademicSemester } from '../academicSemester/academicSemester.model'

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  /**
   * Step1: Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
   * Step2: Check if the semester is exist
   * Step3: Check if the semester is already registered!
   * Step4: Create the semester registration
   */

  const academicSemester = payload?.academicSemester
  console.log(academicSemester)

  //check if there any registered semester that is already 'UPCOMING'|'ONGOING'

  const isThereAnyUpcomingOrOngoingSEmester =
    await SemesterRegistration.findOne({
      $or: [
        {
          status: RegistrationStatus.UPCOMING,
        },
        { status: RegistrationStatus.ONGOING },
      ],
    })

  if (isThereAnyUpcomingOrOngoingSEmester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOngoingSEmester.status} registered semester !`
    )
  }

  // check if the semester is exist

  const isSemesterRegistrationExists = await AcademicSemester.findById(
    academicSemester
  )

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester not found !'
    )
  }

  const result = await SemesterRegistration.create(payload)
  console.log({ academicSemester, result })
  return result
}

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>
) => {}

const getSingleSemesterRegistrationsFromDB = async (id: string) => {}

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {}

const deleteSemesterRegistrationFromDB = async (id: string) => {}

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
}
