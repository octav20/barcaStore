import { connectDB } from "@/lib/mongodb";
import userSchema from "@/models/user";
// import productSchema from "@/models/product";
// import orderSchema from "@/models/order";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await connectDB();

  // Obtener los datos del cuerpo de la solicitud (por ejemplo, ID del usuario y carrito)
  const { userId, total } = await request.json();

  // 1. Obtener información del usuario
  const user = await userSchema.findById(userId);
  if (!user) {
    return NextResponse.json(
      { message: "Usuario no encontrado" },
      { status: 404 }
    );
  }

  //   // 2. Validar saldo del usuario
  //   const totalCost = cart.reduce(
  //     (acc, item) => acc + item.price * item.quantity,
  //     0
  //   );
  //   if (user.balance < totalCost) {
  //     return NextResponse.json(
  //       { message: "Saldo insuficiente" },
  //       { status: 400 }
  //     );
  //   }

  //   // 3. Validar productos en inventario y calcular el costo total
  //   for (let item of cart) {
  //     const product = await productSchema.findById(item.productId);
  //     if (!product || product.stock < item.quantity) {
  //       return NextResponse.json(
  //         {
  //           message: `Producto ${item.name} no disponible en la cantidad solicitada`,
  //         },
  //         { status: 400 }
  //       );
  //     }
  //   }

  // 4. Actualizar saldo del usuario
  if (user.credit < total) {
    return NextResponse.json(
      { message: "Crédito insuficiente" },
      { status: 400 }
    );
  }
  user.credit -= total;
  await user.save();

  //   // 5. Actualizar inventario de productos
  //   for (let item of cart) {
  //     const product = await productSchema.findById(item.productId);
  //     product.stock -= item.quantity;
  //     await product.save();
  //   }

  //   // 6. Crear la orden
  //   const newOrder = new orderSchema({
  //     userId: user._id,
  //     products: cart,
  //     totalCost: totalCost,
  //     date: new Date(),
  //   });
  //   await newOrder.save();

  // 7. Responder con éxito y detalles de la orden
  return NextResponse.json({
    message: "Compra realizada con éxito",
    credit: user.credit,

    // order: newOrder,
  });
}
