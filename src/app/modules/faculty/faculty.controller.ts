import catchAsync from '../../utils/catchAsync'

const getAllFaculties = catchAsync(async (req, res) => {})
const getSingleFaculty = catchAsync(async (req, res) => {})
const updateFaculty = catchAsync(async (req, res) => {})
const deleteFaculty = catchAsync(async (req, res) => {})

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
