import config from '../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create an user object
  const userData: Partial<TUser> = {}

  // use default password if password is not given
  userData.password = password || (config.default_password as string)

  // set user role
  userData.role = 'student'

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  )

  // set manually generated id
  // userData.id = '2030100001'

  //set  generated id
  userData.id = await generateStudentId(admissionSemester)

  // create an user
  const newUser = await User.create(userData)

  if (Object.keys(newUser).length) {
    // set id, _id as user
    payload.id = newUser.id
    payload.user = newUser._id // reference id

    const newStudent = await Student.create(payload)
    return newStudent
  }
}

export const UserServices = {
  createStudentIntoDB,
}
