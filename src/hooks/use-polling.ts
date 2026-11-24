"use client"

import { useEffect, useRef } from "react";

const POLL_INTERVAL_MS = 15_000;

/**
 * Repite `request` cada 15 s mientras `enabled`, sin pedidos superpuestos ni setState tras desmontar.
 * Pestaña oculta o pedido anterior sin terminar: sólo se reprograma. Un error transitorio se ignora (el próximo ciclo reintenta).
 * `resetKey` reinicia el ciclo (cambio de filtros).
 */
export function usePolling<T>({ enabled, resetKey, request, onData }: { enabled: boolean; resetKey: string; request: () => Promise<T>; onData: (data: T) => void }) {
  const latest = useRef({ request, onData });
  useEffect(() => {
    latest.current = { request, onData };
  });

  useEffect(() => {
    if (!enabled) return;
    let active = true;
    let inFlight = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (document.hidden || inFlight) {
        timer = setTimeout(tick, POLL_INTERVAL_MS);
        return;
      }
      inFlight = true;
      latest.current
        .request()
        .then((data) => active && latest.current.onData(data))
        .catch(() => undefined)
        .finally(() => {
          inFlight = false;
          if (active) timer = setTimeout(tick, POLL_INTERVAL_MS);
        });
    };
    timer = setTimeout(tick, POLL_INTERVAL_MS);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [enabled, resetKey]);
}
