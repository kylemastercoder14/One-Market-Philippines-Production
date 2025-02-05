import React from "react";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { IoMdAlert } from "react-icons/io";
import MainHomePage from "./_components/main-homepage";
import Image from "next/image";
import ActionNeeded from './_components/action-needed';

const Home = async (props: {
  params: Promise<{
    sellerId: string;
  }>;
}) => {
  const params = await props.params;
  const seller = await db.seller.findUnique({
    where: {
      id: params.sellerId,
    },
    include: {
      sellerAddress: true,
    },
  });

  if ((seller?.sellerAddress?.length ?? 0) === 0) {
    redirect(`/seller/${params.sellerId}/dashboard`);
  }

  const existingProduct = await db.sellerProduct.findFirst({
    where: {
      sellerId: params.sellerId,
    },
  })

  const productCount = await db.sellerProduct.count({
    where: {
      sellerId: params.sellerId,
    },
  })

  const orderCount = 2;
  const outOfStockCount = await db.sellerProduct.count({
    where: {
      sellerId: params.sellerId,
      status: "Out of stock",
    },
  })
  const returnCount = 1;

  const existingPaymentMethod = null;
  return (
    <>
      {seller?.status === "Pending" && (
        <div className="border flex py-2 px-3 items-center gap-2 bg-orange-[#8D021F]/10 border-[#8D021F]/80 rounded-md">
          <IoMdAlert color="#8D021F" className="w-4 h-4" />
          <p className="text-sm text-[#8D021F]">
            Your documents are currently under review. Your products will become
            visible to buyers once you are verified. Thank you for waiting!
          </p>
        </div>
      )}
      {seller?.status === "Rejected" && (
        <div className="border flex py-2 px-3 items-center gap-2 bg-red-200/10 border-red-600/80 rounded-md">
          <IoMdAlert color="#991b1b" className="w-4 h-4" />
          <p className="text-sm text-red-800">
            We are sorry to inform you that your documents have been rejected.
            Please check your email for more information. Your account is
            deleted after 24 hours. Thank you!
          </p>
        </div>
      )}
      <div className="grid md:grid-cols-10 grid-cols-1 gap-5 mt-5">
        <div className="md:col-span-7">
          <div className="relative w-full h-[300px] mb-5">
            <Image
              src="/images/top-banner.webp"
              alt="Welcome Seller"
              fill
              className="w-full h-full rounded-md"
            />
            <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-5xl text-white font-helveticaBold font-bold">
                Welcome, {seller?.name} 👋
              </p>
              <span className="text-white mt-5 block">
                You can start adding your product now. If you need any help,
                please contact us. We are happy to help you.
              </span>
            </div>
          </div>
          <MainHomePage product={existingProduct} paymentMethod={existingPaymentMethod} />
          <ActionNeeded productCount={productCount} orderCount={orderCount} outOfStockCount={outOfStockCount} returnCount={returnCount} />
        </div>
        <div className="md:col-span-3">
          <h1 className="text-xl font-semibold">Announcements</h1>
          <p className="text-muted-foreground text-base mt-2">
            No announcement has been added yet
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
