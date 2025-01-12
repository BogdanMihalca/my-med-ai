import { Analytics } from "@vercel/analytics/react";
import { auth } from "@/auth";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/nav-bar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";
import ThemeProvider from "@/components/theme-provider";
import type { Metadata } from "next";

import "./globals.css";
import { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediConnect",
  description: "MediConnect is a platform for managing your medical records.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <Navbar />

            <main className="mx-auto">{children}</main>

            <Footer />

            <Toaster />
          </ThemeProvider>
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
