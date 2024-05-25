import { z } from 'zod'

const userNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First Name is required',
    })
    .max(20, 'Name can not be more than 20 characters')
    .trim(),
  middleName: z.string(),
  lastName: z
    .string({
      required_error: 'Last Name is required',
    })
    .max(20, 'Name can not be more than 20 characters')
    .trim(),
})

const guardianValidationSchema = z.object({
  fatherName: z
    .string({
      required_error: 'Father Name is required',
    })
    .trim(),
  fatherOccupation: z
    .string({
      required_error: 'Father occupation is required',
    })
    .trim(),
  fatherContactNo: z.string({
    required_error: 'Father Contact No is required',
  }),
  motherName: z.string({
    required_error: 'Mother Name is required',
  }),
  motherOccupation: z.string({
    required_error: 'Mother occupation is required',
  }),
  motherContactNo: z.string({
    required_error: 'Mother Contact No is required',
  }),
})

const localGuardianValidationSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  occupation: z.string({
    required_error: 'Occupation is required',
  }),
  contactNo: z.string({
    required_error: 'Contact number is required',
  }),
  address: z.string({
    required_error: 'Address is required',
  }),
})

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string(),
    }),
  }),
})

export const studentValidations = {
  createStudentValidationSchema,
}
