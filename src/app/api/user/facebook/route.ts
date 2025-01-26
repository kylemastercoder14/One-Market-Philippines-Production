import { NextResponse } from "next/server";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function POST() {
  try {
    await signIn("facebook", { redirectTo: "/" });

    return new NextResponse("Login successfully", { status: 201 });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "OAuthCallbackError":
          return new NextResponse("Something went wrong", { status: 401 });
        default:
          return new NextResponse("An error occurred", { status: 500 });
      }
    }

    throw error;
  }
}
