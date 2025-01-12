import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
// import prisma from "./prisma/prisma";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Google],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // const currentUser = await prisma.user.findUnique({
      //   where: {
      //     id: token.id as string,
      //   },
      // });

      session.user.id = token.id as string;
      session.user.role = "PATIENT"; //hardcoded because of vercel middleware size limit
      return session;
    },
  },
} satisfies NextAuthConfig;
