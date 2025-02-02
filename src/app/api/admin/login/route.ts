import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const admin = await db.admin.findFirst({
      where: {
        email,
      },
    });

    if (!admin) {
      return new NextResponse("Admin not found", {
        status: 404,
        statusText: "Admin not found",
      });
    }

    if (admin.password !== password) {
      return new NextResponse("Invalid password", {
        status: 401,
        statusText: "Invalid password",
      });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";

    const jwt = await new jose.SignJWT({})
      .setProtectedHeader({ alg })
      .setExpirationTime("72h")
      .setSubject(admin.id.toString())
      .sign(secret);

    (
      await // Set the cookie with the JWT
      cookies()
    ).set("Authorization", jwt, {
      httpOnly: true, // Set to true for security
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 60 * 60 * 24 * 3, // Cookie expiration (3 days in seconds)
      sameSite: "strict", // Adjust according to your needs
      path: "/", // Adjust path as needed
    });

    return new NextResponse("Login successfully", {
      status: 200,
      statusText: "Login successfully",
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("An error occurred. Please try again later.", {
      status: 500,
      statusText: "An error occurred. Please try again later.",
    });
  }
}
