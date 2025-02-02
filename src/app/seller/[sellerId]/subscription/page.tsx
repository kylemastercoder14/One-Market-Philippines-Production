import Image from "next/image";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Subscription = async (props: {
  params: Promise<{
    sellerId: string;
  }>;
}) => {
  const params = await props.params;
  return (
    <div className="py-3">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-5">
        <div>
          <p>Video demo here</p>
          <div className="bg-red-600 w-full h-[400px]"></div>
        </div>
        <div>
          <div className="flex items-center">
            <Image alt="Pro" src="/images/logo.png" width={70} height={70} />
            <Badge>Premium</Badge>
          </div>
          <h2 className="text-2xl font-bold mt-3">
            Premium Account Subscription
          </h2>
          <p className="text-sm mt-1">
            Upgrade to a Premium Account and gain access to exclusive features
            that help your store stand out. Get more visibility, more media
            uploads, and a better reach for your products.
          </p>
          <div className="flex flex-col mt-4">
            <div className="flex items-center gap-2">
              <FaCheckCircle color="green" />
              <p className="ml-2">
                Upload up to <strong>6 images</strong> and{" "}
                <strong>1 video</strong> per product.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle color="green" />
              <p className="ml-2">
                Get your store <strong>featured</strong> at the top for better
                visibility.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle color="green" />
              <p className="ml-2">
                Enjoy <strong>priority support</strong> and a seamless selling
                experience.
              </p>
            </div>
          </div>
          <Button className="mt-3">Get Started for ₱500 &rarr;</Button>
          <p className="text-xs text-gray-500 mt-2">
            Free accounts are limited to <strong>4 images per product</strong>{" "}
            and do not appear in featured listings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
