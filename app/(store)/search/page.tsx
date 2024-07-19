import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { api } from "@/data/api";
import { ProductProps } from "@/data/types/products";

interface SearchProps {
  searchParams: {
    q: string;
  };
}

async function searchProducts(query: string): Promise<ProductProps[]> {
  const response = await api(`/products/search?q=${query}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  });

  const products = await response.json();

  return products;
}

export default async function Search({ searchParams }: SearchProps) {
  const { q: query } = searchParams;

  if (!query) {
    redirect("/");
  }

  const products = await searchProducts(query);
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">{query}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
            >
              <Image
                src={product.image}
                className="group-hover:scale-105 transition-transform duration-500"
                width={480}
                height={480}
                quality={100}
                alt=""
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
