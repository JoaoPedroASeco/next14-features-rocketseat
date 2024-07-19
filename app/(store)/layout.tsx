import { ReactNode } from "react";
import { CartProvider } from "../contexts/CartContext";
import { Header } from "@/components/Header";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-app gap-5 px-8 py-8">
        <Header />
        {children}
      </div>
    </CartProvider>
  );
}
