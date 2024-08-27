"use server";
import createAxiosInstance from "@/lib/AxiosInstance";
import bcrypt from "bcryptjs";
import { ApiResponse } from "@/types/api-types";

/**
 * Login request to the server.
 * @param email The email of the user to login.
 * @param password The password of the user to login.
 * @param username The username of the user to login, defaults to the local part of the email.
 * @returns The response data from the server.
 */
export const loginReq = async (
  email: string,
  password: string,
  username?: string
) => {
  var apiResponse: ApiResponse = {
    success: false,
    message: "请求失败!",
    data: null,
  };
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.post("/auth/login", {
      type: "credentials",
      email: email,
      password: password,
      username: username || email.split("@")[0],
    });
    console.log("login response", response.status, response.data);
    if (response.status === 200) {
      return response.data;
    } else {
      console.log("login error", response);
      return apiResponse;
    }
  } catch (error) {
    console.error("request error", error);
    return apiResponse;
  }
};

export const registerReq = async (email: string, password: string) => {
  const apiResponse: ApiResponse = {
    success: false,
    message: "请求失败",
    data: null,
  };
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.post("/auth/register", {
      email: email,
      password: bcrypt.hashSync(password, 10),
    });
    if (response.status === 200) {
      return response.data;
    } else {
      console.log("register error", response);
      return apiResponse;
    }
  } catch (error) {
    console.error("request error", error);
    return apiResponse;
  }
};
