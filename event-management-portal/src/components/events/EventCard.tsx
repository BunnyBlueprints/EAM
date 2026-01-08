'use client';

import { Calendar, Users, Trash2, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  capacity: number;
  attendeeCount?: number;
}

interface EventCardProps {
  event: Event;
  onSelect: () => void;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

export function EventCard({ event, onSelect, onDelete, isDeleting }: EventCardProps) {
  const attendeeCount = event.attendeeCount || 0;
  const isFull = attendeeCount >= event.capacity;
  
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onSelect}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{event.title}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(event.id);
            }}
            disabled={isDeleting}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
        <CardDescription className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700">{event.description}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="h-4 w-4" />
            <span>
              {attendeeCount} / {event.capacity} registered
            </span>
          </div>
          {isFull && (
            <span className="text-red-600 font-medium">Full</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}