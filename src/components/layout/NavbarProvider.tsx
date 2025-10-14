"use client";

import { usePathname } from "next/navigation";
import Navbar from "../../app/(landing)/components/LandingNavbar";
import ItemNavbar from "./Navbar";

export default function NavbarProvider() {
  const pathname = usePathname();

  if (pathname === "/auth/login" || pathname === "/auth/signup") {
    return null;
  }

  if (pathname === "/") {
    return <Navbar />;
  }

  return <ItemNavbar />;
}
