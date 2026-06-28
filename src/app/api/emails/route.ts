import { NextResponse } from "next/server";
import { getSentEmails } from "@/lib/db";

export async function GET() {
  try {
    const emails = getSentEmails();
    return NextResponse.json(emails);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch sent emails log", details: error.message },
      { status: 500 }
    );
  }
}
