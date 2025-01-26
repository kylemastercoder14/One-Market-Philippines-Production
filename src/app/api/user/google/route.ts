import { NextResponse } from "next/server";
import { signIn } from "@/lib/auth";

export async function POST() {
  try {
    await signIn("google");
    return new NextResponse("Login successfully", { status: 201 });
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    return new NextResponse("Failed to sign in with Google", {
      status: 400,
    });
  }
}
