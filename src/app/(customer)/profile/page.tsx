import React from "react";
import ReviewsClient from "./client";
import { auth } from "@/lib/auth";
import db from "@/lib/db";

const Reviews = async () => {
  const session = await auth();
  const data = session?.user;
  const user = await db.user.findUnique({
    where: {
      email: data?.email ?? "",
    },
  });
  return (
    <>
      {data && (
        <ReviewsClient
          data={{
            name: user?.name ?? null,
            image: user?.image ?? null,
            id: user?.id ?? null,
            email: user?.email ?? null,
          }}
        />
      )}
    </>
  );
};

export default Reviews;
