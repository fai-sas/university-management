import catchAsync from '../../utils/catchAsync'

const createOfferedCourse = catchAsync(async (req, res) => {})
const getAllOfferedCourses = catchAsync(async (req, res) => {})
const getSingleOfferedCourses = catchAsync(async (req, res) => {})
const updateOfferedCourse = catchAsync(async (req, res) => {})
const deleteOfferedCourseFromDB = catchAsync(async (req, res) => {})

export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourses,
  updateOfferedCourse,
  deleteOfferedCourseFromDB,
}
