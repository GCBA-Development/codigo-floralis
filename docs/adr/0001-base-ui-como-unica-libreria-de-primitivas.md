# 0001. Base UI como única librería de primitivas

Estado: aceptada

## Contexto
Necesitamos primitivas accesibles (dialogs, select, popover, tooltip, tabs...) sin construir el manejo de foco, teclado y ARIA desde cero. Mezclar varias librerías (Radix, Headless UI, Base UI) duplica bundle, genera comportamientos distintos y complica el mantenimiento.

## Decisión
Usamos `@base-ui/react` como **única** librería de primitivas. Los componentes de `codigo-floralis` son wrappers finos que aplican estilos con tokens y la convención de props (`docs/conventions.md`). Es peer dependency: la app consumidora la instala.

## Consecuencias
- Un solo modelo de composición (`render`, `data-*` de estado) y de props (`value`/`onValueChange`).
- Si falta una primitiva, se evalúa primero si Base UI la tiene; no se agrega otra librería sin un ADR nuevo.
- Subir de major de Base UI es un cambio coordinado de toda la librería.
