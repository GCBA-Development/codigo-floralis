---
"@gcba-development/codigo-floralis": minor
---

Agrega `usePolling` (refresco cada 15 s sin pedidos superpuestos, pausado con la pestaña oculta) y `useIsMobile` pasa a `useSyncExternalStore`: sin render inicial en `undefined` y seguro en SSR.
