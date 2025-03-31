import z from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(2, 'Name must have, at least, 2 characters'),
  email: z.string().email('Email is required'),
  password: z.string().min(6, 'Password must have, at least, 6 characters'),
  confirmPassword: z
    .string()
    .min(6, 'ConfirmPassword must have, at least, 6 characters'),
  serviceType: z
    .string()
    .min(2, 'serviceType must have, at least, 2 characters'),
});
