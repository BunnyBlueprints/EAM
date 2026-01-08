'use client';

import { useState } from 'react';
import { Users } from 'lucide-react';
import { EventList } from '@/components/events/EventList';
import { AttendeeList } from '@/components/attendees/AttendeeList';
import { useEvents } from '@/hooks/useEvents';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  capacity: number;
  attendeeCount?: number;
}

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { toast } = useToast();
  
  const { events, isLoading, createEvent, deleteEvent, deletingId } = useEvents();

  const showToast = (message: string, type: 'success' | 'error') => {
    toast({
      title: type === 'success' ? 'Success' : 'Error',
      description: message,
      variant: type === 'error' ? 'destructive' : 'default',
    });
  };

  const handleCreateEvent = async (data: any) => {
    try {
      await createEvent(data);
      showToast('Event created successfully!', 'success');
    } catch (error) {
      showToast('Failed to create event', 'error');
      throw error;
    }
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      await deleteEvent(id);
      if (selectedEvent?.id === id) setSelectedEvent(null);
      showToast('Event deleted successfully!', 'success');
    } catch (error) {
      showToast('Failed to delete event', 'error');
      throw error;
    }
  };

  const handleRefresh = () => {
    // Events will auto-refresh via TanStack Query
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Event Management Portal</h1>
          <p className="text-gray-600 mt-1">Manage events and attendee registrations</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <EventList
            events={events}
            isLoading={isLoading}
            onSelectEvent={setSelectedEvent}
            onDeleteEvent={handleDeleteEvent}
            onCreateEvent={handleCreateEvent}
            deletingId={deletingId}
            showToast={showToast}
          />

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Attendee Management</h2>
            
            {selectedEvent ? (
              <Card>
                <div className="p-6">
                  <CardTitle className="mb-2">{selectedEvent.title}</CardTitle>
                  <CardDescription className="mb-6">
                    {new Date(selectedEvent.date).toLocaleDateString()}
                  </CardDescription>
                  <AttendeeList
                    event={selectedEvent}
                    showToast={showToast}
                    onRefresh={handleRefresh}
                  />
                </div>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-12">
                  <Users className="h-16 w-16 text-gray-400 mb-4" />
                  <CardTitle className="mb-2">Select an event</CardTitle>
                  <CardDescription>
                    Choose an event from the list to manage attendees
                  </CardDescription>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}