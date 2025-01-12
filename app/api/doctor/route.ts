import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const doctor = await prisma.doctorProfile.findUnique({
      where: {
        userId: req.auth.user?.id,
      },
    });

    return NextResponse.json(doctor);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch doctor data" },
      { status: 500 }
    );
  }
});

export const POST = auth(async function POST(req) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  const data = req.body as any;

  try {
    const doctor = await prisma.doctorProfile.create({
      data: {
        ...data,
        userId: req.auth.user?.id,
      },
    });

    return NextResponse.json(doctor);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create doctor data" },
      { status: 500 }
    );
  }
});

export const PUT = auth(async function PUT(req) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  const data = req.body as any;

  try {
    const doctor = await prisma.doctorProfile.update({
      where: {
        userId: req.auth.user?.id,
      },
      data,
    });

    return NextResponse.json(doctor);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update doctor data" },
      { status: 500 }
    );
  }
});
