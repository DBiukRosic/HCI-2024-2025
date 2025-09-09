//"use client";

import Logo from "@/components/Logo";
import MainNav from "@/components/MainNav";
import Link from "next/link";

export type Page = {
    href: string;
    title: string;
  };

const pages: Page[] = [
    { href: "/", title: "Home" },
    { href: "/car_repair_topics", title: "Our Services" },
    { href: "/tutorials", title: "Tutorials" },
    { href: "/find_our_shops", title: "Find Us" },
    { href: "/about_us", title: "About Us" },
    { href: "/user_profile", title: "Sign In" },
   // { href: "/disclaimers", title: "Disclaimers" },
   //{ href: "/contact_us", title: "Contact Us" },
  ];

  const NavBar = () => {
  
    return (
      <div className="sticky top-0 z-50 bg-brand-blue-200/90 w-full border-b border-gray-200 dark:bg-brand-blue-800 dark:border-gray-500">
        <div className="container flex items-center justify-between">
          <Link href="/" aria-label="Go to homepage">
            <Logo />
          </Link>
          <MainNav pages={pages} />
        </div>
      </div>
    );
  };
  
  export default NavBar;