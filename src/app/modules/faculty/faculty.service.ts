import QueryBuilder from '../../builder/QueryBuilder'
import { FacultySearchableFields } from './faculty.constant'
import { TFaculty } from './faculty.interface'
import { Faculty } from './faculty.model'

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate('academicDepartment'),
    query
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await facultyQuery.modelQuery

  return result
}

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id).populate('academicDepartment')
  return result
}

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  const result = await Faculty.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })

  return result
}

const deleteFacultyFromDB = async (id: string) => {}

export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB,
}
