import { z } from 'zod';

export const clientSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  postalCode: z.string().optional(),
});
