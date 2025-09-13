"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase_client";
import { cn } from "@/lib/utils";

export default function NavAuthButton({
  className,
  onClick,
  asBlock = false,
}: {
  className?: string;
  onClick?: () => void;
  asBlock?: boolean;
}) {
  const pathname = usePathname();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createSupabaseBrowser();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setEmail(user?.email ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setEmail(session?.user?.email ?? null)
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const href = "/user_profile";
  const isActive = pathname === href;

  const base =
    "uppercase whitespace-nowrap font-urbanist px-5 py-3 rounded border-4 border-brand-blue-500 bg-brand-orange-100 text-brand-blue-500 hover:bg-brand-orange-500 "

  const active =
    "bg-brand-blue-500 text-brand-orange-100 pointer-events-none border-4 border-brand-orange-100";

  return (
    <Link href={href} onClick={onClick} aria-label={email ? "Profile" : "Sign In"}>
      <span
        className={cn(
          base,
          isActive && active,
          asBlock && "block text-center",
          className
        )}
      >
        {email ? "Profile" : "Sign In"}
      </span>
    </Link>
  );
}

