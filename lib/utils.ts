import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidEmail = (value: string): string => {
  if (!value) {
    return "请输入邮箱地址";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(value)) {
    return "";
  } else {
    return "请输入有效的邮箱地址";
  }
};

export const isValidPassword = (value: string): string => {
  if (!value) {
    return "请输入密码";
  }
  if (value.length < 6) {
    return "密码长度不能少于 6 位";
  }
  return "";
};

export const isValidRepassword = (
  password: string,
  repassword: string
): string => {
  if (!repassword) {
    return "请再次输入密码";
  }
  if (password !== repassword) {
    return "两次输入密码不一致";
  }
  return "";
};
