// import {
//   Navbar as NextUINavbar,
//   NavbarContent,
//   NavbarMenu,
//   NavbarMenuToggle,
//   NavbarBrand,
//   NavbarItem,
//   NavbarMenuItem,
// } from "@nextui-org/react";
// import { Link } from "@nextui-org/link";
// import NextLink from "next/link";
// import { Button, Kbd, Input, link as linkStyles } from "@nextui-org/react";
// import clsx from "clsx";
// import Login from "@/components/Login";
// import { siteConfig } from "@/config/site";
// import { ThemeSwitch } from "@/components/theme-switch";
// import {
//   TwitterIcon,
//   DiscordIcon,
//   SearchIcon,
//   CameraIcon,
// } from "@/components/icons";

// const NavbarPhone = () => {
//   return (
//     <NextUINavbar
//       maxWidth="full"
//       position="sticky"
//       className="sm:hidden"
//       isBordered
//     >
//       <NavbarContent className="basis-1/5" justify="start">
//         {/* 手机端菜单项 */}
//         <NavbarMenuToggle />
//       </NavbarContent>
//       <NavbarMenu>
//         {searchInput}
//         <div className="mx-4 mt-2 flex flex-col gap-2">
//           {siteConfig.navItems.map((item, index) => (
//             <NavbarMenuItem key={`${item}-${index}`}>
//               <Link
//                 color={
//                   index === 2
//                     ? "primary"
//                     : index === siteConfig.navItems.length - 1
//                     ? "danger"
//                     : "foreground"
//                 }
//                 href="#"
//                 size="lg"
//               >
//                 {item.label}
//               </Link>
//             </NavbarMenuItem>
//           ))}
//         </div>
//       </NavbarMenu>
//       <NavbarContent className="basis-1/5" justify="start">
//         <NavbarBrand as="li" className="gap-3 max-w-fit">
//           <NextLink
//             className="flex justify-start items-center text-inherit text-2xl font-bold"
//             href="/"
//           >
//             BaiseHub
//           </NextLink>
//         </NavbarBrand>
//       </NavbarContent>
//       <NavbarContent className="basis-2/5" justify="end">
//         <ThemeSwitch />
//         <Login />
//       </NavbarContent>
//     </NextUINavbar>
//   );
// };

// const searchInput = (
//   <Input
//     aria-label="Search"
//     classNames={{
//       inputWrapper: "bg-default-100",
//       input: "text-sm",
//     }}
//     endContent={
//       <Kbd className="hidden lg:inline-block" keys={["command"]}>
//         K
//       </Kbd>
//     }
//     value={""}
//     defaultValue=""
//     labelPlacement="outside"
//     placeholder="Search..."
//     startContent={
//       <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
//     }
//     type="search"
//   />
// );

// export const Navbar = () => {
//   return (
//     <div className="container mx-auto">
//       <NavbarPhone />
//       <NextUINavbar
//         maxWidth="full"
//         position="sticky"
//         className="hidden sm:flex"
//       >
//         <NavbarContent className="basis-1/5" justify="start">
//           {/* logo */}
//           <NavbarBrand as="li" className="gap-3 max-w-fit">
//             <NextLink
//               className="flex justify-start items-center font-bold text-inherit text-2xl"
//               href="/"
//             >
//               BaiseHub
//             </NextLink>
//           </NavbarBrand>
//           {/* 正常状态下 menu Items */}
//           <ul className="flex gap-4 sm:justify-start ml-2">
//             {siteConfig.navItems.map((item) => (
//               <NavbarItem key={item.href}>
//                 <NextLink
//                   className={clsx(
//                     "text-xl relative h-full flex items-center hover:underline",
//                     linkStyles({ color: "foreground" }),
//                     "data-[active=true]:text-primary data-[active=true]:font-medium data-[active=true]:after:content-[''] data-[active=true]:after:absolute  data-[active=true]:after:left-0  data-[active=true]:after:bottom-0  data-[active=true]:after:right-0 data-[active=true]:after:h-[2px] data-[active=true]:after:rounded-[2px] data-[active=true]:after:bg-primary"
//                   )}
//                   color="foreground"
//                   href={item.href}
//                 >
//                   {item.label}
//                 </NextLink>
//               </NavbarItem>
//             ))}
//           </ul>
//         </NavbarContent>

//         {/* 搜索 */}
//         <NavbarContent
//           // className="hidden sm:flex basis-3/5 sm:basis-full"
//           className="flex  basis-2/5 lg:px-24 sm:basis-full"
//           justify="center"
//         >
//           {searchInput}
//           <Button isIconOnly color="warning" variant="faded" aria-label="上传">
//             <CameraIcon />
//           </Button>
//         </NavbarContent>

//         {/* 右侧菜单项 */}
//         <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
//           <NavbarItem className="hidden md:flex gap-2">
//             <Link
//               isExternal
//               aria-label="Twitter"
//               href={siteConfig.links.twitter}
//             >
//               <TwitterIcon className="text-default-500" />
//             </Link>
//             <Link
//               isExternal
//               aria-label="Discord"
//               href={siteConfig.links.discord}
//             >
//               <DiscordIcon className="text-default-500" />
//             </Link>
//           </NavbarItem>
//         </NavbarContent>

//         <NavbarContent justify="end">
//           {/* 登录注册按钮 */}
//           <NavbarItem>
//             <Login />
//           </NavbarItem>
//           <ThemeSwitch />
//         </NavbarContent>
//       </NextUINavbar>
//     </div>
//   );
// };
