import { connectDB } from "@/lib/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const products = await Product.find();
  if (products.length === 0) {
    return NextResponse.json(
      { error: "No hay productos disponibles" },
      { status: 404 }
    );
  }
  return NextResponse.json(products);
}
