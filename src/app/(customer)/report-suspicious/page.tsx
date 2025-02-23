
import React from 'react'
import ReportSuspiciousClient from './client'
import { auth } from '@/lib/auth';

const ReportSuspicious = async () => {
  const session = await auth();
    const data = session?.user;
  return (
    <ReportSuspiciousClient userId={data?.id ?? null} />
  )
}

export default ReportSuspicious
