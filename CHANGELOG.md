# codigo-floralis

## 0.10.0

### Minor Changes

- 5329fe7: - `PageHeader`: slots `start` (a la izquierda del título, ej. botón volver) y `end` (acciones a la derecha, bajan en mobile). `actions` queda deprecado como alias de `end`.
  - Nuevo `AppShell`: layout en "T" (navbar + sidebar + contenido) que reemplaza el armado con `SidebarProvider`/`SidebarInset` de cada app.
  - Nuevo `AppSidebarNav`: renderiza grupos de navegación (items, sub-items, badges, `match`) a partir de datos dentro de `AppSidebar`.
  - `PageHeader`: `size` pasa a `"md" | "lg"` (default `"md"`) según las convenciones; `"compact"`/`"large"` quedan como alias deprecados.

### Distribución

- La librería se consume solo desde GitHub Packages (`npm:@gcba-development/codigo-floralis`). Se quitó `prepare`: instalar desde `github:` ya no compila `dist`. Ver `docs/consumir-desde-github-packages.md` y ADR 0007.
- El paquete publicado incluye `CHANGELOG.md`.

## 0.9.0

### Minor Changes

- eea3c6b: PageHeader: nueva prop `size`. El default pasa a `compact` (título text-s4 primario, subtítulo chico, acciones arriba a la derecha), igual al header de las pantallas de gestión. El header grande anterior queda como `size="large"`. `title` y `subtitle` aceptan cualquier ReactNode.

## 0.8.0

### Minor Changes

- BreakdownTable: nueva prop opcional `total`. Cuando `items` es sólo un top N, la participación se calcula sobre el total real y no sobre la suma de las filas visibles. Sin `total`, se comporta igual que antes.

## 0.7.2

### Patch Changes

- Restaura el script `prepare` para que la librería se compile al instalarla desde GitHub (`github:...#vX.Y.Z`) sin token.

## 0.7.1

### Patch Changes

- b458b17: PageHeader: las `actions` quedan arriba a la derecha alineadas con el título (`items-start`) y admiten varios botones con wrap.

## 0.7.0

### Minor Changes

- Aplica el manual de marca GCBA 2026. Son cambios visibles para las apps consumidoras:
  - Fondo del tema claro: `--background` pasa de `#f1f1f3` a `#fcfcfc` (nuevo `--fl-neutral-25`); las tarjetas y popovers siguen en blanco. El tema oscuro no cambia.
  - Radios: nueva escala `--radius-sm` .25rem, `--radius-md` .5rem (antes .375rem de Tailwind), `--radius-lg` 1rem, `--radius-xl` 1.5rem. `Card` pasa de 20px a `rounded-xl`; `Dialog`, `AlertDialog`, `Popover` y `Select` usan `rounded-lg`; `Sheet` curva solo las esquinas expuestas.
  - Pesos: botones y títulos de `Dialog`, `AlertDialog` y `Sheet` pasan a `font-bold` (Archivo Bold).
  - Nuevo amarillo de marca `--fl-yellow-500` (`#ffcd02`) y tokens `--highlight` / `--highlight-foreground` (`bg-highlight text-highlight-foreground`). Solo con texto azul oscuro, nunca como color de texto.
  - Nuevo `Button variant="cta"`: píldora amarilla con texto azul oscuro.
  - Nuevo componente `IconPlate`: ícono blanco sobre placa azul o azul oscuro de vértices curvos.

## 0.6.0

### Minor Changes

- bb1a8c5: Agrega `usePolling` (refresco cada 15 s sin pedidos superpuestos, pausado con la pestaña oculta) y `useIsMobile` pasa a `useSyncExternalStore`: sin render inicial en `undefined` y seguro en SSR.

## 0.5.0

### Minor Changes

- 32116b4: Agrega y exporta `TableFooter` (`<tfoot>`) para filas de totales.

## 0.4.0

### Minor Changes

