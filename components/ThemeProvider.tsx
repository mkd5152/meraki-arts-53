"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { BrandContent } from "@/lib/getData";

type ThemeMode = "light" | "dark" | "system";

type ThemeContextValue = {
  mode: ThemeMode;
  resolvedMode: "light" | "dark";
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const storageKey = "meraki-theme";

function getSystemMode(): "light" | "dark" {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(mode: ThemeMode) {
  const resolved = mode === "system" ? getSystemMode() : mode;
  document.documentElement.classList.toggle("dark", resolved === "dark");
  document.documentElement.dataset.theme = mode;
  return resolved;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("light");
  const [resolvedMode, setResolvedMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey) as ThemeMode | null;
    const initialMode =
      stored === "light" || stored === "dark" || stored === "system"
        ? stored
        : "light";

    setModeState(initialMode);
    setResolvedMode(applyTheme(initialMode));
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystem = () => {
      if (mode === "system") {
        setResolvedMode(applyTheme("system"));
      }
    };

    media.addEventListener("change", syncSystem);
    return () => media.removeEventListener("change", syncSystem);
  }, [mode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      resolvedMode,
      setMode: (nextMode) => {
        window.localStorage.setItem(storageKey, nextMode);
        setModeState(nextMode);
        setResolvedMode(applyTheme(nextMode));
      }
    }),
    [mode, resolvedMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

export function ThemeToggle({ theme }: { theme: BrandContent["theme"] }) {
  const { mode, setMode } = useTheme();
  const options: Array<{ value: ThemeMode; label: string }> = [
    { value: "light", label: theme.lightLabel },
    { value: "dark", label: theme.darkLabel },
    { value: "system", label: theme.systemLabel }
  ];

  return (
    <div
      aria-label={theme.label}
      className="grid grid-cols-3 rounded-full border border-line bg-panel/76 p-1 shadow-sm backdrop-blur-xl"
      role="group"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setMode(option.value)}
          className={`flex h-9 min-w-9 items-center justify-center rounded-full text-xs font-semibold transition ${
            mode === option.value
              ? "bg-ink text-paper shadow-sm"
              : "text-muted hover:bg-soft hover:text-ink"
          }`}
          aria-label={option.label}
          title={option.label}
        >
          {option.label.slice(0, 1)}
        </button>
      ))}
    </div>
  );
}
