'use client';

import { Users, Trash2, Loader2 } from 'lucide-react';
import { AttendeeForm } from './AttendeeForm';
import { AttendeeCardSkeleton } from '../LoadingSkeleton';
import { useAttendees } from '@/hooks/useAttendees';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { AttendeeFormData } from '@/lib/validations';

interface Event {
  id: number;
  title: string;
  date: string;
  capacity: number;
}

interface AttendeeListProps {
  event: Event;
  showToast: (message: string, type: 'success' | 'error') => void;
  onRefresh: () => void;
}

export function AttendeeList({ event, showToast, onRefresh }: AttendeeListProps) {
  const { 
    attendees, 
    isLoading, 
    deletingId,
    registerAttendee, 
    deleteAttendee 
  } = useAttendees(event.id, onRefresh);

  const handleRegister = async (data: Omit<AttendeeFormData, 'eventId'>) => {
    await registerAttendee({ ...data, eventId: event.id });
  };

  const isFull = attendees.length >= event.capacity;

  if (isLoading) {
    return (
      <div className="space-y-3">
        <AttendeeCardSkeleton />
        <AttendeeCardSkeleton />
        <AttendeeCardSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AttendeeForm
        eventId={event.id}
        isFull={isFull}
        onSuccess={showToast}
        onSubmit={handleRegister}
      />

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">
          Registered Attendees ({attendees.length})
        </h3>
        
        {attendees.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-12">
              <Users className="h-12 w-12 text-gray-400 mb-3" />
              <CardDescription>No attendees registered yet</CardDescription>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {attendees.map(attendee => (
              <Card key={attendee.id} className="hover:bg-gray-50">
                <CardContent className="flex justify-between items-center p-4">
                  <div>
                    <p className="font-medium text-gray-900">{attendee.name}</p>
                    <p className="text-sm text-gray-600">{attendee.email}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteAttendee(attendee.id)}
                    disabled={deletingId === attendee.id}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    {deletingId === attendee.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}