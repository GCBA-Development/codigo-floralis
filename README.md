# codigo-floralis

Design system de React 19 + Tailwind v4 + Base UI. Se consume por git desde apps Next.js.

## Uso

```tsx
// Una sola vez, en el layout raiz de la app
import "codigo-floralis/styles.css";

import { Button } from "codigo-floralis";
```

Los estilos ya no se importan desde `codigo-floralis` (el barrel no tiene efectos de CSS): hay que importar `styles.css` explicitamente.

## Tipografia (Archivo)

`styles.css` **no carga la fuente**: usa `var(--font-archivo)` y cae a `"Archivo"` del sistema. Asi la app decide como cargarla y no hay un request externo extra.

Next.js:

```tsx
// app/layout.tsx
import { Archivo } from "next/font/google";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={archivo.variable} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
```

Otras apps: agrega el link de Google Fonts en el `<head>`.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

Storybook de la libreria la carga desde `.storybook/preview-head.html`.

## Tema claro/oscuro (opcional)

`FloralisProvider` y `ThemeToggle` viven en el entry `codigo-floralis/theme` y requieren `next-themes` (peer dependency opcional). Setup en Next.js (App Router):

```bash
npm i next-themes
```

```css
/* app/globals.css: Tailwind tiene que escanear las clases de la libreria */
@import "tailwindcss";
@source "../node_modules/codigo-floralis/dist";
```

```tsx
// app/layout.tsx
import "./globals.css";
import "codigo-floralis/styles.css";
import { FloralisProvider } from "codigo-floralis/theme";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: next-themes agrega la clase `dark` antes de hidratar
    <html lang="es" suppressHydrationWarning>
      <body>
        <FloralisProvider>{children}</FloralisProvider>
      </body>
    </html>
  );
}
```

`FloralisProvider` incluye `TooltipProvider` y `<Toaster />`. Props: `theme` (sobrescribe next-themes), `toaster` (`false` si montas el tuyo), `tooltipDelay`. Para cambiar de tema usa `<ThemeToggle />` o `useTheme()` (reexportado). Sin dark mode no hace falta nada de esto: alcanza con `styles.css`.

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

`react`, `react-dom`, `@base-ui/react`, `@hugeicons/react` y `@hugeicons/core-free-icons` deben estar instaladas en la app consumidora (`recharts` solo para `codigo-floralis/charts`, `next-themes` solo para `codigo-floralis/theme`).

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
