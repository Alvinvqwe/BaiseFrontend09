"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { getCookie } from "@/lib/cookies";
import { requestToken } from "@/api/access";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";

const AuthToken = () => {
  const router = useRouter();
  useEffect(() => {
    if (typeof window === "undefined") return;

    const navigate = (path: string) => {
      setTimeout(() => {
        router.push(path);
      }, 0);
    };

    // 获取 accessUrl
    var url = getCookie("accessUrl");
    // console.log("url", url);
    const decodedPath = decodeURIComponent(url || "/");
    console.log("url", url, decodedPath);
    // 定义请求函数
    const reqUserToken = async () => {
      try {
        const response = await requestToken();
        console.log("response", response);
        if (!response.success) {
          console.log("response", response);
          if (response.message) {
            toast.error(response.message, {
              position: "top-center",
              duration: 800,
            });
          }
        } else {
          // 写入/更新 cookie accessToken
          document.cookie = `accessToken=${
            response.data.accessToken || ""
          }; path=/`;
          document.cookie = `role=visitor; path=/`;
          // 要判断 role, 并且验证 userToken, 如果无效则更改为 visitor, 并且清空 user, session logout
          const role = getCookie("role");
          if (role === "user" || role === "admin") {
            // 检查 userToken 是否有效
            const userToken = getCookie("userToken") || undefined;
            if (!userToken) {
              console.log("userToken1", userToken);
              document.cookie = `role=visitor; path=/`;
              document.cookie = `userToken=; path=/`;
              signOut({ callbackUrl: "/" });
              toast("请重新登录!", {
                position: "top-center",
                duration: 800,
              });
            }
          }
          // navigate(decodedPath);
          // // router.push(decodedPath);
          // console.log("auth page:", document.cookie);
        }
      } catch (e) {
        console.log(e);
      } finally {
        navigate(decodedPath);
      }
    };

    // 检查是否有 accessToken
    const accessToken = getCookie("accessToken") || undefined;
    if (!accessToken) {
      // 如果无效，但是 role, userToken 有效，则仅仅生成 accessToken
      // 如果都无效，生成 accessToken, role = visitor, 并且重置 user 相关信息
      try {
        reqUserToken();
      } catch (error) {
        console.log(error);
      }
    } else {
      const role = getCookie("role");
      if (role === "user" || role === "admin") {
        // 检查 userToken 是否有效
        const userToken = getCookie("userToken") || undefined;
        if (!userToken) {
          console.log("userToken2", userToken);
          document.cookie = `role=visitor; path=/`;
          document.cookie = `userToken=; path=/`;
          signOut({ callbackUrl: "/" });
          toast("请重新登录!", {
            position: "top-center",
            duration: 800,
          });
        }
      }
      navigate(decodedPath);
      // router.push(decodedPath);
    }
  }, []);

  return <div></div>;
};

export default AuthToken;
