import catchAsync from '../../utils/catchAsync'

const createSemesterRegistration = catchAsync(async (req, res) => {})
const getAllSemesterRegistrations = catchAsync(async (req, res) => {})
const getSingleSemesterRegistration = catchAsync(async (req, res) => {})
const updateSemesterRegistration = catchAsync(async (req, res) => {})
const deleteSemesterRegistration = catchAsync(async (req, res) => {})

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
}
