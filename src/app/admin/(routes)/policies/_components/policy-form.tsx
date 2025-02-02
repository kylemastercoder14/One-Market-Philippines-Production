"use client";

import { AdminPolicies } from "@prisma/client";
import React from "react";
import PrivacyForm from "./privacy-form";
import RefundForm from "./refund-form";
import TermsConditionForm from "./terms-condition-form";
import IntellectualForm from "./intellectual-form";

const PolicyForm = ({ data }: { data: AdminPolicies[] }) => {
  const adminData = data[0] || {};
  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        <div>
          <PrivacyForm policyId={adminData.id} privacy={adminData.privacy} />
          <RefundForm policyId={adminData.id} refund={adminData.refund} />
        </div>
        <div>
          <TermsConditionForm policyId={adminData.id} terms={adminData.terms} />
          <IntellectualForm
            policyId={adminData.id}
            intellectualProperty={adminData.intellectualProperty}
          />
        </div>
      </div>
    </div>
  );
};

export default PolicyForm;
