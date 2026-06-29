import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const CAREERS_FILE_PATH = path.join(DATA_DIR, "careers.json");

function initDB() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(CAREERS_FILE_PATH)) {
    fs.writeFileSync(CAREERS_FILE_PATH, JSON.stringify([], null, 2));
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, whatsapp, social, skills, linkedin, message } = body;

    // Field validations
    if (!name || !email || !phone || !whatsapp || !skills || !linkedin || !message) {
      return NextResponse.json(
        { error: "Missing required fields. All fields except social are required." },
        { status: 400 }
      );
    }

    const id = Math.random().toString(36).substring(2, 9);
    const newApplication = {
      id,
      name,
      email,
      phone,
      whatsapp,
      social: social || "",
      skills,
      linkedin,
      message,
      createdAt: new Date().toISOString(),
    };

    const SHEET_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (SHEET_URL) {
      try {
        const res = await fetch(SHEET_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "careers",
            ...newApplication,
          }),
        });
        if (!res.ok) throw new Error("Failed to post application to Google Sheets Webhook");
        return NextResponse.json({ success: true, id }, { status: 201 });
      } catch (err) {
        console.error("Google Sheets careers write failed, falling back to local file:", err);
      }
    }

    // Local fallback (only when no webhook or Vercel environment)
    if (process.env.VERCEL !== "1") {
      try {
        initDB();
        const data = fs.readFileSync(CAREERS_FILE_PATH, "utf-8");
        const applications = JSON.parse(data);
        applications.push(newApplication);
        fs.writeFileSync(CAREERS_FILE_PATH, JSON.stringify(applications, null, 2));
      } catch (err: any) {
        console.error("Local careers file write failed:", err);
      }
    }

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to submit application", details: error.message },
      { status: 500 }
    );
  }
}
