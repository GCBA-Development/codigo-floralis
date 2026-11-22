# Convención de props

Todos los componentes de la librería siguen estas reglas. Si un componente necesita salirse, se justifica en un comentario junto a la prop.

## Variantes visuales: `variant`

Vocabulario compartido, en este orden de énfasis:

`primary | secondary | outline | ghost | destructive | success | warning`

- Un componente usa **solo el subconjunto que tiene sentido**, pero con estos nombres (un `Badge` no define `ghost`).
- Nunca `default` como valor: el valor por defecto se llama por lo que es (`primary`, `outline`...).
- Se admiten valores propios solo si describen algo que el vocabulario no cubre. Hoy:
  - `Button`: `tertiary`, `link`.
  - `Badge`: `soft`.
  - `TimePicker`, `CheckboxList`: `modern`, `glass` (pieles del componente).
- Cuando `variant` no es "aspecto" sino un **modo** del componente, el nombre se justifica por su dominio y se documenta:
  - `Text.variant`: rol tipográfico (`pageTitle`, `body`, ...).
  - `Loading.variant`: `fullscreen | section | inline`.
  - `Sidebar.variant`: `sidebar | floating | inset`.

## Tamaño: `size`

`sm | md | lg`, y `icon` (+ `icon-sm`, `icon-lg`) en botones. `xs` solo en `Button` (densidad de tablas). El tamaño por defecto es `md`, nunca `default`.

## Estado inválido: `error`

`error?: string | boolean`. Un `string` es el mensaje (se muestra y se anuncia); `true` marca el control como inválido sin texto. **Nunca** es una variante: el estilo sale de `aria-invalid`.

## Otros estados

- `disabled?: boolean`
- `loading?: boolean` (el componente conserva su tamaño; no salta el layout)
- `required?: boolean`

## Controlados

Estilo Base UI, siempre en par:

| Valor            | Callback                       |
| ---------------- | ------------------------------ |
| `value`          | `onValueChange(value)`         |
| `open`           | `onOpenChange(open)`           |
| `defaultValue` / `defaultOpen` | versión no controlada |

No usar `onChange` para valores (solo para eventos DOM nativos reenviados), ni `isOpen`/`onClose`.

## Idioma

- Nombres de props, tipos y valores: **inglés** (`options`, `label`, `description`, `digits`).
- Español **solo** en textos visibles por defecto (`"Cerrar sesión"`, `"Seleccionar todo"`), y siempre sobreescribibles por una prop (`logoutLabel`, `selectAllLabel`).

## Campos de formulario

Label, descripción y error pasan por `Field` (`ui/field`): `label`, `description`, `error`. `helperText` quedó como alias deprecado de `description`.
