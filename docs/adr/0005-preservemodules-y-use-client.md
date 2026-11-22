# 0005. `preserveModules` y `"use client"`

Estado: aceptada

## Contexto
Los consumidores usan React Server Components. Un bundle único pierde las directivas `"use client"` y arrastra todo el código aunque se importe un solo componente.

## Decisión
Vite compila en modo librería con `preserveModules` (un archivo por módulo, `sideEffects` solo para CSS) y `rollup-preserve-directives` conserva `"use client"` en cada archivo. Todo componente con estado, efectos o APIs del browser lleva `"use client"` en su primera línea. Las dependencias opcionales viven en entries separados (`codigo-floralis/charts`, `codigo-floralis/theme`) para que el barrel no las requiera.

## Consecuencias
- Tree-shaking real y componentes de servidor que importan componentes de cliente sin fricción.
- Los estilos se importan una vez (`codigo-floralis/styles.css`); el barrel no tiene efectos de CSS.
- Un archivo nuevo interactivo sin `"use client"` rompe en Next: hay que revisarlo en code review.
