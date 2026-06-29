import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

export interface BetaRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  occupation: string;
  reason: string;
  expectation: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  approvedAt: string | null;
}

export interface SentEmail {
  id: string;
  recipientName: string;
  recipientEmail: string;
  sentAt: string;
  subject: string;
  body: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "requests.json");
const EMAILS_PATH = path.join(DATA_DIR, "sent_emails.json");

// Ensure the data folder and files exist
function initDB() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(EMAILS_PATH)) {
    fs.writeFileSync(EMAILS_PATH, JSON.stringify([], null, 2));
  }
}

export async function getRequests(): Promise<BetaRequest[]> {
  const SHEET_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (SHEET_URL) {
    try {
      const res = await fetch(SHEET_URL, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to read from Google Sheet Webhook");
      const list = await res.json();
      return Array.isArray(list) ? list : [];
    } catch (err) {
      console.error("Google Sheets read failed, falling back to local file:", err);
    }
  }

  initDB();
  const data = fs.readFileSync(FILE_PATH, "utf-8");
  return JSON.parse(data);
}

export async function saveRequests(requests: BetaRequest[]) {
  if (process.env.VERCEL === "1") {
    return;
  }
  try {
    initDB();
    fs.writeFileSync(FILE_PATH, JSON.stringify(requests, null, 2));
  } catch (err) {
    console.error("Local requests write failed:", err);
  }
}

export async function addRequest(request: Omit<BetaRequest, "id" | "status" | "createdAt" | "approvedAt">): Promise<BetaRequest> {
  const newRequest: BetaRequest = {
    ...request,
    id: Math.random().toString(36).substring(2, 9),
    status: "pending",
    createdAt: new Date().toISOString(),
    approvedAt: null,
  };

  const SHEET_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (SHEET_URL) {
    try {
      await fetch(SHEET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRequest),
      });
      return newRequest;
    } catch (err) {
      console.error("Google Sheets insert failed, writing to local file:", err);
    }
  }

  const requests = await getRequests();
  requests.push(newRequest);
  await saveRequests(requests);
  return newRequest;
}

