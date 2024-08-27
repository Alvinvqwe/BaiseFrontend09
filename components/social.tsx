"use client";

import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const onClick = (provider: "google" | "x") => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="flat"
        onPress={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="flat"
        onPress={() => onClick("x")}
      >
        <FaXTwitter className="h-5 w-5" />
      </Button>
    </div>
  );
};
