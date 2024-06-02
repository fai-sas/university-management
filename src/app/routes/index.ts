import { Router } from 'express'
import { StudentRoutes } from '../modules/student/student.route'
import { UserRoutes } from '../modules/user/user.route'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route'
import { AdminRoutes } from '../modules/admin/admin.route'
import { FacultyRoutes } from '../modules/faculty/faculty.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/students',
    routes: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    routes: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    routes: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    routes: AcademicDepartmentRoutes,
  },
  {
    path: '/admins',
    routes: AdminRoutes,
  },
  {
    path: '/faculties',
    routes: FacultyRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.routes))

export default router
