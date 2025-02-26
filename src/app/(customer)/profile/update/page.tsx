import React from "react";
import UpdateProfileClient from "./client";
import { auth } from "@/lib/auth";
import db from "@/lib/db";

const UpdateProfile = async () => {
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
        <UpdateProfileClient
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

export default UpdateProfile;
