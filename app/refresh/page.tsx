"use client";

import { deleteAllCookies } from "@/lib/accessInfo";

const AuthPage: React.FC = () => {
  deleteAllCookies();

  return <div></div>;
};

export default AuthPage;
