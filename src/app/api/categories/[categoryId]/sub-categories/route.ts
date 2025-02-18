import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { categoryId } = params;

    if (!categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    const subCategories = await db.subCategory.findMany({
      orderBy: { name: "asc" },
      where: { categorySlug: categoryId },
    });

    return NextResponse.json(subCategories);
  } catch (error) {
    console.error("[GET_SUBCATEGORIES_ERROR]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
