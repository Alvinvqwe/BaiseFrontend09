// "use client";
import "./globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
// import type { Viewport } from "next";
import { Providers } from "./providers";
import { SessionProvider, useSession } from "next-auth/react";
// import { cookies, headers } from "next/headers";
// import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
// import { useState, useEffect } from "react";
import {
  TwitterIcon,
  DiscordIcon,
  SearchIcon,
  CameraIcon,
} from "@/components/icons";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "BaiseHub",
  description: "BaiseHub.com",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html suppressHydrationWarning lang="en">
        <body
          className={clsx(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
            <Toaster />
            <div className="relative flex flex-col h-screen">
              <div className="w-full sticky z-50 top-0">
                <Navbar />
              </div>

              {/* <main className="container mx-auto max-w-7xl pt-1 px-6 flex-grow"> */}
              <main className="container mx-auto pt-1 px-6 flex-grow">
                {children}
              </main>
              <footer className="container flex-col items-center justify-center py-12">
                <div className="flex flex-row min-h-fit justify-between">
                  <div className="hidden sm:text-lg sm:w-1/3 sm:flex items-end sm:m-12 font-bold gap-1">
                    <Link isExternal aria-label="Twitter" href={"#"}>
                      <TwitterIcon className="text-default-500" />
                    </Link>
                    <Link isExternal aria-label="Discord" href={"#"}>
                      <DiscordIcon className="text-default-500" />
                    </Link>
                    @BaiseHub.com
                  </div>
                  <div className="flex flex-row flex-grow justify-center gap-12">
                    <div className="flex flex-col gap-3">
                      <h1 className="my-3 text-2xl text-center font-bold">
                        关于
                      </h1>
                      <Link
                        className="text-start text-sm hover:underline"
                        href="#"
                      >
                        投放广告
                      </Link>
                      <Link
                        className="text-start text-sm hover:underline"
                        href="#"
                      >
                        联系我们
                      </Link>
                      <Link
                        className="text-start text-sm hover:underline"
                        href="#"
                      >
                        备用地址
                      </Link>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h1 className="my-3 text-2xl text-center font-bold">
                        政策
                      </h1>
                      <Link
                        className="text-start text-sm hover:underline"
                        href="#"
                      >
                        使用条例
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="text-center my-32">
                  Copyright © 2024 BaiseHub
                </div>
              </footer>
            </div>
          </Providers>
          {/* <Toaster /> */}
        </body>
      </html>
    </SessionProvider>
  );
}
