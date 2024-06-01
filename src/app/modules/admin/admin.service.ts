import { Admin } from './admin.model'

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {}

const getSingleAdminFromDB = async (_id: string) => {
  const result = await Admin.findById({ _id })
  return result
}

const updateAdminIntoDB = async () => {}
const deleteAdminFromDB = async () => {}

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
}
