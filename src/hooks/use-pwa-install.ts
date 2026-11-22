"use client";

import { useCallback, useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari expone esto en vez de disparar `beforeinstallprompt`.
    (window.navigator as { standalone?: boolean }).standalone === true
  );
}

/**
 * `beforeinstallprompt` sólo lo dispara Chromium (Chrome/Edge/Android) y una
 * única vez por carga de página, antes de que exista UI para reaccionar a él.
 * Hay que capturarlo apenas se monta la app y guardarlo hasta que el usuario
 * clickee "Instalar".
 */
export function usePwaInstall() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(isStandalone);

  useEffect(() => {
    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    }

    function handleAppInstalled() {
      setInstallEvent(null);
      setIsInstalled(true);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!installEvent) return;

    await installEvent.prompt();
    const { outcome } = await installEvent.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setInstallEvent(null);
  }, [installEvent]);

  return {
    canInstall: !!installEvent && !isInstalled,
    promptInstall,
  };
}
