'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { EventFormData } from '@/lib/validations';

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  capacity: number;
  attendeeCount?: number;
}

export function useEvents() {
  const queryClient = useQueryClient();

  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: async () => {
      const res = await fetch('/api/events');
      if (!res.ok) throw new Error('Failed to fetch events');
      return res.json();
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: EventFormData) => {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to create event');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/events/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete event');
      return id;
    },
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['events'] });

      const previous = queryClient.getQueryData<Event[]>(['events']);

      queryClient.setQueryData<Event[]>(['events'], (old = []) =>
        old.filter(event => event.id !== id)
      );

      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['events'], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    }
  });

  return {
    events,
    isLoading,
    createEvent: createMutation.mutateAsync,
    deleteEvent: deleteMutation.mutateAsync,
    deletingId: deleteMutation.variables ?? null
  };
}
