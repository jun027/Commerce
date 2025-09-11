import React from "react";

import Link from "next/link";

import { ShoppingCart } from "lucide-react";

import { Button } from "./ui/button";

import Image from "next/image";

const ProductCard = ({ product }: { product: any }) => {
  return (
    <div>
      <div
        className="group relative overflow-hidden group h-full flex flex-col rounded-lg
            shadow-lg border-2 border-gray-200 bg-white"
      >
        <Link
          href={`/product/${product.id}`}
          className="relative w-full pt-[100%] bg-transparent"
        >
          <Image
            src={product.attributeValues.p_image.value.downloadLink}
            alt={product.attributeValues.p_title.value}
            fill
            className="absolute inset-0 object-cover transition-transform duration-300
               group-hover:scale-105 border-2 border-gray-200"
            sizes="(min-width:1024px) 300px, 100vw"
          />
        </Link>

        <div className="p-4 flex-grow">
          <Link href={`/product/${product.id}`}>
            <h3
              className="text-xl mb-2 text-gray-700 group-hover:text-purple-500
             transition-colors duration-300 line-clamp-2"
            >
              {product.attributeValues.p_title.value}
            </h3>
          </Link>

          <div
            className="text-gray-500 line-clamp-2 text-sm mb-2"
            dangerouslySetInnerHTML={{
              __html: product.attributeValues.p_description.value[0].htmlValue,
            }}
          />
          <p className="text-gray-600">
            ${product.attributeValues.p_price.value.toFixed(2)}
          </p>
        </div>

        <div className="p-4">
          <Button
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
             hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-semibold
             cursor-pointer"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            加入購物車
          </Button>

          <div
            className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-500
             via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-500
              text-white transform scale-x-0 group-hover:scale-x-100 transition-transform"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
