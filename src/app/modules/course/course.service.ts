import { TCourse, TCourseFaculty } from './course.interface'

const createCourseIntoDB = async (payload: TCourse) => {}

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {}

const getSingleCourseFromDB = async (id: string) => {}

const updateCourseIntoDB = async (
  id: string,
  payload: Record<string, unknown>
) => {}

const deleteCourseFromDB = async (id: string) => {}

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: TCourseFaculty
) => {}

const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<TCourseFaculty>
) => {}

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB,
}