export async function approveRequest(id: string): Promise<{ success: boolean; emailSent: boolean; error?: string }> {
  const requests = await getRequests();
  const index = requests.findIndex((r) => r.id === id);
  if (index === -1) return { success: false, emailSent: false, error: "Request not found" };
  
  if (requests[index].status === "approved") {
    return { success: true, emailSent: false, error: "Already approved" };
  }

  const approvedAt = new Date().toISOString();
  requests[index].status = "approved";
  requests[index].approvedAt = approvedAt;

  const SHEET_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (SHEET_URL) {
    try {
      await fetch(SHEET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          action: "approve",
          approvedAt
        }),
      });
    } catch (err) {
      console.error("Google Sheets update failed:", err);
    }
  }

  await saveRequests(requests);

  // Simulate sending email: write to sent_emails.json
  const emailsData = fs.readFileSync(EMAILS_PATH, "utf-8");
  const emails: SentEmail[] = JSON.parse(emailsData);
  
  const subject = "Your Thursday OS Beta Invitation Approved";
  const body = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Thursday OS Beta Access</title>
      <style>
        body {
          background-color: #050505;
          color: #F4F4F5;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          margin: 0;
          padding: 0;
        }
        .wrapper {
          width: 100%;
          background-color: #050505;
          padding: 40px 20px;
          box-sizing: border-box;
        }
        .container {
          max-width: 580px;
          margin: 0 auto;
          background: #0E0E0E;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 40px;
          box-sizing: border-box;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }
        .logo {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: #5B8CFF;
          text-transform: uppercase;
          margin-bottom: 24px;
          text-align: center;
        }
        h1 {
          font-size: 24px;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #FFFFFF;
          margin: 0 0 16px 0;
          text-align: center;
        }
        .intro-text {
          font-size: 14px;
          line-height: 1.6;
          color: #A1A1AA;
          margin: 0 0 24px 0;
          text-align: center;
        }
        .btn-container {
          text-align: center;
          margin-bottom: 32px;
        }
        .btn {
          display: inline-block;
          background: #FFFFFF;
          color: #000000 !important;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-decoration: none;
          padding: 14px 32px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.15);
        }
        .divider {
          border: 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          margin: 32px 0;
        }
        .section-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #5B8CFF;
          margin-bottom: 12px;
        }
        .guide-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 24px;
        }
        ol {
          margin: 0;
          padding-left: 20px;
        }
        li {
          font-size: 13px;
          line-height: 1.6;
          color: #D4D4D8;
          margin-bottom: 8px;
        }
        li strong {
          color: #FFFFFF;
        }
        .community-box {
          background: rgba(39, 201, 63, 0.03);
          border: 1px solid rgba(39, 201, 63, 0.12);
          border-radius: 16px;
          padding: 20px;
          text-align: center;
        }
        .community-title {
          font-size: 13px;
          font-weight: 600;
          color: #27C93F;
          margin-bottom: 6px;
        }
        .community-link {
          font-size: 13px;
          color: #27C93F;
          text-decoration: none;
          font-weight: 600;
        }
        .footer {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.2);
          text-align: center;
          margin-top: 32px;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="logo">THURSDAY OS</div>
          <h1>Welcome to the Future, ${requests[index].name}</h1>
          <p class="intro-text">Your request for early access to the Thursday Closed Beta has been approved. The planner engine and spatial identity core are ready to initialize.</p>
          
          <div class="btn-container">
            <a href="https://drive.google.com/file/d/1uIo67oMwrJ5Dp1LtJ09L7o3dC_tQI-wz/view?usp=sharing" class="btn">Download Installer (v0.9.0)</a>
          </div>

          <div class="guide-box">
            <div class="section-title">Installation Guide</div>
            <ol>
              <li>Download the unified Windows executable: <code>thursday_setup.exe</code>.</li>
              <li>Launch the installer and accept all system security prompts.</li>
              <li>Authenticate your login using your approved email: <strong>${requests[index].email}</strong>.</li>
            </ol>
          </div>

          <div class="community-box">
            <div class="community-title">💬 WhatsApp Beta Community</div>
            <div style="font-size: 12px; color: #A1A1AA; margin-bottom: 12px; line-height: 1.5;">Join our exclusive WhatsApp community to share feedback, report bugs, and interact with the founders directly.</div>
            <a href="https://chat.whatsapp.com/EhxUhQlXpUG5aUf27vwXPc" class="community-link">Join WhatsApp Community &rarr;</a>
          </div>

          <div class="divider"></div>

          <div class="section-title" style="text-align: center;">Release notes (v0.9.0 Beta)</div>
          <div style="font-size: 11px; color: #71717A; line-height: 1.6; text-align: center; max-width: 400px; margin: 0 auto;">
            Three.js core liquid-glass rendering • Autonomous scheduling and calendar integrations • Zero-latency local vector indexing.
          </div>

          <div class="footer">
            Thursday OS • Secure Beta Channel • Control Room Dispatch
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  // Simulate sending email: write to sent_emails.json if not on Vercel
  if (process.env.VERCEL !== "1") {
    try {
      const emailsData = fs.readFileSync(EMAILS_PATH, "utf-8");
      const emails: SentEmail[] = JSON.parse(emailsData);
      
      const emailPayload: SentEmail = {
        id: Math.random().toString(36).substring(2, 9),
        recipientName: requests[index].name,
        recipientEmail: requests[index].email,
        sentAt: new Date().toISOString(),
        subject,
        body
      };
      
      emails.push(emailPayload);
      fs.writeFileSync(EMAILS_PATH, JSON.stringify(emails, null, 2));
    } catch (err) {
      console.error("Local email log write failed:", err);
    }
  }

  // Check if Resend API Key exists
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const resendFrom = process.env.RESEND_FROM || "onboarding@resend.dev";
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: resendFrom,
          to: [requests[index].email],
          subject: subject,
          html: body,
        }),
      });

      if (response.ok) {
        console.log(`[RESEND EMAIL SENT] Recipient: ${requests[index].email} | Subject: ${subject}`);
        return { success: true, emailSent: true };
      } else {
        const errorData = await response.json();
        console.error(`[RESEND ERROR] Failed to send:`, errorData);
        return { success: true, emailSent: false, error: errorData.message || "Resend API error" };
      }
    } catch (err: any) {
      console.error(`[RESEND ERROR] Exception: ${err.message}`);
      return { success: true, emailSent: false, error: err.message };
    }
  }

  // Check if real SMTP config exists in environment
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || smtpUser;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort || "587"),
        secure: smtpPort === "465",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: smtpFrom,
        to: requests[index].email,
        subject: subject,
        html: body,
      });

      console.log(`[REAL EMAIL SENT] Recipient: ${requests[index].email} | Subject: ${subject}`);
      return { success: true, emailSent: true };
    } catch (err: any) {
      console.error(`[SMTP ERROR] Failed to send email to ${requests[index].email}: ${err.message}`);
      return { success: true, emailSent: false, error: err.message };
    }
  } else {
    console.log(`[MOCK EMAIL SENT] Recipient: ${requests[index].email} | Subject: ${subject} (Configure RESEND_API_KEY or SMTP parameters to send real emails)`);
    return { success: true, emailSent: false, error: "Email configuration missing. Email simulated locally." };
  }
}

export function getSentEmails(): SentEmail[] {
  initDB();
  const data = fs.readFileSync(EMAILS_PATH, "utf-8");
  return JSON.parse(data);
}
