import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Hospital, LogOut, PersonStanding } from "lucide-react";
import { Icons } from "@/components/icons";
import { ToggleGroup } from "./ui/toggle-group";
import { ToggleGroupItem } from "@radix-ui/react-toggle-group";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function LoginButton() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [role, setRole] = useState("PATIENT");

  const handleGoogleLogin = async () => {
    await signIn("google", { redirectTo: "/" });
  };

  const updateUserRole = async (role: string) => {
    await fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    })
      .then(() => {
        signOut({ redirectTo: "/" });
      })
      .catch((error) => console.error(error));
  };

  const handleRoleChange = async (role: string) => {
    setRole(role);
    setIsOpenAlert(true);
  };

  if (status === "loading") {
    return (
      <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
            <Avatar className="cursor-pointer border-2 border-blue-500/20">
              <AvatarImage
                src={session.user?.image as string}
                alt="User Avatar"
              />
              <AvatarFallback className="bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                {session.user?.name
                  ?.split(" ")
                  .map((name: string) => name[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">
              {session.user?.name || session.user?.email}
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-gray-800/90 backdrop-blur-sm border-gray-700">
          <DropdownMenuLabel className="text-gray-400">
            {session.user?.email}
          </DropdownMenuLabel>
          <ToggleGroup
            type="single"
            className="py-4"
            onValueChange={handleRoleChange}
          >
            <ToggleGroupItem
              value="DOCTOR"
              aria-label="Toggle doctor"
              className={`flex items-center gap-1 ${
                session.user.role === "DOCTOR" ? "text-purple-500" : ""
              }`}
            >
              <div className="flex items-center gap-1">
                <Hospital className="h-6 w-6" />
                Doctor
              </div>
            </ToggleGroupItem>

            <ToggleGroupItem
              value="PATIENT"
              aria-label="Toggle patient"
              defaultChecked={true}
              className={`flex items-center gap-1 ${
                session.user.role === "PATIENT" ? "text-purple-500" : ""
              }`}
            >
              <div className="flex items-center gap-1 ml-4">
                <PersonStanding className="h-6 w-6" />
                Patient
              </div>
            </ToggleGroupItem>
          </ToggleGroup>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => signOut({ redirectTo: "/" })}
              className="text-red-400 hover:text-red-300 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <AlertDialog open={isOpenAlert} onOpenChange={setIsOpenAlert}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will have to log in again to access your account
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => updateUserRole(role)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 
            hover:from-blue-600 hover:to-purple-600 text-white font-medium
            rounded-lg transform hover:scale-105 transition-all duration-300
            shadow-lg hover:shadow-blue-500/25"
        >
          Get Started
        </Button>
      </DialogTrigger>

      <DialogContent
        className="max-w-md bg-gray-800/95 backdrop-blur-sm p-8 
        rounded-2xl border border-gray-700 shadow-xl"
      >
        <DialogHeader>
          <DialogTitle
            className="text-2xl font-bold bg-gradient-to-r 
            from-blue-500 to-purple-500 bg-clip-text text-transparent"
          >
            Join Our Healthcare Platform
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Access AI-powered healthcare management tools
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col gap-4 mt-6">
          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            className="w-full py-6 bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-900
    rounded-lg transform hover:scale-105 transition-all duration-300
    flex items-center justify-center gap-3 border border-gray-300"
          >
            <Icons.googleLogo width={24} height={24} />
            <span className="font-medium">Sign in with Google</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
