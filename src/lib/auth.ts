import { apiClient } from "@/api/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import z from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .pipe(z.email("올바른 이메일 형식이 아닙니다")),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = loginSchema.parse(credentials);

          const response = await apiClient.post("/auth/signIn", {
            email,
            password,
          });

          if (response.data.accessToken) {
            const { user, accessToken, refreshToken } = response.data;
            return {
              id: user.id.toString(),
              email: user.email,
              name: user.nickname,
              accessToken: accessToken,
              refreshToken: refreshToken,
            };
          }

          return null;
        } catch (error) {
          console.error("인증 오류:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken as string;
        token.refreshToken = user.refreshToken as string;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
});
