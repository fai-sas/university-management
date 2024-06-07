import { TOfferedCourse } from './offeredCourse.interface'

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {}

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {}

const getSingleOfferedCourseFromDB = async (id: string) => {}

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>
) => {}

const deleteOfferedCourseFromDB = async (id: string) => {}

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  deleteOfferedCourseFromDB,
}
