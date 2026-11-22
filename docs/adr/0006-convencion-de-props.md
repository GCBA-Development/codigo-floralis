# 0006. Convención de props

Estado: aceptada

## Contexto
Los componentes tenían nombres inconsistentes (`default` vs `primary`, `opciones` vs `options`, `onChange` vs `onValueChange`, `variant="error"`), lo que obliga a leer la fuente de cada uno.

## Decisión
Se adopta una convención única, documentada en `docs/conventions.md`: `variant` con vocabulario compartido (`primary | secondary | outline | ghost | destructive | success | warning`), `size` (`sm | md | lg`), `error?: string | boolean` (nunca variante), pares controlados `value`/`onValueChange` y `open`/`onOpenChange`, nombres de props en inglés y textos visibles por defecto en español, siempre sobrescribibles.

## Consecuencias
- Cambios que rompen compatibilidad en 0.x (ver changesets); se aceptan para no cargar con alias.
- Un componente nuevo que se aparte de la convención lo justifica en un comentario junto a la prop.
- Los alias deprecados (`helperText`, `TimePickerCustom`) viven un release y se eliminan.
