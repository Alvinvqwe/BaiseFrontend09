// "use client";
"use server";
import axios, { AxiosInstance } from "axios";
import { getCookie } from "./accessInfo";
import { cookies } from "next/headers";
import { auth } from "./auth";

export const createAxiosInstance = async (): Promise<AxiosInstance> => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 10000,
  });
  const cookie = cookies();
  try {
    instance.defaults.headers.common["Content-Type"] = "application/json";

    // 获取accessToken
    const accessToken = cookie.get("accessToken")?.value || undefined;
    if (accessToken) {
      console.log("Adding access token to headers:", accessToken);
      instance.defaults.headers.common["accessToken"] = `Bearer ${accessToken}`;
    }

    // 获取userToken
    const session = await auth();
    console.log("session", session);
    if (session && session.user && session.user.userToken) {
      instance.defaults.headers.common[
        "accessToken"
      ] = `Bearer ${session.user.userToken}`;
    }

    // 获取source cookie
    // const source = getCookie("source") || "0";
    const source = cookie.get("source")?.value || "0";
    console.log("Adding source to headers:", source);
    instance.defaults.headers.common["source"] = source;
  } catch (error) {
    console.error("Failed to initialize Axios instance:", error);
  }
  return instance;
};

export default createAxiosInstance;
