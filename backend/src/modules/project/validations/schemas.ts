import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string(),
  clientId: z.coerce.number().positive(),
  status: z
    .enum([
      'PLANNING',
      'IN_PROGRESS',
      'COMPLETED',
      'PENDING_PAYMENT',
      'OVERDUE',
    ])
    .optional(),
  price: z.coerce.number().optional(),
});
export const updateProjectSchema = z.object({
  name: z.string(),
  status: z
    .enum([
      'PLANNING',
      'IN_PROGRESS',
      'COMPLETED',
      'PENDING_PAYMENT',
      'OVERDUE',
    ])
    .optional(),
  price: z.coerce.number().optional(),
});
