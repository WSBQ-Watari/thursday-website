import { NextResponse } from "next/server";
import { approveRequest } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing required request parameter: id" },
        { status: 400 }
      );
    }

    const result = await approveRequest(id);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Request not found with the provided id" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      emailSent: result.emailSent,
      error: result.error,
      message: result.emailSent ? "Request approved and invitation email sent!" : `Request approved. Email simulated locally (${result.error})`
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to approve request", details: error.message },
      { status: 500 }
    );
  }
}
