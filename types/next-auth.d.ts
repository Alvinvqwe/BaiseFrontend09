// types/next-auth.d.ts
import "next-auth";
import { AccessInfo } from "./accessInfo";

declare module "next-auth" {
  /**
   * Extends the built-in User model from NextAuth.js
   */
  interface User {
    userToken: string;
  }
  interface Session {
    user: {
      userToken: string;
    };
  }

  interface JWT {
    userToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userToken?: string; // 根据实际类型调整
  }
}

export interface CookieData {
  source: string;
  accessUrl: string;
  over18: string;
}

export interface RewriteCookiesParams {
  response: NextResponse;
  data: CookieData;
}
