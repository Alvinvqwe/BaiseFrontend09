import NextAuth from "next-auth";
import authConfig from "@/lib/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
} from "@/routes";

import { NextResponse, NextRequest, NextFetchEvent } from "next/server";
// import { requestToken } from "@/api/access";
// import type { NextRequest } from "next/server";
// import { cookies } from "next/headers";

const { auth } = NextAuth(authConfig);

// 将路由模式转换为正则表达式
const routeToRegex = (route: string) => {
  // 将动态路由和通配符转换为正则表达式
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

interface CookieData {
  source: string;
  accessUrl: string;
  // role: string;
  // accessToken: string;
  over18: string;
}

interface RewriteCookiesParams {
  response: NextResponse;
  data: CookieData;
}

function rewriteCookies({ response, data }: RewriteCookiesParams) {
  try {
    response.cookies.set("source", data.source, { path: "/" });
    response.cookies.set("accessUrl", data.accessUrl, {
      path: "/",
    });
    response.cookies.set("over18", data.over18, {
      path: "/",
    });
  } catch (error) {
    console.error("Error setting cookies:", error);
  }
  return response;
}

// 主中间件逻辑
export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent
): Promise<NextResponse> {
  const cookieStore = request.cookies;
  const { pathname, searchParams } = request.nextUrl;
  let response = NextResponse.next();

  // 初始化data对象
  let data: CookieData = {
    source: searchParams.get("sourceId") || "0",
    accessUrl: encodeURIComponent("/"),
    over18: cookieStore.get("over18")?.value || "false",
  };
  // console.log("data", data, cookieStore.getAll());
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
    data.accessUrl = encodeURIComponent(pathname);
    // console.log("data:", data);
  }

  // 处理over18验证
  if (data.over18 !== "true") {
    // console.log("get in over18 section");
    if (pathname !== "/over18") {
      // 跳转到over18页面
      const redirectUrl = new URL("/over18", request.url);
      response = NextResponse.redirect(redirectUrl);
      return rewriteCookies({ response, data });
    }
    // 正常放行
    return rewriteCookies({ response, data });
  }
  // 处理 auth 登录
  // if (role === "user" || role === "admin") {
  //   // 检查 userToken 是否有效
  //   const userInfo = cookieStore.get("user")?.value || undefined;
  //   const user = JSON.parse(userInfo || "{}");
  //   const userToken = user?.token || undefined;
  //   if (!userToken) {
  //     if (pathname !== "/auth") {
  //       // 跳转到auth页面
  //       const redirectUrl = new URL("/auth", request.url);
  //       response = NextResponse.redirect(redirectUrl);
  //     }
  //     return rewriteCookies({ response, data });
  //   }
  //   // 仍然需要检查 accessToken 是否有效
  //   if (!accessToken) {
  //     // 跳转到auth页面
  //     const redirectUrl = new URL("/auth", request.url);
  //     response = NextResponse.redirect(redirectUrl);
  //     return rewriteCookies({ response, data });
  //   }
  // } else if (role === "visitor") {
  //   // 检查 accessToken 是否有效
  //   if (!accessToken) {
  //     const redirectUrl = new URL("/auth", request.url);
  //     response = NextResponse.redirect(redirectUrl);
  //     return rewriteCookies({ response, data });
  //   }
  // } else {
  //   if (pathname !== "/auth") {
  //     // 跳转到auth页面
  //     const redirectUrl = new URL("/auth", request.url);
  //     response = NextResponse.redirect(redirectUrl);
  //   }
  //   // 正常放行
  //   return rewriteCookies({ response, data });
  // }

  // 处理 auth 登录
  // 处理 auth 检查accessToken是否有效
  // 获取 role
  const role = cookieStore.get("role")?.value || "visitor";
  if (role === "user" || role === "admin") {
    // 检查 accessToken_key 是否有效
    const accessToken = cookieStore.get("accessToken_key")?.value || "";
    if (accessToken) {
      return rewriteCookies({ response, data });
    } else {
      if (pathname !== "/auth") {
        // 跳转到auth页面
        const redirectUrl = new URL("/auth", request.url);
        response = NextResponse.redirect(redirectUrl);
      }
      return rewriteCookies({ response, data });
    }
  } else if (role === "visitor") {
    // 检查 accessToken 是否有效
    const accessToken = cookieStore.get("accessToken")?.value || "";
    if (accessToken) {
      return rewriteCookies({ response, data });
    }
  } else {
    if (pathname !== "/auth") {
      // 跳转到auth页面
      const redirectUrl = new URL("/auth", request.url);
      response = NextResponse.redirect(redirectUrl);
      return rewriteCookies({ response, data });
    }
    // 正常放行
    return rewriteCookies({ response, data });
  }

  //
  //

  //

  const accessToken = cookieStore.get("accessToken")?.value || "";
  console.log("accessToken", accessToken);
  if (["/null", null, "", "undefined"].includes(accessToken)) {
    // console.log("get in access token section");
    if (pathname !== "/auth") {
      // 跳转到auth页面
      const redirectUrl = new URL("/auth", request.url);
      response = NextResponse.redirect(redirectUrl);
      return rewriteCookies({ response, data });
    }
    // 正常放行
    return NextResponse.next();
  }

  // 处理公开路由
  if (isPublicPath(pathname)) {
    return rewriteCookies({ response, data });
  }

  // 处理认证路由
  if (authRoutes.includes(pathname)) {
    if (
      !cookieStore.get("role") ||
      cookieStore.get("role")?.value === "visitor"
    ) {
      const redirectUrl = new URL("/auth/login", request.url);
      response = NextResponse.redirect(redirectUrl);
      return rewriteCookies({ response, data });
    }
  }

  // 处理API认证路由
  if (pathname.startsWith(apiAuthPrefix)) {
    return rewriteCookies({ response, data });
  }

  // 默认情况下继续传递响应
  return rewriteCookies({ response, data });
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  //matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// 获取当前请求的路径? source
const getPath = (req: any) => {
  console.log("req.nextUrl.pathname", req.nextUrl.pathname);
  return req.nextUrl.pathname;
};
