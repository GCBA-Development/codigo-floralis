---
"@gcba-development/codigo-floralis": minor
---

- `PageHeader`: slots `start` (a la izquierda del título, ej. botón volver) y `end` (acciones a la derecha, bajan en mobile). `actions` queda deprecado como alias de `end`.
- Nuevo `AppShell`: layout en "T" (navbar + sidebar + contenido) que reemplaza el armado con `SidebarProvider`/`SidebarInset` de cada app.
- Nuevo `AppSidebarNav`: renderiza grupos de navegación (items, sub-items, badges, `match`) a partir de datos dentro de `AppSidebar`.
- `PageHeader`: `size` pasa a `"md" | "lg"` (default `"md"`) según las convenciones; `"compact"`/`"large"` quedan como alias deprecados.
