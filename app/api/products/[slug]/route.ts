import { z } from "zod";
import data from "../data.json";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params: { slug } }: { params: { slug: string } }
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const receivedSlug = z.string().parse(slug);

  const product = data.products.find(
    (product) => product.slug === receivedSlug
  );

  if (!product) {
    return Response.json({ message: "Product not found" }, { status: 400 });
  }

  return Response.json(product);
}
