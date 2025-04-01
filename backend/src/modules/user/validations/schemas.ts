import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  serviceType: z.string().max(50).optional(),
  password: z.string().optional().nullable(),
  phone: z.string().nullable().optional(),
  address: z.string().max(200).nullable().optional(),
  city: z.string().max(100).nullable().optional(),
  neighborhood: z.string().max(100).nullable().optional(),
  postalCode: z.string().nullable().optional(),
  isPaymentDone: z.boolean().optional(),
});
