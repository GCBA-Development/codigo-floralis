# 0002. Hugeicons como set de íconos

Estado: aceptada

## Contexto
Los componentes necesitan íconos consistentes en trazo y tamaño. Un set mixto genera inconsistencias visuales.

## Decisión
Usamos `@hugeicons/react` + `@hugeicons/core-free-icons` en todos los componentes (`<HugeiconsIcon icon={...} strokeWidth={2} />`). Ambos paquetes son peer dependencies. Las props de componentes reciben el ícono como dato (`icon: IconSvgElement`), no como nodo, para controlar tamaño y trazo.

## Consecuencias
- Estilo uniforme; los íconos se importan por nombre (tree-shaking).
- El set gratuito limita las opciones; si falta un ícono se evalúa el set pro o un SVG propio.
- Los íconos son decorativos por defecto: el nombre accesible lo da el texto o un `aria-label`.
