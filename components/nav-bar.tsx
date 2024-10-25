"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();
  const [selectedProfile, setSelectedProfile] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedProfile") || "medical";
    }
    return "medical";
  });

  const onProfileChange = (profile: string) => {
    setSelectedProfile(profile);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedProfile", profile);
    }
    router.push("/" + profile);
  };

  return (
    <NavigationMenu className="w-full max-w-[unset] bg-slate-900 p-4">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="flex items-center justify-between w-full">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Documentation
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Select onValueChange={onProfileChange} value={selectedProfile}>
                <SelectTrigger className="border-0 outline-none w-[220px] focus:ring-0 focus:ring-transparent focus:ring-offset-0">
                  <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage
                      src={
                        selectedProfile === "md"
                          ? "/doctor.png"
                          : "/patient.png"
                      }
                      className="bg-gray-400"
                      alt={selectedProfile}
                    />
                    <AvatarFallback>Mihi</AvatarFallback>
                  </Avatar>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Patient</SelectItem>
                  <SelectItem value="md">MD - generalist</SelectItem>
                </SelectContent>
              </Select>
            </NavigationMenuItem>
          </NavigationMenuList>
        </div>
      </div>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
