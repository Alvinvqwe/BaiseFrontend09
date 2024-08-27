"use client";
// import axios from "axios";
// import { getSession } from "next-auth/react";
// // import { cookies } from "next/headers";
// import { getCookie } from "./accessInfo";

// const createAxiosInstance = async () => {
//   const axiosInstance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_BASE_URL,
//     timeout: 10000,
//   });
//   try {
//     axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
//     // 获取当前用户访问信息, token
//     const session = await getSession();
//     if (session && session.user) {
//       // console.log("get in session");
//       const accessToken = session.user?.accessToken_key || "";
//       // console.log("accessToken: ", accessToken);
//       axiosInstance.defaults.headers.common[
//         "Authorization"
//       ] = `Bearer ${accessToken}`;
//     } else {
//       // 获取cookie, 临时用户身份
//       const cookie = getCookie("accessInfo");
//       if (cookie) {
//         console.log("get in cookie");
//         const userInfo = JSON.parse(cookie);
//         axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${
//           userInfo?.accessToken_key || ""
//         }`;
//       }
//     }

//     // 获取cookie
//     const sourceCookies = getCookie("source");
//     if (sourceCookies) {
//       const sourceInfo = JSON.parse(sourceCookies);
//       // console.log("sourceCookies: ", sourceInfo);
//       axiosInstance.defaults.headers.common["source"] =
//         JSON.stringify(sourceInfo);
//     }
//   } catch (error) {
//     console.log(error);
//   }
//   return axiosInstance;
// };

// export default createAxiosInstance;

import axios, { AxiosInstance } from "axios";
// import { getSession } from "next-auth/react";
import { getCookie } from "./accessInfo";

export const createAxiosInstance = async (): Promise<AxiosInstance> => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 10000,
  });
  try {
    instance.defaults.headers.common["Content-Type"] = "application/json";
    // 获取当前用户访问信息, token
    const session = getCookie("userToken") || undefined;
    console.log("get in cookie", session);
    if (session && getCookie("role") !== "visitor") {
      console.log("get in session", session);
      const userToken = session || "";
      instance.defaults.headers.common["userToken"] = `Bearer ${userToken}`;
    }
    const cookie = getCookie("accessToken") || undefined;
    console.log("get in cookie", cookie);
    if (cookie) {
      console.log("get in cookie2", cookie || "");
      instance.defaults.headers.common["accessToken"] = `Bearer ${
        cookie || ""
      }`;
    }
    // 获取source cookie
    const source = getCookie("source") || "0";
    instance.defaults.headers.common["source"] = source;
  } catch (error) {
    console.error("Failed to initialize Axios instance:", error);
  }

  return instance;
};

export default createAxiosInstance;
