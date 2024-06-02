import QueryBuilder from '../../builder/QueryBuilder'
import { FacultySearchableFields } from './faculty.constant'
import { TFaculty } from './faculty.interface'
import { Faculty } from './faculty.model'

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(Faculty.find(), query)
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await facultyQuery.modelQuery

  return result
}

const getSingleFacultyFromDB = async (id: string) => {}

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {}

const deleteFacultyFromDB = async (id: string) => {}

export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB,
}
