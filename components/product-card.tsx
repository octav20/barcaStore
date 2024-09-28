"use client";

// import { Product } from "@/types";
import Image from "next/image";
// import IconButton from "./icon-button";
// import { Expand, ShoppingCart } from "lucide-react";
// import Currency from "./currency";
import { useRouter } from "next/navigation";
import IconButton from "./ui/icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import { MouseEventHandler } from "react";
// import { Button } from "./ui/button";
import { Product } from "@/types";
import useCart from "@/hooks/use-cart";
// import { MouseEventHandler } from "react";
// import usePreviewModal from "@/hooks/use-preview-modal";
// import useCart from "@/hooks/use-cart";

// interface ProductCard {
//   data: Product;
// }

interface ProductCard {
  data: Product;
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  const cart = useCart();

  //   const previewModal = usePreviewModal();
  const router = useRouter();
  const handleClick = () => {
    router.push(`/products/${data?._id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    handleClick();
    // previewModal.onOpen(data);
  };
  // const onAddTocart: MouseEventHandler<HTMLButtonElement> = (event) => {
  //   event.stopPropagation();
  //   // cart.addItem(data);
  // };
  const onAddToCart = () => {
    cart.addItem(data);
  };
  return (
    <div
      //   onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      {/* Images and Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={data?.images?.[0]?.url}
          fill
          alt="Image"
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center ">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        {/* <p className="text-sm text-gray-500">{data.category?.name}</p> */}
      </div>
      {/* Price */}
      <div className="flex items-center justify-between font-semibold">
        ${data.price}
      </div>
      {/* <Button onClick={onAddToCart} className="flex items-end gap-x-2">
        Add To Cart
        <ShoppingCart size={20} />
      </Button> */}
    </div>
  );
};

export default ProductCard;
