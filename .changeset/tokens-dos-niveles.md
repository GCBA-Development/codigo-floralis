---
"codigo-floralis": minor
---

Tokens en dos niveles: primitivas `--fl-<escala>-<paso>` (navy, blue, neutral, red, green, amber) y semánticos (`--primary`, `--card`...) que las referencian. Los nombres semánticos y las utilidades de Tailwind no cambian. El tema claro se renderiza igual que antes con dos excepciones por accesibilidad (AA):

- `--warning-foreground` pasa de blanco a navy (el blanco sobre el naranja daba 2.6:1).
- `--muted-foreground` pasa de `#6b7280` a `#5f6673` (daba 4.29:1 sobre `--background`).

`--color-number-highlight` ahora sale de `--number-highlight`. `KpiCard` y `BreakdownTable` dejan de usar blanco/rgba fijos.
