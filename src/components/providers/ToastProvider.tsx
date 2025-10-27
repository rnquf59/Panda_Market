"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#363636",
          color: "#fff",
        },
        success: {
          duration: 2000,
          style: {
            background: "#10B981",
          },
        },
        error: {
          duration: 4000,
          style: {
            background: "#EF4444",
          },
        },
      }}
    />
  );
}
