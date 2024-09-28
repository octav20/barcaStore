import { connectDB } from "@/lib/mongodb";
import userSchema from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const users = await userSchema.find();
  return NextResponse.json(users);
}
