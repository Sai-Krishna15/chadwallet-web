"use client";

import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { createBrowserClient } from "@supabase/ssr";

export function UserSync() {
  const { user, ready, authenticated, getAccessToken } = usePrivy();

  useEffect(() => {
    async function syncUser() {
      if (ready && authenticated && user) {
        try {
          const token = await getAccessToken();
          console.log("Privy access token:", token);
          console.log("Privy user object:", user);
          if (!token) return;

          const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
          );

          const email = user.email?.address || user.google?.email || user.apple?.email || null;
          const wallet = user.wallet?.address || null;
          const avatarUrl = null;

          if (!email && !wallet) return;

          const { error } = await supabase.from('profiles').upsert({
            id: user.id,
            email: email,
            wallet_address: wallet,
            avatar_url: avatarUrl,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'id' });

          if (error) {
            console.log("Failed to sync user to Supabase:", error);
          } else {
            console.log("User successfully synced to Supabase");
          }
        } catch (err) {
          console.log("Exception during user sync:", err);
        }
      }
    }

    syncUser();
  }, [user, ready, authenticated, getAccessToken]);

  return null;
}
