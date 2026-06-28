import { NextResponse } from "next/server";
import { addRequest, getRequests } from "@/lib/db";

export async function GET() {
  try {
    const requests = await getRequests();
    return NextResponse.json(requests);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch requests", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, country, occupation, reason, expectation } = body;

    if (!name || !email || !phone || !country || !occupation || !reason || !expectation) {
      return NextResponse.json(
        { error: "Missing required registry fields. All fields are required." },
        { status: 400 }
      );
    }

    const newRequest = await addRequest({
      name,
      email,
      phone,
      country,
      occupation,
      reason,
      expectation,
    });

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to submit request", details: error.message },
      { status: 500 }
    );
  }
}
