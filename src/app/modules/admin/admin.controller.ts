import catchAsync from '../../utils/catchAsync'

const getAllAdmins = catchAsync(async (req, res) => {})
const getSingleAdmin = catchAsync(async (req, res) => {})
const updateAdmin = catchAsync(async (req, res) => {})
const deleteAdmin = catchAsync(async (req, res) => {})

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
}
