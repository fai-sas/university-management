import { z } from 'zod'

const userNameSchema = z.object({
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

const guardianSchema = z.object({
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

const localGuardianSchema = z.object({
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

export const studentValidationSchema = z.object({
  id: z
    .string({
      required_error: 'ID is required',
    })
    .nonempty('ID is required'),
  password: z.string().max(20),
  name: userNameSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email address'),
  contactNo: z.string({
    required_error: 'Contact number is required',
  }),
  emergencyContactNo: z.string({
    required_error: 'Emergency contact number is required',
  }),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string({
    required_error: 'Present address is required',
  }),
  permanentAddress: z.string({
    required_error: 'Permanent address is required',
  }),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: z.string().optional(),
  isActive: z
    .enum(['active', 'blocked'], {
      errorMap: () => ({ message: 'isActive must be one of: active, blocked' }),
    })
    .default('active'),
  isDeleted: z.boolean().default(false),
})

export default studentValidationSchema
