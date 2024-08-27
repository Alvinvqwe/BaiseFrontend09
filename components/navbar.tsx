"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/react";
// import { Link } from "@nextui-org/link";
import Link from "next/link";
import { Button, Kbd, Input, link as linkStyles } from "@nextui-org/react";
import clsx from "clsx";
import Login from "@/components/Login";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  DiscordIcon,
  SearchIcon,
  CameraIcon,
} from "@/components/icons";
import { useState } from "react";

const searchInput = (
  <Input
    aria-label="Search"
    classNames={{
      inputWrapper: "bg-default-100",
      input: "text-sm",
    }}
    endContent={
      <Kbd className="hidden lg:inline-block" keys={["command"]}>
        K
      </Kbd>
    }
    value={""}
    defaultValue=""
    labelPlacement="outside"
    placeholder="Search..."
    startContent={
      <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
    }
    type="search"
  />
);

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="mx-auto px-auto">
      {/* <NavbarPhone /> */}
      <NextUINavbar
        maxWidth="full"
        position="sticky"
        className="flex px-2 sm:px-12"
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        {/* menu section */}
        <NavbarContent className="flex basis-2/5" justify="start">
          {/* logo section */}
          <NavbarMenuToggle className="flex justify-start sm:hidden" />
          <NavbarBrand
            as="li"
            className="flex justify-end sm:justify-start max-w-fit "
          >
            <Link
              className="items-center font-bold text-inherit text-2xl"
              href="/"
            >
              BaiseHub
            </Link>
          </NavbarBrand>
          {/* 正常状态下 menu Items */}
          <ul className="hidden sm:flex gap-4 sm:justify-center ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <Link
                  className={clsx(
                    "text-xl relative h-full flex items-center hover:underline",
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium data-[active=true]:after:content-[''] data-[active=true]:after:absolute  data-[active=true]:after:left-0  data-[active=true]:after:bottom-0  data-[active=true]:after:right-0 data-[active=true]:after:h-[2px] data-[active=true]:after:rounded-[2px] data-[active=true]:after:bg-primary"
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>
        <NavbarMenu>
          {searchInput}
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className={clsx(
                    "text-xl relative h-full flex items-center hover:underline",
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium data-[active=true]:after:content-[''] data-[active=true]:after:absolute  data-[active=true]:after:left-0  data-[active=true]:after:bottom-0  data-[active=true]:after:right-0 data-[active=true]:after:h-[2px] data-[active=true]:after:rounded-[2px] data-[active=true]:after:bg-primary"
                  )}
                  color="foreground"
                  href={item.href}
                >
                  <Button
                    variant="light"
                    onPress={() => setIsMenuOpen(false)}
                    className="text-lg hover:underline w-full"
                  >
                    {item.label}
                  </Button>
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>

        {/* 搜索 */}
        <NavbarContent
          className="hidden sm:flex basis-2/5 lg:px-24 sm:basis-full"
          justify="center"
        >
          {searchInput}
          <Button isIconOnly color="warning" variant="faded" aria-label="上传">
            <CameraIcon />
          </Button>
        </NavbarContent>

        {/* 右侧菜单项 */}
        <NavbarContent className="flex basis-2/5 sm:basis-1/5" justify="end">
          <NavbarItem className="hidden md:flex gap-2">
            <Link aria-label="Twitter" href={siteConfig.links.twitter}>
              <TwitterIcon className="text-default-500" />
            </Link>
            <Link aria-label="Discord" href={siteConfig.links.discord}>
              <DiscordIcon className="text-default-500" />
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Login />
          </NavbarItem>
          <ThemeSwitch />
        </NavbarContent>
      </NextUINavbar>
    </div>
  );
};
