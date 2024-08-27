import type { NextAuthConfig } from "next-auth";
import { AuthError } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

async function authorize(credentials: any) {
  const { userToken, email } = credentials;
  console.log("authorize", userToken, credentials);
  if (!userToken) {
    throw new AuthError("Invalid credentials");
  }
  // console.log(userToken);
  return {
    userToken: userToken,
    email: email,
  };
}

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      authorize,
    }),
  ],
  debug: true,
} satisfies NextAuthConfig;
