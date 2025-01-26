import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email } = body;

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    return NextResponse.json(existingUser);
  } catch (error) {
    console.error("[USER_POST_LOIGN_ERROR]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
