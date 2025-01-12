import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        patientId: req.auth.user?.id,
      },
      include: {
        doctor: {
          select: {
            name: true,
            email: true,
            doctorProfile: true,
          },
        },
      },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
});
