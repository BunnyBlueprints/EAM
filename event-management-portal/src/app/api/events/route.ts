import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { eventSchema } from '@/lib/validations';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        _count: {
          select: { attendees: true }
        }
      },
      orderBy: { date: 'asc' }
    });

    const eventsWithCount = events.map(event => ({
      id: event.id,
      title: event.title,
      date: event.date.toISOString(),
      description: event.description,
      capacity: event.capacity,
      attendeeCount: event._count.attendees
    }));

    return NextResponse.json(eventsWithCount);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = eventSchema.parse(body);

    const event = await prisma.event.create({
      data: {
        title: validated.title,
        date: new Date(validated.date),
        description: validated.description,
        capacity: validated.capacity
      }
    });

    return NextResponse.json({
      id: event.id,
      title: event.title,
      date: event.date.toISOString(),
      description: event.description,
      capacity: event.capacity,
      attendeeCount: 0
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 400 });
  }
}