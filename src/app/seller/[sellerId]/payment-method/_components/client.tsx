"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from 'next/navigation';

const PaymentMethodClient = () => {
  const params = useParams();
  const router = useRouter();
  return (
    <div className="mt-5 space-y-5">
      <div className="bg-white flex justify-between items-center border shadow-md p-5 rounded-md">
        <div className="flex items-center gap-3">
          <div className="relative w-[80px] h-[80px] border rounded-lg">
            <Image
              src="https://dashboard.xendit.co/assets/images/xendit-logo.png"
              className="w-full h-full p-5"
              fill
              alt="Xendit"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-semibold">
                Accept Credit/Debit Cards with Xendit
              </h1>
              <Badge className="bg-green-200 text-green-600 hover:bg-green-200/80">
                Recommended
              </Badge>
            </div>
            <p>
              Connect to accept credit/debit cards, e-wallets, retail outlet, online banking and
              other payment gateway.
            </p>
            <div className="flex items-center gap-2">
              <Image
                src="https://www.svgrepo.com/show/508730/visa-classic.svg"
                alt="Visa"
                width={40}
                height={40}
              />
              <Image
                src="https://www.svgrepo.com/show/508703/mastercard.svg"
                alt="Mastercard"
                width={40}
                height={40}
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Bank_of_the_Philippine_Islands_logo.svg/1920px-Bank_of_the_Philippine_Islands_logo.svg.png"
                alt="BPI"
                width={40}
                height={40}
              />
              <Image
                src="https://www.svgrepo.com/show/508695/jcb.svg"
                alt="JCB"
                width={40}
                height={40}
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/BDO_Unibank_%28logo%29.svg/1920px-BDO_Unibank_%28logo%29.svg.png"
                alt="BDO"
                width={40}
                height={40}
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/7-eleven_logo.svg/272px-7-eleven_logo.svg.png?20160121231038"
                alt="7 eleven"
                width={30}
                height={30}
              />
              <Image
                src="https://getcash.ph/wp-content/uploads/2021/01/Transparent-1280-x-720.png"
                alt="Gcash"
                width={40}
                height={40}
                className='object-cover'
              />
               <Image
                src="https://logodix.com/logo/2206804.jpg"
                alt="Maya"
                width={40}
                height={40}
                className='object-cover'
              />
            </div>
          </div>
        </div>
        <Button onClick={() => router.push(`/seller/${params.sellerId}/payment-method/xendit`)}>Connect</Button>
      </div>
      <div className="bg-white flex justify-between items-center border shadow-md p-5 rounded-md">
        <div className="flex items-center gap-3">
          <div className="relative w-[80px] h-[80px] border rounded-lg">
            <Image
              src="https://www.svgrepo.com/show/354170/paypal.svg"
              className="w-full h-full p-5"
              fill
              alt="Paypal"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-semibold">Paypal</h1>
            </div>
            <p>
              Connect to accept payments from customers who have a Paypal
              account.
            </p>
          </div>
        </div>
        <Button>Connect</Button>
      </div>
    </div>
  );
};

export default PaymentMethodClient;
