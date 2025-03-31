import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  serviceType: z.string().max(50).optional(),
  password: z.string().min(6).optional(),
  phone: z.string().optional(),
  address: z.string().max(200).optional(),
  city: z.string().max(100).optional(),
  neighborhood: z.string().max(100).optional(),
  postalCode: z.string().optional(),
  isPaymentDone: z.boolean().optional(),
});
