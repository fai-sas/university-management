import { Student } from './student.model'

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
  return result
}

const getSingleStudentFromDB = async (_id: string) => {
  const result = await Student.findOne({ _id })

  // const result = await Student.aggregate([{ $match: { id } }])

  return result
}

const deleteStudentFromDB = async (_id: string) => {
  const result = await Student.updateOne({ _id }, { isDeleted: true })
  return result
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
}
