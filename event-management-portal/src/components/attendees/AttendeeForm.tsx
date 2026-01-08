'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { attendeeSchema, type AttendeeFormData } from '@/lib/validations';

interface AttendeeFormProps {
  eventId: number;
  isFull: boolean;
  onSuccess: (message: string, type: 'success' | 'error') => void;
  onSubmit: (data: Omit<AttendeeFormData, 'eventId'>) => Promise<void>;
}

export function AttendeeForm({ eventId, isFull, onSuccess, onSubmit }: AttendeeFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<Omit<AttendeeFormData, 'eventId'>>({
    resolver: zodResolver(attendeeSchema.omit({ eventId: true }))
  });

  const handleFormSubmit = async (data: Omit<AttendeeFormData, 'eventId'>) => {
    try {
      await onSubmit(data);
      reset();
      onSuccess('Attendee registered successfully!', 'success');
    } catch (error: any) {
      onSuccess(error.message || 'Failed to register attendee', 'error');
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register('name')}
          disabled={isFull}
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          disabled={isFull}
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {isFull ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>This event is at full capacity</AlertDescription>
        </Alert>
      ) : (
        <Button
          onClick={handleSubmit(handleFormSubmit)}
          disabled={isSubmitting}
          className="w-full"
          variant="default"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Registering...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Register Attendee
            </>
          )}
        </Button>
      )}
    </div>
  );
}