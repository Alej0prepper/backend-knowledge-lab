"use client";

import { useSyncExternalStore } from "react";

export type SiteLanguage = "en" | "es";

const STORAGE_KEY = "site-language";

function readStoredLanguage(): SiteLanguage {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "es" ? "es" : "en";
}

function subscribeToLanguageChange(callback: () => void) {
  window.addEventListener("site-language-change", callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("site-language-change", callback);
    window.removeEventListener("storage", callback);
  };
}

export function useSiteLanguage(defaultLanguage: SiteLanguage = "en"): SiteLanguage {
  return useSyncExternalStore(subscribeToLanguageChange, readStoredLanguage, () => defaultLanguage);
}
