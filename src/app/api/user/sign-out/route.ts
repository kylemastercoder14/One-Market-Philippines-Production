import { NextResponse } from "next/server";
import { signOut } from "@/lib/auth";

export async function POST() {
  try {
    await signOut();
    return new NextResponse("Logout successfully", { status: 201 });
  } catch (error) {
    console.error("[USER_POST_LOGOUT_ERROR]", error);
    return new NextResponse(
      JSON.stringify({
        message: "An error occurred while logging out. Please try again.",
        error: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}