- Publica en GitHub Packages como `@gcba-development/codigo-floralis` y agrega `tokens.css` para apps que ya usan Tailwind v4 (evita duplicar preflight y utilidades).

## 0.3.2

### Patch Changes

- 6b4a68d: `KpiCard` en `loading` con `variant="primary"` ya no muestra la cifra en blanco sobre la máscara (el color del texto pisaba `text-transparent`). `BreakdownTable` en `loading` sin datos reserva `limit` filas de skeleton con el alto de una fila real, así la tabla no crece al llegar los datos.

## 0.3.1

### Patch Changes

- eb76577: `Field` ya no fuerza `w-full`: los campos con `label` (Select, Input, Textarea) respetan el ancho de su `className` y se acomodan en fila dentro de un contenedor `flex`. En un contenedor de bloque o `flex-col` siguen ocupando todo el ancho.

## 0.3.0

### Minor Changes

- d7d3bbd: `AppSidebarItem` acepta `AppSidebarSubItem` como hijos (submenú colapsable con `open` / `onOpenChange` / `defaultOpen`, expandido automático según `activeHref`). Con `collapsible="icon"` los sub-items se muestran en un popover. `AppSidebarProps` expone `collapsible` y `AppSidebarItem.href` pasa a ser opcional cuando tiene sub-items.
- af54cd9: `ThemeToggle` respeta `enableSystem: false` (solo cicla los temas disponibles según `themes` de next-themes) y suma `mode?: "cycle" | "toggle"`. El nombre accesible ahora anuncia el próximo tema: "Cambiar tema (siguiente: oscuro)" en lugar de "(actual: ...)".

### Patch Changes

- 008cca0: `styles.css` ya no hace `@import` de Google Fonts: la app carga Archivo (ej. `next/font/google` con `variable: "--font-archivo"`) y `--font-archivo` del consumidor tiene prioridad. Ver README, sección Tipografía.

## 0.2.0

### Minor Changes

- dca9de8: Convención de props unificada (ver `docs/conventions.md`). **Cambios que rompen compatibilidad** (la librería es 0.x):

  - `Badge`: `variant="default"` pasa a `variant="primary"` (nuevo valor por defecto).
  - `Button`: `size="default"` pasa a `size="md"`. Si pasabas `size="default"` explícito, cambialo.
  - `SidebarMenuButton`: `variant="default"` pasa a `"ghost"` y `size="default"` a `"md"`.
  - `KpiCard`: `variant="highlight"` pasa a `"primary"` y `variant="default"` a `"secondary"`.
  - `CheckboxList`: props en inglés y controladas.
    - `opciones` -> `options`, con `{ codigo, nombre }` -> `{ value, label }` (el tipo `Opcion` pasa a `CheckboxListOption`).
    - `elegidos` -> `value`, `onChange` -> `onValueChange`, `titulo` -> `label`.
    - `variant="error"` se elimina: usá la prop `error` (`string | boolean`). `variant="default"` pasa a `"primary"`.
    - Con React Hook Form: `onValueChange={field.onChange}` y `value={field.value}`.
  - `TimePickerCustom`: `variant="error"` se elimina (usá `error`, ahora `string | boolean`; con string se muestra como mensaje). `variant="default"` pasa a `"outline"`.
  - `ImageGallery`: `imagenes` -> `value`, `handleChange(ruta, imagenes)` -> `onValueChange(imagenes)` (se elimina `ruta`; resolvelo en el closure). `variant="default"` pasa a `"outline"`.
  - `ImagePreview`: `isOpen` -> `open`, `onClose` -> `onOpenChange(open)`.
  - `Input` `restrict`: `"numeros"` -> `"digits"`, `"telefono"` -> `"phone"`.
  - `Dropzone`: `error` ahora acepta `string | boolean` (compatible hacia atrás).

