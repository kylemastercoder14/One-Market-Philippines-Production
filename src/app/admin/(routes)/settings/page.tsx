import React from "react";
import Heading from "@/components/ui/heading";
import db from "@/lib/db";
import SettingsForm from "./_components/settings-form";

const AdminSettings = async () => {
  const data = await db.adminSettings.findMany();
  return (
    <div>
      <Heading
        title="Admin Settings"
        description="Configure your platform's logo, commission rates, and essential details in one place."
      />
      <SettingsForm data={data} />
    </div>
  );
};

export default AdminSettings;
