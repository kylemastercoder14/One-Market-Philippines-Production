/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, slug } = body;

    const newCategory = await db.category.create({
      data: {
        name,
        slug,
      },
    });

    return NextResponse.json(newCategory);
  } catch (error) {
    console.error("[POST_CATEGORIES_ERROR]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("[GET_CATEGORIES_ERROR]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
