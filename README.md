# codigo-floralis

Design system oficial para las aplicaciones web del **Gobierno de la Ciudad de Buenos Aires**. Aplica el manual de marca GCBA en componentes React listos para usar, para que todas las apps se vean y se comporten igual sin que cada equipo rehaga la UI.

**Stack:** React 19 · Tailwind CSS v4 · Base UI · Hugeicons · TypeScript.

## Qué trae

| Capa | Contenido |
|------|-----------|
| **Tokens** | Colores, tipografía (Archivo), espaciados y tema claro/oscuro del manual de marca. |
| **UI** | Button, Input, Select, Dialog, Sheet, Toast, Tooltip, Badge, Pagination, Stepper, Dropzone y más. |
| **Datos** | Table, KpiCard, StatCard, BreakdownTable. Gráficos en un entry aparte (`/charts`). |
| **Layout** | AppNavbar, AppSidebar y PageHeader: el esqueleto común de toda app de gestión. |

El catálogo completo, con ejemplos y reglas de uso de cada componente, está en **Storybook** (`npm run storybook`).

## Instalación

Se instala desde GitHub fijando un tag de versión:

```json
"codigo-floralis": "github:GCBA-Development/codigo-floralis#v0.9.0"
```

Peer dependencies que tiene que tener la app: `react`, `react-dom`, `@base-ui/react`, `@hugeicons/react`, `@hugeicons/core-free-icons`. Opcionales: `recharts` (solo para `/charts`) y `next-themes` (solo para `/theme`).

## Uso rápido (Next.js)

```css
/* app/globals.css: la app ya usa Tailwind v4 */
@import "tailwindcss";
@import "codigo-floralis/tokens.css";
```

```tsx
// app/layout.tsx
import { Archivo } from "next/font/google";
import { FloralisProvider } from "codigo-floralis/theme";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={archivo.variable} suppressHydrationWarning>
      <body>
        <FloralisProvider>{children}</FloralisProvider>
      </body>
    </html>
  );
}
```

```tsx
// cualquier página
import { Button, PageHeader } from "codigo-floralis";

<PageHeader title="Gestión de usuarios" subtitle="Alta, edición y baja." actions={<Button size="sm">Nuevo</Button>} />
```

- **App sin Tailwind:** en vez de `tokens.css`, importá `codigo-floralis/styles.css` una vez (trae Tailwind compilado).
- **La fuente no viene incluida:** cargá Archivo como arriba, o con el `<link>` de Google Fonts en apps que no son Next.
- **`FloralisProvider` es opcional:** suma tema claro/oscuro (`next-themes`), tooltips y toasts. Sin dark mode alcanza con los estilos.

## Entry points

| Import | Para qué |
|--------|----------|
| `codigo-floralis` | Componentes, hooks y utilidades. |
| `codigo-floralis/theme` | `FloralisProvider`, `ThemeToggle`, `useTheme`. |
| `codigo-floralis/charts` | Gráficos (`recharts`). |
| `codigo-floralis/tokens.css` | Tokens para apps con Tailwind v4 (recomendado). |
| `codigo-floralis/styles.css` | Estilos completos para apps sin Tailwind. |

## Principios

- **Una sola fuente de verdad visual:** si una app necesita un estilo que no existe, se agrega acá, no en la app.
- **API consistente:** todas las props siguen [`docs/conventions.md`](docs/conventions.md) (`variant`, `size`, `error`, controlados).
- **Accesible por defecto:** los componentes se prueban con el addon a11y de Storybook.
- **Decisiones registradas:** cada decisión de arquitectura tiene su ADR en [`docs/adr/`](docs/adr/).

## Contribuir

```bash
npm install
npm run storybook    # desarrollo (puerto 6006)
npm run test:unit    # tests unitarios
npm run lint
npm run build:lib    # genera dist/
```

1. Cada componente vive en `src/components/<capa>/<nombre>/` con su `.tsx`, `.stories.tsx`, `.mdx` e `index.ts`, y se exporta en `src/index.ts`.
2. En el PR corré `npm run changeset` y describí el cambio (patch/minor/major).
3. **Release:** `npm run version-packages`, commit, merge a `main` y tag `vX.Y.Z` sobre ese commit.

Estamos en `0.x`: la API todavía puede cambiar entre versiones minor. Revisá el [`CHANGELOG`](CHANGELOG.md) antes de actualizar.
