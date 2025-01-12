"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { LoginButton } from "./login-button";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { data: session } = useSession();
  const currentPath = usePathname();
  const [isOfferDismissed, setIsOfferDismissed] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const isOfferDismissed = window.localStorage.getItem("isOfferDismissed");
    setIsOfferDismissed(isOfferDismissed === "true");
  }, []);

  const handleOfferDismiss = () => {
    setIsOfferDismissed(true);
    window.localStorage.setItem("isOfferDismissed", "true");
  };

  const isDoctor = session?.user?.role === "DOCTOR";

  return (
    <>
      {/* Sign up bar */}
      {!isOfferDismissed && (
        <div className="bg-blue-600">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <p className="text-white font-medium">
              <span className="hidden md:inline">
                Get 3 months free with our annual plan.{" "}
              </span>
              Limited time offer!
            </p>
            <button
              onClick={handleOfferDismiss}
              className="text-white font-semibold bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4">
        <NavigationMenu className="flex justify-between items-center py-2 w-full max-w-full">
          <Link href="/">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-2xl font-bold hidden md:inline">
                MediConnect
              </span>
            </div>
          </Link>
          <NavigationMenuList className="space-x-8">
            {!session?.user ? (
              <>
                <NavigationMenuItem>
                  <Link href="/#features" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-gray-300 hover:text-purple-500 hidden md:inline",
                        `${
                          currentPath === "/#features" ? "text-purple-500" : ""
                        }`
                      )}
                    >
                      Features
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/pricing" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-gray-300 hover:text-purple-500 hidden md:inline",
                        `${currentPath === "/pricing" ? "text-purple-500" : ""}`
                      )}
                    >
                      Pricing
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </>
            ) : (
              <>
                {isDoctor ? (
                  <NavigationMenuItem>
                    <Link href="/dashboard" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "text-gray-300 hover:text-purple-500 hidden md:inline",
                          `${
                            currentPath === "/dashboard"
                              ? "text-purple-500"
                              : ""
                          }`
                        )}
                      >
                        Dashboard
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem>
                    <Link href="/records" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "text-gray-300 hover:text-purple-500 hidden md:inline",
                          `${
                            currentPath === "/records" ? "text-purple-500" : ""
                          }`
                        )}
                      >
                        My Medical Records
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )}
              </>
            )}
            <NavigationMenuItem>
              <LoginButton />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}
