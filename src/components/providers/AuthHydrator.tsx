"use client";

import { useStore } from "@/stores/useStore";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function AuthHydrator() {
  const { user, setUser } = useStore();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token && !user.isLoggedIn) {
      setUser({ isLoggedIn: true });
    }
  }, [user.isLoggedIn, setUser]);

  return null;
}
