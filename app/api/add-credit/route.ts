import { connectDB } from "@/lib/mongodb";
import userSchema from "@/models/user";
import { NextResponse } from "next/server";

// Recibir el id del usuario desde los parámetros de la URL

export async function POST(request: Request) {
  await connectDB();

  const { userId, mount } = await request.json();

  // Buscar usuario en la base de datos por su email
  const userData = await userSchema.findById(userId);

  if (!userData) {
    return NextResponse.json(
      { error: "Usuario no encontrado" },
      { status: 404 }
    );
  } // Obtener el id del usuario desde los parámetros

  try {
    // Buscar el usuario en la base de datos por su _id
    const user = await userSchema.findById(userId);

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    user.credit += mount;
    await user.save();

    // Retornar el usuario encontrado
    return NextResponse.json(
      { message: "Crédito actualizado" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Error al obtener el usuario" },
      { status: 500 }
    );
  }
}
