import db from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// Since this is running in a server component, we should treat it as a utility, not a hook
export const useSeller = async () => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("Authorization");

  if (!authToken) {
    return { error: "Authorization token is missing" };
  }

  try {
    const token = authToken.value;
    // Verify JWT token using the secret
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
      sub: string;
      exp: number;
    };

    const sellerId = decodedToken.sub;

    // Fetch seller from database
    const seller = await db.seller.findFirst({
      where: {
        id: sellerId,
      },
    });

    if (!seller) {
      return { error: "Seller not found" };
    }

    return { seller, sellerId, authToken };
  } catch (error) {
    console.error(error);
    return { error: "Invalid or expired token" };
  }
};
