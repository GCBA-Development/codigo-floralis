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

## Versionado

Usamos [Changesets](https://github.com/changesets/changesets). El paquete es privado (no se publica en npm): solo se versiona y se taggea. Estamos en `0.x`: la API no esta congelada.

1. En tu PR corre `npm run changeset`, elegi el tipo de cambio (patch/minor/major) y describilo. Commitea el archivo generado en `.changeset/`.
2. Al preparar un release: `npm run version-packages` (actualiza `package.json` y `CHANGELOG.md`), commit, y luego `npm run release` (crea el tag `v0.x.y`).
3. Push del commit y de los tags (`git push --follow-tags`).

La app consumidora fija la version por tag:

```json
"codigo-floralis": "github:GCBA-Development/codigo-floralis#v0.1.0"
```

### dist y `prepare`

`dist` esta en `.gitignore`, asi que al instalar desde git el script `prepare` ejecuta `vite build` para generarlo. Tradeoff: cada `npm install` del consumidor compila la libreria (mas lento, requiere las devDependencies del DS y memoria suficiente). Si molesta, la alternativa es commitear `dist` en el tag de release.
