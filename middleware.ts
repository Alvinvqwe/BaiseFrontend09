import NextAuth from "next-auth";
import authConfig from "@/lib/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
} from "@/routes";
import { NextResponse, NextRequest, NextFetchEvent } from "next/server";
import { cookies } from "next/headers";
import { RewriteCookiesParams, CookieData } from "@/types/next-auth";

const { auth } = NextAuth(authConfig);

const routeToRegex = (route: string) => {
  const pattern = route
    .replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    .replace(/\\\[.*?\\\]/g, "[^/]+")
    .replace(/\\\*/g, ".*");
  return new RegExp(`^${pattern}$`);
};

// 生成公共路由的正则表达式列表
const publicRouteRegexes = publicRoutes.map(routeToRegex);
// 检查路径是否为公共路由
const isPublicPath = (pathname: string) => {
  return publicRouteRegexes.some((regex) => regex.test(pathname));
};

function rewriteCookies({ response, data }: RewriteCookiesParams) {
  const cookie = cookies();
  try {
    if (cookie.get("source")?.value !== data.source) {
      response.cookies.set("source", data.source, { path: "/" });
    }
    if (cookie.get("accessUrl")?.value !== data.accessUrl) {
      response.cookies.set("accessUrl", data.accessUrl, { path: "/" });
    }
    if (cookie.get("over18")?.value !== data.over18) {
      response.cookies.set("over18", data.over18, { path: "/" });
    }
  } catch (error) {
    console.error("Error setting cookies:", error);
  }
  return response;
}

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent
): Promise<NextResponse> {
  const cookieStore = request.cookies;
  const session = await auth();
  const { pathname, searchParams } = request.nextUrl;
  // console.log("cookie", cookieStore, "session", session);

  let response = NextResponse.next();
  let data: CookieData = {
    source: searchParams.get("sourceId") || "0",
    accessUrl: "/",
    over18: cookieStore.get("over18")?.value || "false",
  };

  // Allow auth.js to handle this route
  if (pathname === "/api/auth/session") {
    return rewriteCookies({ response, data });
  }

  // 过滤不应存储的路径
  if (
    ![
      "/auth",
      "/over18",
      "/auth/login",
      "/auth/register",
      "/api/auth/session",
    ].includes(pathname)
  ) {
    data.accessUrl = pathname;
  }

  // is over18?
  if (data.over18 !== "true") {
    if (pathname !== "/over18") {
      response = NextResponse.redirect(new URL("/over18", request.url));
    }
    return rewriteCookies({ response, data });
  }

  // 处理auth
  const accessToken = cookieStore.get("accessToken")?.value || undefined;
  if (!accessToken) {
    if (pathname !== "/auth") {
      response = NextResponse.redirect(new URL("/auth", request.url));
    }
    return rewriteCookies({ response, data });
  }

  // 处理公开路由
  if (isPublicPath(pathname)) {
    // console.log("public route", pathname);
    return rewriteCookies({ response, data });
  }

  // 处理认证路由
  if (authRoutes.includes(pathname)) {
    // console.log("auth route", pathname);
    if (
      !cookieStore.get("role") ||
      cookieStore.get("role")?.value === "visitor"
    ) {
      response = NextResponse.redirect(new URL("/auth/login", request.url));
      return rewriteCookies({ response, data });
    }
  }

  console.log("apiAuthPrefix", apiAuthPrefix, pathname);
  // 处理API认证路由
  if (pathname.startsWith(apiAuthPrefix)) {
    return rewriteCookies({ response, data });
  }

  return rewriteCookies({ response, data });
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  //matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// 获取当前请求的路径? source
const getPath = (req: any) => {
  // console.log("req.nextUrl.pathname", req.nextUrl.pathname);
  return req.nextUrl.pathname;
};
