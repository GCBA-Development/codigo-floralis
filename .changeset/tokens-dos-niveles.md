---
"codigo-floralis": minor
---

Tokens en dos niveles: primitivas `--fl-<escala>-<paso>` (navy, blue, neutral, red, green, amber) y semánticos (`--primary`, `--card`...) que las referencian. Los nombres semánticos y las utilidades de Tailwind no cambian. El tema claro se renderiza exactamente igual que antes. Por decisión de marca se conservan dos pares que no cumplen AA: `--muted-foreground` sobre `--background`/`--muted` (~4.3:1) y `--warning-foreground` blanco sobre `--warning` (~2.6:1); están listados como excepciones en el test de contraste.

`--color-number-highlight` ahora sale de `--number-highlight`. `KpiCard` y `BreakdownTable` dejan de usar blanco/rgba fijos.
