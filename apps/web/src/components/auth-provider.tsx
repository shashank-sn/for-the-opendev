"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { UsernameModal } from "./username-modal";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending, refetch } = authClient.useSession();
  const [needsUsername, setNeedsUsername] = useState(false);

  useEffect(() => {
    if (!session?.user) {
      setNeedsUsername(false);
      return;
    }
    const u = session.user as { username?: string | null };
    setNeedsUsername(!u.username);
  }, [session]);

  return (
    <>
      {children}
      <UsernameModal
        open={!isPending && !!session?.user && needsUsername}
        onComplete={() => {
          setNeedsUsername(false);
          refetch();
        }}
      />
    </>
  );
}

export function useAuthSession() {
  return authClient.useSession();
}