import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const patient = await prisma.patientProfile.findUnique({
      where: {
        userId: req.auth.user?.id,
      },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    const params = req.nextUrl.searchParams as any;
    let data;
    switch (params.type) {
      case "conditions":
        data = await prisma.medicalCondition.findMany({
          where: { patientId: patient.id },
        });
        break;
      case "medications":
        data = await prisma.medication.findMany({
          where: { patientId: patient.id },
        });
        break;
      case "allergies":
        data = await prisma.allergy.findMany({
          where: { patientId: patient.id },
        });
        break;
      case "surgeries":
        data = await prisma.surgery.findMany({
          where: { patientId: patient.id },
        });
        break;
      default:
        return NextResponse.json(
          { error: "Invalid record type" },
          { status: 400 }
        );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch medical records" },
      { status: 500 }
    );
  }
});

export const POST = auth(async function POST(req) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const patient = await prisma.patientProfile.findUnique({
      where: {
        userId: req.auth.user?.id,
      },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }
    const params = req.nextUrl.searchParams as any;

    let result;
    switch (params.type) {
      case "conditions":
        result = await prisma.medicalCondition.create({
          data: {
            ...data,
            patientId: patient.id,
          },
        });
        break;
      case "medications":
        result = await prisma.medication.create({
          data: {
            ...data,
            patientId: patient.id,
          },
        });
        break;
      case "allergies":
        result = await prisma.allergy.create({
          data: {
            ...data,
            patientId: patient.id,
          },
        });
        break;
      case "surgeries":
        result = await prisma.surgery.create({
          data: {
            ...data,
            patientId: patient.id,
          },
        });
        break;
      default:
        return NextResponse.json(
          { error: "Invalid record type" },
          { status: 400 }
        );
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create medical record" },
      { status: 500 }
    );
  }
});
