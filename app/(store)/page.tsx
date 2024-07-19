import { api } from "@/data/api";
import { ProductProps } from "@/data/types/products";
import Image from "next/image";
import Link from "next/link";

async function getFeaturedProoducts(): Promise<ProductProps[]> {
  const response = await api("/products/featured", {
    cache: "no-store",
    next: {
      revalidate: 60 * 60,
    },
  });

  const products = await response.json();

  return products;
}

export default async function Home() {
  const [highLighttedProduct, ...otherProducts] = await getFeaturedProoducts();

  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/product/${highLighttedProduct.slug}`}
        className="col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-center relative"
      >
        <Image
          src={highLighttedProduct.image}
          className="hover:scale-105 transition-transform duration-500"
          width={920}
          height={920}
          quality={100}
          alt=""
        />

        <div className="absolute bottom-28 right-28  h-12 flex items-center gap-2 max-w-[280px] rounded-full  border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highLighttedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {highLighttedProduct.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>

      {otherProducts.map(({ id, image, price, title, slug }) => (
        <Link
          key={id}
          href={`/product/${slug}`}
          className="col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-center relative"
        >
          <Image
            src={image}
            className="hover:scale-105 transition-transform duration-500"
            width={920}
            height={920}
            quality={100}
            alt=""
          />

          <div className="absolute bottom-10 right-10  h-12 flex items-center gap-2 max-w-[280px] rounded-full  border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="text-sm truncate">{title}</span>
            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
              {price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
