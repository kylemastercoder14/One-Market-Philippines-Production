import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-zinc-900 md:h-[40vh] h-full w-full md:px-[200px] px-10 py-10 text-white">
      <div className="grid md:grid-cols-10 grid-cols-1 gap-5">
        <div className="col-span-2">
          <p className="font-semibold">Company info</p>
          <div className="flex flex-col mt-3 text-sm space-y-2">
            <Link href="/about-us" className="text-zinc-400 hover:text-white">
              About 1 Market Philippines
            </Link>
            <Link href="/contact-us" className="text-zinc-400 hover:text-white">
              Contact Us
            </Link>
            <Link href="/press" className="text-zinc-400 hover:text-white">
              Press
            </Link>
            <Link
              href="/seller/account/login"
              className="text-zinc-400 hover:text-white"
            >
              Seller Center
            </Link>
          </div>
          <p className="font-semibold md:mt-20 mt-5">We accept payments</p>
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
        <div className="col-span-2">
          <p className="font-semibold">Customer service</p>
          <div className="flex flex-col mt-3 text-sm space-y-2">
            <Link
              href="/return-and-refund"
              className="text-zinc-400 hover:text-white"
            >
              Return and refund policy
            </Link>
            <Link
              href="/intellectual-property"
              className="text-zinc-400 hover:text-white"
            >
              Intellectual property policy
            </Link>
            <Link
              href="/shipping-info"
              className="text-zinc-400 hover:text-white"
            >
              Shipping info
            </Link>
            <Link
              href="/report-suspicious"
              className="text-zinc-400 hover:text-white"
            >
              Report suspicious activity
            </Link>
          </div>
        </div>
        <div className="col-span-2">
          <p className="font-semibold">Help</p>
          <div className="flex flex-col mt-3 text-sm space-y-2">
            <Link
              href="/support-center"
              className="text-zinc-400 hover:text-white"
            >
              Support center & FAQ
            </Link>
            <Link
              href="/terms-of-use"
              className="text-zinc-400 hover:text-white"
            >
              Terms & conditions
            </Link>
            <Link href="/purchase-protection" className="text-zinc-400 hover:text-white">
              Purchase protection
            </Link>
            <Link href="/site-map" className="text-zinc-400 hover:text-white">
              Sitemap
            </Link>
          </div>
        </div>
        <div className="col-span-4">
          <p className="font-semibold">Download the 1 Market Philippines App</p>
          <div className="flex items-center gap-5 w-full mt-3">
            <div
              className="flex text-zinc-400 hover:text-white items-center gap-3 w-1/3"
              title="Price-drop alerts"
            >
              <Image
                src="https://aimg.kwcdn.com/upload_aimg_b/web/pc/deb081e4-e46b-4b2d-bc1d-6a0e1800c73c.png.slim.png?imageView2/2/w/30/q/70/format/webp"
                alt="Price-drop alerts"
                width={20}
                height={20}
              />
              <span className="text-sm">Price-drop alerts</span>
            </div>
            <p className="text-zinc-400">|</p>
            <div
              className="flex items-center text-zinc-400 hover:text-white gap-3 w-1/2"
              title="Faster and more secure checkout"
            >
              <Image
                src="https://aimg.kwcdn.com/upload_aimg_b/web/pc/98996646-47c5-4020-ab1f-8e6b2ee39358.png.slim.png?imageView2/2/w/30/q/70/format/webp"
                alt="Faster and more secure checkout"
                width={20}
                height={20}
              />
              <span className="text-sm">Faster and more secure checkout</span>
            </div>
          </div>
          <div className="flex items-center gap-5 w-full mt-1">
            <div
              className="flex items-center text-zinc-400 hover:text-white gap-3 w-1/3"
              title="Exclusive offers"
            >
              <Image
                src="https://aimg.kwcdn.com/upload_aimg_b/web/pc/728e2277-96f9-4787-bd89-d87e3b6bc2f2.png.slim.png?imageView2/2/w/30/q/70/format/webp"
                alt="Exclusive offers"
                width={20}
                height={20}
              />
              <span className="text-sm">Exclusive offers</span>
            </div>
            <p className="text-zinc-400">|</p>
            <div
              className="flex items-center text-zinc-400 hover:text-white gap-3 w-1/2"
              title="Track orders any time"
            >
              <Image
                src="https://aimg.kwcdn.com/upload_aimg_b/web/pc/c19eefdc-4dfd-4106-8074-ed8521cacb6e.png.slim.png?imageView2/2/w/30/q/70/format/webp"
                alt="Track orders any time"
                width={20}
                height={20}
              />
              <span className="text-sm">Track orders any time</span>
            </div>
          </div>
          <div className="flex items-center gap-5 w-full mt-1">
            <div
              className="flex items-center text-zinc-400 hover:text-white gap-3 w-1/3"
              title="Low stock items alerts"
            >
              <Image
                src="https://aimg.kwcdn.com/upload_aimg_b/web/pc/ab4a5d92-4b54-45f6-b18a-fbb16529d2b3.png.slim.png?imageView2/2/w/30/q/70/format/webp"
                alt="Low stock items alerts"
                width={20}
                height={20}
              />
              <span className="text-sm">Low stock items alerts</span>
            </div>
            <p className="text-zinc-400">|</p>
            <div
              className="flex items-center text-zinc-400 hover:text-white gap-3 w-1/2"
              title="Coupons & offers alerts"
            >
              <Image
                src="https://aimg.kwcdn.com/upload_aimg_b/web/pc/2077debf-6cf5-463a-84ab-969eee3593a1.png.slim.png?imageView2/2/w/30/q/70/format/webp"
                alt="Coupons & offers alerts"
                width={20}
                height={20}
              />
              <span className="text-sm">Coupons & offers alerts</span>
            </div>
          </div>
          <div className="flex items-center gap-5 mt-5">
            <div
              title="App Store"
              className="flex cursor-pointer hover:border-white items-center gap-2 border border-zinc-400 rounded-full px-7 py-3"
            >
              <Image
                src={
                  "https://aimg.kwcdn.com/upload_aimg/pc/5c5f0a0f-db6f-4205-a0d3-c745b6c672ea.png.slim.png?imageView2/2/w/120/q/70/format/webp"
                }
                alt="Apple"
                width={35}
                height={35}
              />
              <div className="flex flex-col">
                <span className="text-zinc-400 text-xs">Download on the</span>
                <span className="font-semibold">App Store</span>
              </div>
            </div>
            <div
              title="Google Playstore"
              className="flex cursor-pointer hover:border-white items-center gap-2 border border-zinc-400 rounded-full px-7 py-3"
            >
              <Image
                src={
                  "https://aimg.kwcdn.com/upload_aimg/pc/427c29ba-bef6-439c-9d4c-edbdde47c7e0.png.slim.png?imageView2/2/w/120/q/70/format/webp"
                }
                alt="Google playstore"
                width={35}
                height={35}
              />
              <div className="flex flex-col">
                <span className="text-zinc-400 text-xs">Get it on</span>
                <span className="font-semibold">Google Play</span>
              </div>
            </div>
          </div>
          <p className="font-semibold mt-5">
            Connect with 1 Market Philippines
          </p>
          <div className="flex items-center gap-3 mt-1">
            <div
              title="Instagram"
              className="bg-transparent hover:bg-zinc-400/30 transition-colors duration-75 p-2 rounded-full cursor-pointer"
            >
              <Image
                width={30}
                height={30}
                alt="Instagram"
                src={
                  "https://aimg.kwcdn.com/upload_aimg/pc/a817be22-932c-43b3-95e4-c768af711c34.png.slim.png?imageView2/2/w/120/q/70/format/webp"
                }
              />
            </div>
            <div
              title="Facebook"
              className="bg-transparent hover:bg-zinc-400/30 transition-colors duration-75 p-2 rounded-full cursor-pointer"
            >
              <Image
                width={30}
                height={30}
                alt="Facebook"
                src={
                  "https://aimg.kwcdn.com/upload_aimg/pc/0d1c5252-2094-4504-b6fc-34a6a3f87804.png.slim.png?imageView2/2/w/120/q/70/format/webp"
                }
              />
            </div>
            <div
              title="X"
              className="bg-transparent hover:bg-zinc-400/30 transition-colors duration-75 p-2 rounded-full cursor-pointer"
            >
              <Image
                width={30}
                height={30}
                alt="X"
                src={
                  "https://aimg.kwcdn.com/upload_aimg/temupch5/4eb16ee6-f4ed-426e-9ce3-574a2ab4ba6c.png?imageView2/2/w/120/q/70/format/webp"
                }
              />
            </div>
            <div
              title="Tiktok"
              className="bg-transparent hover:bg-zinc-400/30 transition-colors duration-75 p-2 rounded-full cursor-pointer"
            >
              <Image
                width={30}
                height={30}
                alt="Tiktok"
                src={
                  "https://aimg.kwcdn.com/upload_aimg/web/7edd0665-db19-4e7a-aa42-5301e5ea396f.png.slim.png?imageView2/2/w/120/q/70/format/webp"
                }
              />
            </div>
            <div
              title="Youtube"
              className="bg-transparent hover:bg-zinc-400/30 transition-colors duration-75 p-2 rounded-full cursor-pointer"
            >
              <Image
                width={30}
                height={30}
                alt="Youtube"
                src={
                  "https://aimg.kwcdn.com/upload_aimg/web/18e81de4-adca-4b74-bd52-1aa2d7ebe771.png.slim.png?imageView2/2/w/120/q/70/format/webp"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
