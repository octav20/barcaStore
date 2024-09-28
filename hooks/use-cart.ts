import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

// import { Product } from "@/types";
import { Product } from "@/types";
// import { AlertTriangle } from "lucide-react";

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (_id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item._id === data._id);

        if (existingItem) {
          return toast("Producto ya agregado al carrito.");
        }

        set({ items: [...get().items, data] });
        toast.success("Producto agregado al carrito.");
      },
      removeItem: (_id: string) => {
        set({ items: [...get().items.filter((item) => item._id !== _id)] });
        toast.success("Producto eliminado del carrito.");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
