"use client";

import Image from "next/image";
import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { login, authenticated, logout, ready } = usePrivy();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-white/5">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/assets/logo/dark.png" alt="ChadWallet Logo" width={32} height={32} className="w-8 h-8 object-contain" />
        <span className="text-xl font-bold tracking-tight">ChadWallet</span>
      </Link>
      <div className="flex items-center gap-4">
        {!ready ? (
          <Button disabled className="bg-primary/50 text-white">Loading...</Button>
        ) : authenticated ? (
          <>
            <Link href="/profile">
              <Button variant="ghost" className="text-white hover:text-white/80">Profile</Button>
            </Link>
            <Button onClick={logout} variant="secondary" className="bg-white/10 text-white hover:bg-white/20">Sign out</Button>
          </>
        ) : (
          <Button onClick={login} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Sign up
          </Button>
        )}
      </div>
    </nav>
  );
}
