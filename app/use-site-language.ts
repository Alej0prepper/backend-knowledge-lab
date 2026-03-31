"use client";

import { useEffect, useState } from "react";

export type SiteLanguage = "en" | "es";

const STORAGE_KEY = "site-language";

function readStoredLanguage(): SiteLanguage {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "es" ? "es" : "en";
}

export function useSiteLanguage(defaultLanguage: SiteLanguage = "en"): SiteLanguage {
  const [language, setLanguage] = useState<SiteLanguage>(defaultLanguage);

  useEffect(() => {
    setLanguage(readStoredLanguage());

    const onLanguageChange = () => {
      setLanguage(readStoredLanguage());
    };

    window.addEventListener("site-language-change", onLanguageChange as EventListener);
    window.addEventListener("storage", onLanguageChange);

    return () => {
      window.removeEventListener("site-language-change", onLanguageChange as EventListener);
      window.removeEventListener("storage", onLanguageChange);
    };
  }, []);

  return language;
}
