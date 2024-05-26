import express from 'express'
import { AcademicSemesterControllers } from './academicSemester.controller'

const router = express.Router()

router.post(
  '/create-student',
  AcademicSemesterControllers.createAcademicSemester
)

export const AcademicSemesterRoutes = router
