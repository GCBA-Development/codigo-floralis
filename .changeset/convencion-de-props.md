---
"codigo-floralis": minor
---

Convención de props unificada (ver `docs/conventions.md`). **Cambios que rompen compatibilidad** (la librería es 0.x):

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
