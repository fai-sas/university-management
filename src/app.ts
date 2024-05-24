import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { StudentRoutes } from './app/modules/student/student.route'
import notFound from './app/middlewares/notFound'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
import router from './app/routes'
const app: Application = express()

//parsers
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('University Management Application')
})

app.use(globalErrorHandler)
app.use(notFound)

export default app
