import { connectDB } from "@/lib/mongodb";
import userSchema from "@/models/user";
import { NextResponse } from "next/server";

// Recibir el id del usuario desde los parámetros de la URL
interface Params {
  userId: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  await connectDB();
  console.log(params);

  const { userId } = params;
  console.log(userId); // Obtener el id del usuario desde los parámetros

  try {
    // Buscar el usuario en la base de datos por su _id
    const user = await userSchema.findById(userId);

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Retornar el usuario encontrado
    return NextResponse.json(user.credit);
  } catch {
    return NextResponse.json(
      { error: "Error al obtener el usuario" },
      { status: 500 }
    );
  }
}
