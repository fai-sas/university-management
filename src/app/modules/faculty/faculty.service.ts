import { TFaculty } from './faculty.interface'

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {}
const getSingleFacultyFromDB = async (id: string) => {}
const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {}
const deleteFacultyFromDB = async (id: string) => {}

export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB,
}
