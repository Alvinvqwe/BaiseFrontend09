// // "use client";
// "use server";
// import "./globals.css";
// import { Metadata, Viewport } from "next";
// import { Link } from "@nextui-org/link";
// import clsx from "clsx";

// import { Providers } from "./providers";
// import { SessionProvider, useSession } from "next-auth/react";

// import { siteConfig } from "@/config/site";
// import { fontSans } from "@/config/fonts";
// import { Navbar } from "@/components/navbar";
// import { useState, useEffect } from "react";
// import { getCookie, getUserAgent } from "@/lib/accessInfo";
// import { useRouter } from "next/navigation";
// import { sendAccessInfo } from "@/api/access";
// // export const metadata: Metadata = {
// //   title: {
// //     default: siteConfig.name,
// //     template: `%s - ${siteConfig.name}`,
// //   },
// //   description: siteConfig.description,
// //   icons: {
// //     icon: "/favicon.ico",
// //   },
// // };
// import { cookies } from "next/headers";

// export const viewport: Viewport = {
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "white" },
//     { media: "(prefers-color-scheme: dark)", color: "black" },
//   ],
//   width: "device-width",
//   initialScale: 1,
//   maximumScale: 1,
//   userScalable: false,
// };

// export const metadata: Metadata = {
//   title: "BaiseHub",
//   description: "BaiseHub.com",
// };

// export default async function Layout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: { slug: string };
// }) {
//   // const router = useRouter();
//   // 1 pathname 获取 source, 写入 cookies

//   // useEffect(() => {
//   //   const query = new URLSearchParams(window.location.search);
//   //   const sourceParams = query.get("sourceId") || "0";
//   //   document.cookie = `source=${sourceParams}; path=/`;
//   //   const fetchSession = async () => {
//   //     const info = await getUserAgent(null);
//   //     // console.log(getCookie("source"));
//   //     // console.log(document.cookie);
//   //     // const response = await sendAccessInfo();
//   //   };
//   //   fetchSession();
//   // }, []);

//   const cookieStore = cookies();

//   const query = new URLSearchParams(params.slug);
//   const sourceParams = query.get("sourceId") || "0";
//   cookieStore.set("source", sourceParams, {
//     path: "/",
//     httpOnly: true,
//     secure: true,
//     sameSite: "strict",
//   });
//   const fetchSession = async () => {
//     const info = await getUserAgent(null);
//     // console.log(getCookie("source"));
//     // console.log(document.cookie);
//     // const response = await sendAccessInfo();
//   };
//   fetchSession();
//   return (
//     <SessionProvider>
//       <html suppressHydrationWarning lang="en">
//         <head>
//           <meta
//             name="viewport"
//             content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
//           />
//         </head>
//         <body
//           className={clsx(
//             "min-h-screen bg-background font-sans antialiased",
//             fontSans.variable
//           )}
//         >
//           <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
//             <div className="relative flex flex-col min-h-screen h-fit">
//               <Navbar />
//               {/* <main className="container mx-auto max-w-7xl pt-1 px-6 flex-grow"> */}
//               <main className="container mx-auto pt-1 flex-grow">
//                 {children}
//               </main>
//               <footer className="w-full flex items-center justify-center py-3">
//                 <Link
//                   isExternal
//                   className="flex items-center gap-1 text-current"
//                   href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
//                   title="nextui.org homepage"
//                 >
//                   <span className="text-default-600">Powered by</span>
//                   <p className="text-primary">NextUI</p>
//                 </Link>
//               </footer>
//             </div>
//           </Providers>
//         </body>
//       </html>
//     </SessionProvider>
//   );
// }
