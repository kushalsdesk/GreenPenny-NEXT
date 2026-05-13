"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/src/stores/authStore";

export default function AuthSessionSync() {
  const checkSession = useAuthStore((state) => state.checkSession);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return null;
}
