"use client";

import { useSyncExternalStore } from "react";
import { ACCESS_TOKEN_EVENT, getAccessToken } from "@/lib/auth-storage";

function subscribe(onStoreChange: () => void) {
  const handleChange = () => onStoreChange();

  window.addEventListener("storage", handleChange);
  window.addEventListener(ACCESS_TOKEN_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(ACCESS_TOKEN_EVENT, handleChange);
  };
}

function getSnapshot() {
  return getAccessToken();
}

function getServerSnapshot() {
  return null;
}

export function useAccessToken() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
