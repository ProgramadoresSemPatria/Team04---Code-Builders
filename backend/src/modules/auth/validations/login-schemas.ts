import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'password must have, at least, 6 digits'),
});
