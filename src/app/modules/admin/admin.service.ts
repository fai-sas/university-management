import { TAdmin } from './admin.interface'
import { Admin } from './admin.model'

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {}

const getSingleAdminFromDB = async (_id: string) => {
  const result = await Admin.findById({ _id })
  return result
}

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  const result = await Admin.findOneAndUpdate(
    { _id: id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    }
  )
  return result
}

const deleteAdminFromDB = async (id: string) => {}

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
}
