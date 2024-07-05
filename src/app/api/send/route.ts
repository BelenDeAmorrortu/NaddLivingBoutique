import EmailTemplate from "@/components/Email";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, name, message } = await req.json();
    console.log(email);
    const { data, error } = await resend.emails.send({
      from: "Acme <belendeamorrortu@gmail.com>",
      to: ["belendeamorrortu@gmail.com", email],
      subject: "Consulta",
      react: EmailTemplate({ name, message, email }),
    });

    if (error) {
      // return NextResponse.json({ error }, { status: 500 });
      console.log("error", error);
    }

    // return NextResponse.json(data);
  } catch (error) {
    // return NextResponse.json({ error }, { status: 500 });
    console.log("catch", error);
  }
}