- ba4ad22: - `ImageGallery`: el botón "Eliminar" de la vista previa ahora funciona (no se seteaba el índice seleccionado). Se eliminan las props `variant`/`size`, que no tenían efecto.
  - `TimePickerCustom` se renombra a `TimePicker`. `TimePickerCustom` queda como alias deprecado por un release.
  - Textos por defecto en español y sobrescribibles: `DialogContent`/`SheetContent` (`closeLabel`, antes "Close"), `SidebarTrigger`/`SidebarRail` (`label`, antes "Toggle Sidebar"), `Sidebar` (`mobileTitle`, `mobileDescription`). `alt` de `ImageGallery` en español.
- 7ea16b7: Nuevo `Field` (`Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FormField`) sobre `@base-ui/react/field`. Label, descripción y error quedan asociados al control (ids, `aria-labelledby`, `aria-describedby`, `aria-invalid`) en un solo lugar.

  `Input`, `Textarea`, `SelectTrigger`/`MultiSelect`, `TimePickerCustom` y `CheckboxList` lo usan internamente:

  - `helperText` se renombra a `description`. `helperText` sigue funcionando en `Input` y `TimePickerCustom` como alias deprecado y se elimina en la próxima versión.
  - `Textarea` y `SelectTrigger` ganan `label`, `description` y `error` (`string | boolean`) con el mismo comportamiento que `Input`.
  - `CheckboxList` ahora renderiza un `<fieldset>` (la prop `label` es su leyenda), acepta `description` y cada checkbox tiene nombre accesible. Si tenías estilos sobre el `div` raíz, revisalos.
  - Ya no se generan ids propios (`${id}-message`, `${id}-error`): si dependías de ellos, usá el `id` que expone Base UI.

- fa7dd22: Nuevo entry `codigo-floralis/theme` con `FloralisProvider` (next-themes + `TooltipProvider` + `Toaster`), `useTheme` y `ThemeToggle`. `next-themes` es peer dependency opcional; va en un entry aparte (como `/charts`) para que el barrel principal no lo requiera.
- c4a2bb4: Modo oscuro: la clase `.dark` en `<html>` redefine los tokens semánticos (todos los pares texto/fondo cumplen AA en ambos temas, validado por test). Se agrega `@custom-variant dark` para Tailwind v4. Storybook suma un selector de tema claro/oscuro.
- b0d7698: Tokens en dos niveles: primitivas `--fl-<escala>-<paso>` (navy, blue, neutral, red, green, amber) y semánticos (`--primary`, `--card`...) que las referencian. Los nombres semánticos y las utilidades de Tailwind no cambian. El tema claro se renderiza exactamente igual que antes. Por decisión de marca se conservan dos pares que no cumplen AA: `--muted-foreground` sobre `--background`/`--muted` (~4.3:1) y `--warning-foreground` blanco sobre `--warning` (~2.6:1); están listados como excepciones en el test de contraste.

  `--color-number-highlight` ahora sale de `--number-highlight`. `KpiCard` y `BreakdownTable` dejan de usar blanco/rgba fijos.

### Patch Changes

- `AppNavbar` ocupa todo el ancho disponible y no desborda en mobile: el título se trunca y el subtítulo se oculta debajo de `sm`.
- 515e033: Documentación de uso (MDX en español) para cada componente en Storybook Docs y ADRs en `docs/adr`. Las historias que ahora tienen MDX dejan de usar `tags: ["autodocs"]`.

## 0.1.0

### Minor Changes

- Primera version versionada del design system (pre-1.0, la API puede cambiar).
- Componentes `ui`, `data`, `layout` y `media` sobre Base UI + Tailwind v4, un modulo ESM por componente.
- Directiva `"use client"` preservada en los modulos interactivos.
- Estilos en un unico entry: `import "codigo-floralis/styles.css"`.
- Graficos con `recharts` en el entry opcional `codigo-floralis/charts`.
- `@base-ui/react`, `@hugeicons/*` y `recharts` pasan a peerDependencies.
