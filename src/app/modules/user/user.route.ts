import express, { NextFunction, Request, Response } from 'express'
import { UserControllers } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { createStudentValidationSchema } from '../student/student.validation'
import { createAdminValidationSchema } from '../admin/admin.validation'
import { createFacultyValidationSchema } from '../faculty/faculty.validation'
import auth from '../../middlewares/auth'
import { UserValidation } from './user.validation'
import { upload } from '../../utils/sendImageToCloudinary'

const router = express.Router()

// router.post(
//   '/create-student',
//   validateRequest(createStudentValidationSchema),
//   UserControllers.createStudent
// )

router.post(
  '/create-student',
  // auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent
)

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin
)

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty
)

router.post(
  '/change-status/:id',
  auth('admin'),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus
)

router.get(
  '/current-user',
  auth('student', 'faculty', 'admin'),
  UserControllers.getCurrentUser
)

export const UserRoutes = router
