import { TCourse } from './course.interface'

const createCourseIntoDB = async (payload: TCourse) => {}
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {}
const getSingleCourseFromDB = async () => {}
const updateCourseIntoDB = async () => {}
const deleteCourseFromDB = async () => {}
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
