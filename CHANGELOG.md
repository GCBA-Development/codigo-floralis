# codigo-floralis

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
