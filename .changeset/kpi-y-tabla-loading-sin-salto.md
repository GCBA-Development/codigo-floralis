---
"codigo-floralis": patch
---

`KpiCard` en `loading` con `variant="primary"` ya no muestra la cifra en blanco sobre la máscara (el color del texto pisaba `text-transparent`). `BreakdownTable` en `loading` sin datos reserva `limit` filas de skeleton con el alto de una fila real, así la tabla no crece al llegar los datos.
