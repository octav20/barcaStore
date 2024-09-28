import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret"; // Usa un secreto fuerte

export async function POST(request: Request) {
  await connectDB();

  try {
    // Extraer email y password desde el cuerpo de la solicitud
    const { user, password } = await request.json();

    // Buscar usuario en la base de datos por su email
    const userData = await User.findOne({ user });

    if (!userData) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Comparar la contraseña proporcionada con la almacenada
    const isMatch = password === userData.password;

    if (!isMatch) {
      return NextResponse.json(
        { error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    // Si el login es exitoso, generar un token JWT
    const token = jwt.sign(
      { id: userData._id, user: userData.user },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Configurar las opciones de la cookie
    const cookieOptions = {
      httpOnly: true, // Solo accesible desde el servidor
      secure: process.env.NODE_ENV === "production", // Usar solo en HTTPS en producción
      sameSite: "strict" as const, // Proteger contra CSRF
      maxAge: 60 * 60, // 1 hora en segundos
      path: "/", // Disponible en toda la aplicación
    };

    // Establecer la cookie con el token
    const response = NextResponse.json({ message: "Login exitoso" });
    response.cookies.set("token", token, cookieOptions); // Almacenar el JWT en la cookie

    return response;
  } catch (error) {
    console.error(error); // Log the error to the console
    return NextResponse.json(
      { error: "Error al iniciar sesión" },
      { status: 500 }
    );
  }
}
