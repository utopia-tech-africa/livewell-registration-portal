import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, phone, email } = await request.json();

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const registration = await prisma.registration.create({
      data: {
        name,
        phone,
        email: email || null,
      },
    });

    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    console.error("POST /api/registrations error:", error);
    return NextResponse.json(
      { error: "Failed to create registration" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(registrations);
  } catch (error) {
    console.error("GET /api/registrations error:", error);
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 },
    );
  }
}
