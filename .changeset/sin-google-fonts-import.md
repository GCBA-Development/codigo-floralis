---
"codigo-floralis": patch
---

`styles.css` ya no hace `@import` de Google Fonts: la app carga Archivo (ej. `next/font/google` con `variable: "--font-archivo"`) y `--font-archivo` del consumidor tiene prioridad. Ver README, sección Tipografía.
