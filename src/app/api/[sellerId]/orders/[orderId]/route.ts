import { NextResponse } from "next/server";

// This is the route file for the orders endpoint. It is used for updating an existing order for a specific seller.
export async function PATCH(
  req: Request,
  { params }: { params: { sellerId: string; orderId: string } }
) {
  try {
    if (!params.sellerId || !params.orderId) {
      return new NextResponse("Seller ID and Order ID are required", {
        status: 400,
      });
    }
  } catch (error) {
    console.error("[SELLERID_PATCH_ORDERID_ERROR]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

// This is the route file for the orders endpoint. It is used for deleting an existing order for a specific seller.
export async function DELETE(
  req: Request,
  { params }: { params: { sellerId: string; orderId: string } }
) {
  try {
    if (!params.sellerId || !params.orderId) {
      return new NextResponse("Seller ID and Order ID are required", {
        status: 400,
      });
    }
  } catch (error) {
    console.error("[SELLERID_DELETE_ORDERID_ERROR]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
