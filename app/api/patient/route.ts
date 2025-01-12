import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const patient = await prisma.patientProfile.findUnique({
      where: {
        userId: req.auth.user?.id,
      },
      include: {
        medicalConditions: true,
        medications: true,
        allergies: true,
        surgeries: true,
        familyHistory: true,
        socialHistory: true,
      },
    });

    return NextResponse.json(patient);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch patient data" },
      { status: 500 }
    );
  }
});

export const PUT = auth(async function PUT(req) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const updatedProfile = await prisma.patientProfile.update({
      where: {
        userId: req.auth.user?.id,
      },
      data: {
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        contactNumber: data.contactNumber,
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
});
