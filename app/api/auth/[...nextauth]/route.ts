import User from "@/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import Credentials from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        user: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const userFound = await User.findOne({
          user: credentials?.user,
        });

        if (!userFound) throw new Error("Usuario no encontrado");

        const passwordMatch = credentials!.password === userFound.password;

        if (!passwordMatch) throw new Error("Contraseña incorrecta");

        console.log(userFound);

        return userFound;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as typeof session.user;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
