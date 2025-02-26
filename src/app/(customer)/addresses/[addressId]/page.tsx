import React from "react";
import UpdateAddress from './client';
import db from '@/lib/db';

const AddressId = async (props: {
  params: Promise<{
    addressId: string;
  }>;
}) => {
  const params = await props.params;
  const data = await db.address.findUnique({
	where: {
	  id: params.addressId,
	},
  });
  return <UpdateAddress initialData={data} />;
};

export default AddressId;
