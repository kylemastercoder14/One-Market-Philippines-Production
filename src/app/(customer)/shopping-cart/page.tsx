"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import EncryptedBanner from "@/components/globals/encrypted-banner";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import CartCard from "../_components/cart-card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/use-cart";

const ShoppingCart = () => {
  const { items, removeAll } = useCart();
  const router = useRouter();

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <div className="px-[200px] pb-20 pt-24">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Shopping Cart</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid md:grid-cols-10 grid-cols-1 gap-10 mt-3">
        <div className="col-span-7 max-h-[50vh] no-scrollbar overflow-y-auto">
          <div className="flex items-center justify-between">
            <EncryptedBanner />
            <Button variant="destructive" onClick={removeAll} size="sm">
              Remove All
            </Button>
          </div>
          <Separator className="my-3" />
          <div className="flex flex-col space-y-4">
            {items.length > 0 ? (
              items.map((product) => (
                <CartCard
                  id={product.id}
                  variant={product.variant}
                  price={product.price}
                  title={product.name}
                  image={product.image}
                  key={product.id}
                  quantity={product.quantity}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <Image
                  src="/images/empty-item.svg"
                  alt="Empty"
                  width={200}
                  height={200}
                />
                <p className="font-semibold mb-2">Your cart is empty</p>
                <Button
                  onClick={() => router.push("/")}
                  variant="default"
                  size="sm"
                >
                  Start shopping now!
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-3">
          <p className="font-semibold text-lg">Order Summary</p>
          <div className="flex items-center text-sm mt-5 justify-between">
            <p>Item(s) Total:</p>
            <p className="text-muted-foreground line-through">₱{totalPrice}</p>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center mt-5 justify-between">
            <p className="font-semibold">Total:</p>
            <p className="font-semibold">
              {items.length === 0 ? "0" : `₱${totalPrice}`}
            </p>
          </div>
          <Button
            disabled={items.length === 0}
            onClick={() => router.push("/checkout")}
            className="rounded-full w-full mt-6 font-semibold"
            size="lg"
          >
            Proceed to checkout ({items.length} item/s)
          </Button>
          <p className="text-center text-xs font-semibold text-muted-foreground mt-3">
            Item availability and pricing are not guaranteed until payment is
            final.
          </p>
          <div className="text-center bg-[#198754]/40 py-2 text-green-900 rounded-md flex items-center justify-center mt-5 gap-3">
            <TriangleAlert className="w-4 h-4" />
            <p className="text-xs">
              You will not be charged until you review this order on the next
              page
            </p>
          </div>
          <p className="font-semibold mt-5">Safe payment option</p>
          <p className="text-sm text-muted-foreground mt-1">
            1 Market Philippines is committed to protecting your payment
            information. We follow PCI DSS standards, use strong encryption, and
            perform regular reviews of its system to protect your privacy.
          </p>
          <p className="font-semibold mt-5">Payment methods</p>
          <div className="flex items-center gap-2 mt-2">
            <Image
              title="Cash on delivery"
              src="https://aimg.kwcdn.com/upload_aimg/launch/9682bf77-607e-4fb3-aebe-cacfba9b6a8b.png.slim.png?imageView2/2/w/120/q/70/format/webp"
              alt="COD"
              width={40}
              height={40}
            />
            <Image
              title="GCash"
              src="https://aimg.kwcdn.com/upload_aimg/payment/7bacbe25-56f3-4b84-a82f-046777896662.png.slim.png?imageView2/2/w/120/q/70/format/webp"
              alt="Gcash"
              width={40}
              height={40}
            />
            <Image
              title="Paypal"
              src="https://aimg.kwcdn.com/upload_aimg/temu/ec0c5d69-1717-4571-a193-9950ec73c8af.png.slim.png?imageView2/2/w/120/q/70/format/webp"
              alt="Paypal"
              width={40}
              height={40}
            />
            <Image
              title="Visa"
              src="https://aimg.kwcdn.com/upload_aimg/temu/da7f463a-916f-4d91-bcbb-047317a1c35e.png.slim.png?imageView2/2/w/120/q/70/format/webp"
              alt="Visa"
              width={40}
              height={40}
            />
            <Image
              title="Mastercard"
              src="https://aimg.kwcdn.com/upload_aimg/temu/b79a2dc3-b089-4cf8-a907-015a25ca12f2.png.slim.png?imageView2/2/w/120/q/70/format/webp"
              alt="Mastercard"
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
