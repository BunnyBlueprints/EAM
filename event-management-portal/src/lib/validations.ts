import { z } from 'zod';

export const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title is too long'),
  date: z.string().min(1, 'Date is required'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description is too long'),
  capacity: z.coerce.number().min(1, 'Capacity must be at least 1').max(1000, 'Capacity cannot exceed 1000')
});

export const attendeeSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  eventId: z.number()
});

export type EventFormData = z.infer<typeof eventSchema>;
export type AttendeeFormData = z.infer<typeof attendeeSchema>;