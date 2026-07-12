import { z } from 'zod';

import { capitalizeWords } from '@/lib/validation';

export const serviceSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Service title must contain at least 3 characters.')
    .max(100, 'Service title cannot exceed 100 characters.')
    .transform(capitalizeWords),

  description: z
    .string()
    .trim()
    .min(10, 'Description must contain at least 10 characters.')
    .max(1000, 'Description cannot exceed 1000 characters.'),

  doctorName: z
    .string()
    .trim()
    .min(2, 'Doctor name must contain at least 2 characters.')
    .max(100, 'Doctor name cannot exceed 100 characters.')
    .transform(capitalizeWords),

  duration: z
    .number({
      message: 'Duration is required.',
    })
    .int('Duration must be a whole number.')
    .min(1, 'Duration must be at least 1 minute.')
    .max(1440, 'Duration cannot exceed 1440 minutes.'),

  price: z
    .number({
      message: 'Price is required.',
    })
    .min(0, 'Price cannot be less than 0.'),

  isActive: z.boolean(),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;

export const defaultServiceFormValues: ServiceFormValues = {
  title: '',
  description: '',
  doctorName: 'Doctor A',
  duration: 30,
  price: 0,
  isActive: true,
};
