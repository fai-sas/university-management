import config from '../../config'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create an user object
  const userData: Partial<TUser> = {}

  // use default password if password is not given
  userData.password = password || (config.default_password as string)

  // set user role
  userData.role = 'student'

  // set manually generated id
  userData.id = '2030100001'

  // create an user
  const newUser = await User.create(userData)

  if (Object.keys(newUser).length) {
    // set id, _id as user
    studentData.id = newUser.id
    studentData.user = newUser._id // reference id

    const newStudent = await Student.create(studentData)
    return newStudent
  }
}

export const UserServices = {
  createStudentIntoDB,
}
