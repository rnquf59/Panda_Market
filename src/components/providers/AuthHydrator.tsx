"use client";

import { useStore } from "@/stores/useStore";
import { useEffect } from "react";
import Cookies from "js-cookie";

function decodeJWT(token: string): {
  id?: number;
  nickname?: string;
  name?: string;
  email?: string;
  scope?: string;
  lat?: number;
  exp?: number;
  iss?: string;
} | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("JWT 디코딩 실패:", error);
    return null;
  }
}

export default function AuthHydrator() {
  const { user, setUser } = useStore();

  useEffect(() => {
    const token = Cookies.get("accessToken");

    if (token && !user.isLoggedIn) {
      const decoded = decodeJWT(token);

      if (decoded && decoded.id) {
        setUser({
          id: decoded.id.toString(),
          name: decoded.nickname || decoded.name || null,
          email: decoded.email || null,
          isLoggedIn: true,
        });
      } else {
        setUser({ isLoggedIn: true });
      }
    }
  }, [user.isLoggedIn, setUser]);

  return null;
}
