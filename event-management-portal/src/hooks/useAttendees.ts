'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { AttendeeFormData } from '@/lib/validations';

interface Attendee {
  id: number;
  name: string;
  email: string;
  eventId: number;
}

export function useAttendees(eventId: number, onRefresh: () => void) {
  const queryClient = useQueryClient();

  const { data: attendees = [], isLoading } = useQuery<Attendee[]>({
    queryKey: ['attendees', eventId],
    queryFn: async () => {
      const res = await fetch(`/api/attendees?eventId=${eventId}`);
      if (!res.ok) throw new Error('Failed to fetch attendees');
      return res.json();
    },
    enabled: !!eventId
  });

  const registerMutation = useMutation({
    mutationFn: async (data: AttendeeFormData) => {
      const res = await fetch('/api/attendees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to register attendee');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendees', eventId] });
      onRefresh();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/attendees/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete attendee');
      return id;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['attendees', eventId] });
      const previous = queryClient.getQueryData(['attendees', eventId]);
      queryClient.setQueryData(['attendees', eventId], (old: Attendee[] = []) =>
        old.filter(a => a.id !== id)
      );
      return { previous };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(['attendees', eventId], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['attendees', eventId] });
      onRefresh();
    }
  });

  return {
    attendees,
    isLoading,
    registerAttendee: registerMutation.mutateAsync,
    deleteAttendee: deleteMutation.mutateAsync,
    deletingId: deleteMutation.variables
  };
}