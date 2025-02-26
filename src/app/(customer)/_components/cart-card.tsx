import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import useCart from "@/hooks/use-cart";

const CartCard = ({
  image,
  title,
  variant,
  price,
  id,
  quantity,
}: {
  id: string;
  image: string;
  title: string;
  variant: string;
  price: number;
  quantity: number;
}) => {
  const { updateQuantity, removeItem } = useCart();
  return (
    <div className="flex justify-between">
      <div className="flex items-start gap-3">
        <div className="relative w-28 h-28">
          <Image
            src={image}
            alt={title}
            fill
            className="w-full h-full rounded-md"
          />
        </div>
        <div className="flex flex-col max-w-[700px]">
          <div>
            <p className="text-base line-clamp-1">{title}</p>
            <p className="text-sm text-muted-foreground">Variant: {variant}</p>
          </div>
          <div className="flex mt-12 items-center gap-2 text-sm">
            <p className="text-black font-semibold">₱{price}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <Button onClick={() => removeItem(id)} size="sm" variant="ghost">
          <Trash2 className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <p className="text-sm font-semibold text-muted-foreground">Qty</p>
          <div className="border flex justify-center items-center gap-3 py-2 w-24">
            <Minus
              onClick={() =>
                updateQuantity(id, quantity > 1 ? quantity - 1 : 1)
              }
              className="w-4 h-4 cursor-pointer"
            />
            <input
              type="text"
              className="w-5 text-sm text-center bg-white border-0 outline-none"
              placeholder="1"
              value={quantity}
              readOnly
            />
            <Plus
              onClick={() => updateQuantity(id, quantity + 1)}
              className="w-4 h-4 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
