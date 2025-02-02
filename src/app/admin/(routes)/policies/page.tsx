import React from "react";
import Heading from "@/components/ui/heading";
import db from "@/lib/db";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PrivacyForm from "./_components/privacy-form";
import TermsConditionForm from "./_components/terms-condition-form";
import RefundForm from "./_components/refund-form";
import IntellectualForm from "./_components/intellectual-form";

const Policies = async () => {
  const data = await db.adminPolicies.findMany();
  const adminData = data[0] || {};
  return (
    <div>
      <Heading
        title="Admin Policies"
        description="Manage and configure all essential policies for your platform in one centralized location. This section allows you to define and update key policies, ensuring compliance and transparency for your users."
      />
      <Tabs defaultValue="privacyPolicy" className="mt-5">
        <TabsList>
          <TabsTrigger value="privacyPolicy">Privacy Policy</TabsTrigger>
          <TabsTrigger value="termsConditionPolicy">
            Terms & Condition Policy
          </TabsTrigger>
          <TabsTrigger value="returnRefundPolicy">
            Return/Refund Policy
          </TabsTrigger>
          <TabsTrigger value="intellectualPropertyPolicy">
            Intellectual Property Policy
          </TabsTrigger>
        </TabsList>
        <TabsContent value="privacyPolicy">
          <PrivacyForm policyId={adminData.id} privacy={adminData.privacy} />
        </TabsContent>
        <TabsContent value="termsConditionPolicy">
          <TermsConditionForm policyId={adminData.id} terms={adminData.terms} />
        </TabsContent>
        <TabsContent value="returnRefundPolicy">
          <RefundForm policyId={adminData.id} refund={adminData.refund} />
        </TabsContent>
        <TabsContent value="intellectualPropertyPolicy">
          <IntellectualForm
            policyId={adminData.id}
            intellectualProperty={adminData.intellectualProperty}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Policies;
