---
"codigo-floralis": minor
---

Nuevo `Field` (`Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FormField`) sobre `@base-ui/react/field`. Label, descripción y error quedan asociados al control (ids, `aria-labelledby`, `aria-describedby`, `aria-invalid`) en un solo lugar.

`Input`, `Textarea`, `SelectTrigger`/`MultiSelect`, `TimePickerCustom` y `CheckboxList` lo usan internamente:

- `helperText` se renombra a `description`. `helperText` sigue funcionando en `Input` y `TimePickerCustom` como alias deprecado y se elimina en la próxima versión.
- `Textarea` y `SelectTrigger` ganan `label`, `description` y `error` (`string | boolean`) con el mismo comportamiento que `Input`.
- `CheckboxList` ahora renderiza un `<fieldset>` (la prop `label` es su leyenda), acepta `description` y cada checkbox tiene nombre accesible. Si tenías estilos sobre el `div` raíz, revisalos.
- Ya no se generan ids propios (`${id}-message`, `${id}-error`): si dependías de ellos, usá el `id` que expone Base UI.
