# codigo-floralis

Design system de React 19 + Tailwind v4 + Base UI. Se consume por git desde apps Next.js.

## Uso

```tsx
// Una sola vez, en el layout raiz de la app
import "codigo-floralis/styles.css";

import { Button } from "codigo-floralis";
```

Los estilos ya no se importan desde `codigo-floralis` (el barrel no tiene efectos de CSS): hay que importar `styles.css` explicitamente.

## Desarrollo

- `npm run storybook`: Storybook en el puerto 6006.
- `npm run build:lib`: genera `dist/`.
- `npm run test:unit`: tests unitarios.

## Graficos (opcional)

Los componentes basados en `recharts` viven en un entry aparte para que el barrel principal no arrastre esa dependencia. `recharts` es una peer dependency opcional: instalala solo si usas graficos.

```tsx
import { SimpleBarChart } from "codigo-floralis/charts";
```

## Peer dependencies

`react`, `react-dom`, `@base-ui/react`, `@hugeicons/react` y `@hugeicons/core-free-icons` deben estar instaladas en la app consumidora (`recharts` solo para `codigo-floralis/charts`).
