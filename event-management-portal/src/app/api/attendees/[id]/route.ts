import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.attendee.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/attendees/[id] failed:", error);
    return NextResponse.json(
      { error: "Failed to delete attendee" },
      { status: 500 }
    );
  }
}
