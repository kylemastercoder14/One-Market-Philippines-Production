"use client";

import React from "react";
import { SessionProvider as Session, useSession } from "next-auth/react";

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  return <Session session={session}>{children}</Session>;
};

export default SessionProvider;
