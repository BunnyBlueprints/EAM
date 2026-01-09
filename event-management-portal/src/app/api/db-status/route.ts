import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const events = await prisma.event.count();
    const attendees = await prisma.attendee.count();
    const sample = await prisma.event.findMany({ take: 5, select: { id: true, title: true } });

    return NextResponse.json({ events, attendees, sample });
  } catch (error: any) {
    return NextResponse.json({ error: String(error?.message ?? error) }, { status: 500 });
  }
}
