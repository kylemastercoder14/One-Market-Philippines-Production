"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as Star } from "@heroicons/react/24/outline";

const ReviewCard = () => {
  return (
    <div>
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="/profile.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Rafael Castillo</span>
          <span className="text-muted-foreground text-sm">on Jan 9, 2025</span>
        </div>
      </div>
      <div className="flex items-center mt-3">
        <StarIcon className="w-4 h-4" />
        <StarIcon className="w-4 h-4" />
        <StarIcon className="w-4 h-4" />
        <StarIcon className="w-4 h-4" />
        <Star className="w-4 h-4" />
      </div>
	  <p className='text-sm mt-2'>The shoes are beautiful and very light for the price. They seem to be as described, but I&apos;ll have to wait and see how they hold up with use. I recommend them, and they are true to size.</p>
    </div>
  );
};

export default ReviewCard;
