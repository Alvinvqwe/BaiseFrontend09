import NextAuth from "next-auth";
import authConfig from "@/lib/auth.config";
import type { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { loginReq } from "@/api/auth";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60,
  },
  ...authConfig,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.userToken = user.userToken as string;
      }
      // console.log("jwt: ", token);
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("session: ", session, token);
      session.user = {
        ...session.user,
        userToken: token.userToken as string,
      };
      console.log("session: ", session);
      return session;
    },

    // async signIn({ credentials, account, email, user }) {
    async signIn({ credentials, account, email, user }: any) {
      // console.log("signIn:", account, user);
      if (account?.provider === "google") {
        const response = await loginReq(
          user?.email as string,
          "",
          user.name as string
        );
        // console.log("signin response", response.code, response.data);
        if (!response.success) {
          // console.log(response);
          return false;
        }
        user.userToken = response.data.userToken;
        // console.log("signin,", response.data.userToken);
      } else if (account?.provider === "X") {
        console.log("x login in", account);
      } else {
        console.log("normal login in", account, user, credentials?.user);
      }
      return true;
    },
    async redirect({ url, baseUrl }: any) {
      // console.log("redirect");
      return baseUrl;
    },
  },
});
