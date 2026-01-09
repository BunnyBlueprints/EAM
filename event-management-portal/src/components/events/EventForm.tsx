'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Loader2 } from 'lucide-react';
import { eventSchema, type EventFormData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface EventFormProps {
  onSuccess: (message: string, type: 'success' | 'error') => void;
  onCancel: () => void;
  onSubmit: (data: EventFormData) => Promise<void>;
}

export function EventForm({ onSuccess, onCancel, onSubmit }: EventFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema) as any
  });

  const handleFormSubmit = async (data: EventFormData) => {
    try {
      await onSubmit(data);
      reset();
      onSuccess('Event created successfully!', 'success');
    } catch (error) {
      onSuccess('Failed to create event', 'error');
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register('title')}
          placeholder="Annual Tech Conference"
        />
        {errors.title && (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          {...register('date')}
        />
        {errors.date && (
          <p className="text-sm text-red-600">{errors.date.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
          rows={3}
          placeholder="Describe your event..."
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="capacity">Capacity</Label>
        <Input
          id="capacity"
          type="number"
          {...register('capacity')}
          placeholder="100"
        />
        {errors.capacity && (
          <p className="text-sm text-red-600">{errors.capacity.message}</p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          onClick={handleSubmit(handleFormSubmit as any)}
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}