'use client';

import { useState } from 'react';
import { Calendar, Plus, X } from 'lucide-react';
import { EventCard } from './EventCard';
import { EventForm } from './EventForm';
import { EventCardSkeleton } from '../LoadingSkeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { EventFormData } from '@/lib/validations';

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  capacity: number;
  attendeeCount?: number;
}

interface EventListProps {
  events: Event[];
  isLoading: boolean;
  onSelectEvent: (event: Event) => void;
  onDeleteEvent: (id: number) => Promise<void>;
  onCreateEvent: (data: EventFormData) => Promise<void>;
  deletingId: number | null;
  showToast: (message: string, type: 'success' | 'error') => void;
}

export function EventList({ 
  events, 
  isLoading, 
  onSelectEvent, 
  onDeleteEvent, 
  onCreateEvent,
  deletingId,
  showToast 
}: EventListProps) {
  const [showForm, setShowForm] = useState(false);

  const handleCreate = async (data: EventFormData) => {
    await onCreateEvent(data);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Events</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? (
            <>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </>
          )}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Event</CardTitle>
          </CardHeader>
          <CardContent>
            <EventForm 
              onSuccess={showToast}
              onCancel={() => setShowForm(false)}
              onSubmit={handleCreate}
            />
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {isLoading ? (
          <>
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </>
        ) : events.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-12">
              <Calendar className="h-16 w-16 text-gray-400 mb-4" />
              <CardTitle className="mb-2">No events yet</CardTitle>
              <CardDescription className="mb-4">
                Create your first event to get started
              </CardDescription>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </CardContent>
          </Card>
        ) : (
          events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onSelect={() => onSelectEvent(event)}
              onDelete={onDeleteEvent}
              isDeleting={deletingId === event.id}
            />
          ))
        )}
      </div>
    </div>
  );
}