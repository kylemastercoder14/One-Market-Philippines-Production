import React from "react";
import ProductCard from "@/components/globals/product-card";

const data = [
  {
    title:
      "Women's Starry Night Graphic Tee - Casual Black Crew Neck Short Sleeve Top, 100% Polyester, Machine Washable, Perfect for Summer & Spring, Ladies T Shirts",
    slug: "starry-night-graphic-tee",
    image: "/sample-3.webp",
    price: 390,
    originalPrice: 500,
    sold: 3290,
    discount: 78,
    rating: 4.5,
    ratingCount: 212,
  },
  {
    title:
      "Large Realistic Money Grass Leaf Plant - 18 Large Leaves, Wide Leaf Plant Decoration",
    slug: "realistic-money-grass-leaf-plant",
    image: "/sample-2.webp",
    price: 128,
    originalPrice: 200,
    sold: 1290,
    discount: 36,
    rating: 5,
    ratingCount: 290,
  },
  {
    title:
      "Solar System for SATURN 3D Laser-Engraved Crystal Ball Night Light - USB Powered",
    slug: "solar-system-saturn-3d-laser-engraved-crystal-ball-night-light",
    image: "/sample-4.jpg",
    price: 299,
    originalPrice: 500,
    sold: 120,
    discount: 40,
    rating: 4,
    ratingCount: 67,
  },
  {
    title:
      "12pcs/pack Thickened Bedroom Living Room Full Town Splicing Carpet Rug, Room Bedside Blanket Warm",
    slug: "thickened-bedroom-living-room-full-town-splicing-carpet-rug",
    image: "/sample-5.webp",
    price: 467,
    originalPrice: 800,
    sold: 5209,
    discount: 42,
    rating: 5,
    ratingCount: 902,
  },
  {
    title:
      "[10 to 100pcs] 3-Ply Disposable Face Mask - 3 Layers of Protection, Comfortable Earloop, Breathable, Dustproof, Anti-Droplets, Anti-Pollen, Anti-Fog",
    slug: "3-ply-disposable-face-mask",
    image: "/sample-image.webp",
    price: 230,
    originalPrice: 328,
    sold: 833,
    discount: 30,
    rating: 4.5,
    ratingCount: 402,
  },
  {
    title:
      "Women's Starry Night Graphic Tee - Casual Black Crew Neck Short Sleeve Top, 100% Polyester, Machine Washable, Perfect for Summer & Spring, Ladies T Shirts",
    slug: "starry-night-graphic-tee",
    image: "/sample-3.webp",
    price: 390,
    originalPrice: 500,
    sold: 3290,
    discount: 78,
    rating: 4.5,
    ratingCount: 212,
  },
  {
    title:
      "Large Realistic Money Grass Leaf Plant - 18 Large Leaves, Wide Leaf Plant Decoration",
    slug: "realistic-money-grass-leaf-plant",
    image: "/sample-2.webp",
    price: 128,
    originalPrice: 200,
    sold: 1290,
    discount: 36,
    rating: 5,
    ratingCount: 290,
  },
  {
    title:
      "Solar System for SATURN 3D Laser-Engraved Crystal Ball Night Light - USB Powered",
    slug: "solar-system-saturn-3d-laser-engraved-crystal-ball-night-light",
    image: "/sample-4.jpg",
    price: 299,
    originalPrice: 500,
    sold: 120,
    discount: 40,
    rating: 4,
    ratingCount: 67,
  },
  {
    title:
      "12pcs/pack Thickened Bedroom Living Room Full Town Splicing Carpet Rug, Room Bedside Blanket Warm",
    slug: "thickened-bedroom-living-room-full-town-splicing-carpet-rug",
    image: "/sample-5.webp",
    price: 467,
    originalPrice: 800,
    sold: 5209,
    discount: 42,
    rating: 5,
    ratingCount: 902,
  },
  {
    title:
      "[10 to 100pcs] 3-Ply Disposable Face Mask - 3 Layers of Protection, Comfortable Earloop, Breathable, Dustproof, Anti-Droplets, Anti-Pollen, Anti-Fog",
    slug: "3-ply-disposable-face-mask",
    image: "/sample-image.webp",
    price: 230,
    originalPrice: 328,
    sold: 833,
    discount: 30,
    rating: 4.5,
    ratingCount: 402,
  },
  {
    title:
      "Women's Starry Night Graphic Tee - Casual Black Crew Neck Short Sleeve Top, 100% Polyester, Machine Washable, Perfect for Summer & Spring, Ladies T Shirts",
    slug: "starry-night-graphic-tee",
    image: "/sample-3.webp",
    price: 390,
    originalPrice: 500,
    sold: 3290,
    discount: 78,
    rating: 4.5,
    ratingCount: 212,
  },
  {
    title:
      "Large Realistic Money Grass Leaf Plant - 18 Large Leaves, Wide Leaf Plant Decoration",
    slug: "realistic-money-grass-leaf-plant",
    image: "/sample-2.webp",
    price: 128,
    originalPrice: 200,
    sold: 1290,
    discount: 36,
    rating: 5,
    ratingCount: 290,
  },
  {
    title:
      "Solar System for SATURN 3D Laser-Engraved Crystal Ball Night Light - USB Powered",
    slug: "solar-system-saturn-3d-laser-engraved-crystal-ball-night-light",
    image: "/sample-4.jpg",
    price: 299,
    originalPrice: 500,
    sold: 120,
    discount: 40,
    rating: 4,
    ratingCount: 67,
  },
  {
    title:
      "12pcs/pack Thickened Bedroom Living Room Full Town Splicing Carpet Rug, Room Bedside Blanket Warm",
    slug: "thickened-bedroom-living-room-full-town-splicing-carpet-rug",
    image: "/sample-5.webp",
    price: 467,
    originalPrice: 800,
    sold: 5209,
    discount: 42,
    rating: 5,
    ratingCount: 902,
  },
  {
    title:
      "[10 to 100pcs] 3-Ply Disposable Face Mask - 3 Layers of Protection, Comfortable Earloop, Breathable, Dustproof, Anti-Droplets, Anti-Pollen, Anti-Fog",
    slug: "3-ply-disposable-face-mask",
    image: "/sample-image.webp",
    price: 230,
    originalPrice: 328,
    sold: 833,
    discount: 30,
    rating: 4.5,
    ratingCount: 402,
  },
];

const ProductsGrid = () => {
  return (
    <div className="mt-10 grid md:grid-cols-5 grid-cols-1 gap-5">
      {data.map((product, index) => (
        <ProductCard
        href='/product/slug'
          slug={product.slug}
          key={index}
          title={product.title}
          image={product.image}
          originalPrice={product.originalPrice}
          sold={product.sold}
          ratingCount={product.ratingCount}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
