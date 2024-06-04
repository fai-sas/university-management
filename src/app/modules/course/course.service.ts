import { TCourse } from './course.interface'

const createCourseIntoDB = async (payload: TCourse) => {}
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {}
const getSingleCourseFromDB = async (id: string) => {}
const updateCourseIntoDB = async (
  id: string,
  payload: Record<string, unknown>
) => {}
const deleteCourseFromDB = async (id: string) => {}
const assignFacultiesWithCourseIntoDB = async () => {}
const removeFacultiesFromCourseFromDB = async () => {}

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB,
}
