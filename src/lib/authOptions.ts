import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "./prisma";
import { comparePassword } from "./password";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email = '', password = '' } = credentials || {};

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) return null;

        const isValidPassword = await comparePassword(password, user.password);

        if (!isValidPassword) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return {
        ...token,
        ...user,
      };
    },
    async session({ session, token }) {
      return {
        ...session,
        user: token,
      };
    },
  },
};
