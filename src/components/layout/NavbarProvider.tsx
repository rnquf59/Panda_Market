"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import ItemNavbar from "./ItemNavbar";

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
