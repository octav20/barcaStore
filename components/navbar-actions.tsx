"use client";
import { Button } from "./ui/button";
import useCart from "@/hooks/use-cart";
import { ShoppingBag } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NavbarActions = () => {
  const session = useSession();
  interface User {
    _id: string;
    // Add other properties if needed
  }

  const user = session?.data?.user as User;
  console.log(user);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const router = useRouter();

  const cart = useCart();
  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center rounded-full bg-black px-4 py-2"
      >
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
      </Button>
      <Button
        onClick={() => {
          router.push("/credit/" + user._id);
        }}
      >
        Consultar saldo
      </Button>
    </div>
  );
};

export default NavbarActions;
