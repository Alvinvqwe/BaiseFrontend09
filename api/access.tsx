"use server";
import createAxiosInstance from "@/lib/AxiosInstance";
import { ApiResponse } from "@/types/api-types";

export const requestToken = async () => {
  var apiResponse: ApiResponse = {
    success: false,
    message: "请求失败!",
    data: null,
  };
  try {
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.post("/auth/token", {});
    console.log("response", response.status);
    if (response.status === 200) {
      console.log("response.data", response.data);
      return response.data;
    } else {
      console.log("response else", response.status);
      return apiResponse;
    }
  } catch (error) {
    console.error("request error", error);
  }
};
