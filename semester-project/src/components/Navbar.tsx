"use client";

import Logo from "@/components/Logo";
import MainNav from "@/components/MainNav";

export type Page = {
    href: string;
    title: string;
  };

// Get this info from some external source (e.g. CMS)
const pages: Page[] = [
    { href: "/", title: "Home" },
    { href: "/car_repair_topics", title: "Car Repair Topics" },
    { href: "/resources", title: "Resources" },
    { href: "/find_our_shops", title: "Find Us" },
    { href: "/about_us", title: "About Us" },
    { href: "/user_profile", title: "Sign In" },
   // { href: "/disclaimers", title: "Disclaimers" },
   //{ href: "/contact_us", title: "Contact Us" },
  ];

  const NavBar = () => {
    //const [open, setOpen] = useState(false);
  
    return (
      <div className="container flex items-center justify-between">
        <Logo />
        <MainNav pages={pages} />
      </div>
    );
  };
  
  export default NavBar;