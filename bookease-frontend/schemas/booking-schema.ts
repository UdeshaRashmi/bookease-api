import { z } from 'zod';

function getTodayDateString() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export const bookingSchema = z.object({
  customerName: z.string().trim().min(1, 'Customer name is required'),

  customerEmail: z
    .string()
    .trim()
    .min(1, 'Customer email is required')
    .email('Enter a valid email address'),

  customerPhone: z.string().trim().min(1, 'Customer phone number is required'),

  serviceId: z.string().trim().min(1, 'Please select a service'),

  bookingDate: z
    .string()
    .min(1, 'Booking date is required')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Enter a valid booking date')
    .refine((date) => date >= getTodayDateString(), {
      message: 'Booking date cannot be in the past',
    }),

  bookingTime: z
    .string()
    .min(1, 'Booking time is required')
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      'Booking time must be in HH:mm format',
    ),

  notes: z.string().trim().optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
