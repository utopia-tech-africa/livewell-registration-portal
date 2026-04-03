import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { name, phone, email } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing registration ID" },
        { status: 400 },
      );
    }

    const registration = await prisma.registration.update({
      where: { id },
      data: {
        name,
        phone,
        email: email || null,
      },
    });

    return NextResponse.json(registration);
  } catch (error) {
    console.error("PATCH /api/registrations/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update registration" },
      { status: 500 },
    );
  }
}
