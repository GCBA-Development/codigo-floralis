---
"codigo-floralis": patch
---

`Field` ya no fuerza `w-full`: los campos con `label` (Select, Input, Textarea) respetan el ancho de su `className` y se acomodan en fila dentro de un contenedor `flex`. En un contenedor de bloque o `flex-col` siguen ocupando todo el ancho.
