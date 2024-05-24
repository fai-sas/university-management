import { Router } from 'express'
import { StudentRoutes } from '../modules/student/student.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/students',
    routes: StudentRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.routes))

export default router
