import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function useAuthToken() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      localStorage.setItem("accessToken", session.accessToken);
      if (session.refreshToken) {
        localStorage.setItem("refreshToken", session.refreshToken);
      }
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  }, [session?.accessToken, session?.refreshToken]);

  return {
    accessToken: session?.accessToken,
    refreshToken: session?.refreshToken,
  };
}
