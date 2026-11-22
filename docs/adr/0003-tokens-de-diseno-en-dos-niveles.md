# 0003. Tokens de diseño en dos niveles

Estado: aceptada

## Contexto
Los hex estaban directamente sobre nombres semánticos (`--primary: #1d3343`). Eso impide un segundo tema (oscuro) sin duplicar valores y mezcla "qué color es" con "para qué se usa".

## Decisión
- **Nivel 1, primitivas** `--fl-<escala>-<paso>` (navy, blue, neutral, red, green, amber; pasos 50 a 950): la paleta cruda, en `:root` de `src/index.css`. Llevan prefijo `fl-` para no pisar `--color-*` del tema por defecto de Tailwind en la app consumidora.
- **Nivel 2, semánticos** (`--primary`, `--card`, `--destructive`...): referencian primitivas con `var()`. `@theme inline` los expone como utilidades (`bg-primary`). `.dark` redefine solo este nivel.
- Los componentes **solo usan semánticos**. Una regla de ESLint (`no-restricted-syntax` en `src/components/**`) falla si aparece `--fl-*`, una clase de la paleta de Tailwind (`bg-gray-500`) o `text-white`/`bg-white`.
- El contraste AA de todos los pares texto/fondo, en ambos temas, se valida en un test que parsea `index.css` (única fuente de verdad) con `src/lib/theme-tokens.ts` y `src/lib/contrast.ts`.

## Consecuencias
- Cambiar de tema o de marca es editar el nivel 2 (o los valores del nivel 1).
- Se agregan tokens nuevos creando el semántico, no usando una primitiva en un componente.
- Si un par no pasa AA, se ajusta el token (ver comentarios en `index.css`), no el test.
