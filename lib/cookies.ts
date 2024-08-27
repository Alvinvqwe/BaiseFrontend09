"use client";

export function getAllCookies(): Record<string, string> {
  const cookies = document.cookie.split("; ");
  const cookieObj: Record<string, string> = {};

  cookies.forEach((cookie) => {
    const [name, value] = cookie.split("=");
    cookieObj[decodeURIComponent(name)] = decodeURIComponent(value);
  });

  return cookieObj;
}

// import { cookies } from "next/headers";

export function getCookie(name: string): string | undefined {
  // const cookie = cookies();
  // return cookie.get(name)?.value || "";

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
  return undefined;
}

export function deleteCookie(name: string) {
  // 设置 cookie 的过期时间为过去的时间，确保 cookie 被删除
  document.cookie = `${name}=; Max-Age=0; path=/;`;
}

export function deleteAllCookies() {
  const cookies = document.cookie.split(";");
  cookies.forEach((cookie) => {
    const cookieName = cookie.split("=")[0].trim();

    // 删除cookie
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
}

export function clearAllCookies() {
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    console.log("name", name);
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }
}
