"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Page } from "@/components/Navbar";
import Hamburger from "@/components/Hamburger";
import { useState } from "react";
import NavAuthButton from "./NavAuthButton";

const MainNav = ({ pages }: { pages: Page[] }) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4">
      {/* Desktop menu */}
      <ul className="hidden lg:flex gap-2">
        {pages.map(({ href, title }) => (
          <li key={href}>
            <Link href={href}>
              <span
                className={cn(
                  `
                    uppercase whitespace-nowrap font-urbanist text-base px-5 py-3 rounded
                    bg-brand-orange-200 text-brand-blue-500 hover:bg-brand-orange-400
                    dark:bg-brand-blue-900 dark:text-white dark:hover:bg-brand-blue-700
                  `,
                  {
                    "bg-brand-blue-300 text-brand-orange-100 pointer-events-none":
                      isActive(href),
                  }
                )}
              >
                {title}
              </span>
            </Link>
          </li>
        ))}
        {/* Auth button */}
        <li>
          <NavAuthButton />
        </li>
      </ul>

      {/* Mobile hamburger button */}
      <div className="lg:hidden self-end">
        <Hamburger open={menuOpen} clickHandler={setMenuOpen} />
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <ul className="lg:hidden mt-2 flex flex-col gap-4 w-full">
          {pages.map(({ href, title }) => (
            <li key={href}>
              <Link href={href} onClick={() => setMenuOpen(false)}>
                <span
                  className={cn(
                    `
                      block text-center uppercase font-urbanist text-base px-4 py-3 rounded
                      bg-brand-orange-200 text-brand-blue-500 hover:bg-brand-orange-400
                      dark:bg-brand-blue-900 dark:text-white dark:hover:bg-brand-blue-700
                    `,
                    {
                      "bg-brand-blue-300 text-brand-orange-100 pointer-events-none":
                        isActive(href),
                    }
                  )}
                >
                  {title}
                </span>
              </Link>
            </li>
          ))}
          {/* Auth button */}
          <li>
            <NavAuthButton 
              asBlock 
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3" />
          </li>
        </ul>
      )}
    </nav>
  );
};

export default MainNav;