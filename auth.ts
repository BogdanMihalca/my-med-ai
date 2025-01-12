import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      name: string;
      email: string;
      image: string;
      role: string;
    };
  }
}
