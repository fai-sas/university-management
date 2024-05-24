import { Router } from 'express'
import { StudentRoutes } from '../modules/student/student.route'
import { UserRoutes } from '../modules/user/user.route'

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
]

moduleRoutes.forEach((route) => router.use(route.path, route.routes))

export default router
