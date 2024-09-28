import { connectDB } from "@/lib/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

// Recibir el id del usuario desde los parámetros de la URL
interface Params {
  productId: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  await connectDB();
  console.log(params);

  const { productId } = params;
  console.log(productId); // Obtener el id del usuario desde los parámetros

  try {
    // Buscar el usuario en la base de datos por su _id
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    // Retornar el usuario encontrado
    return NextResponse.json(product);
  } catch {
    return NextResponse.json(
      { error: "Error al obtener el Producto" },
      { status: 500 }
    );
  }
}
