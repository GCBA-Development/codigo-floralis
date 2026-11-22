# 0004. Distribución por git con tags y `prepare`

Estado: aceptada

## Contexto
La librería es privada (no se publica en npm) y la consumen apps internas, en particular Next.js.

## Decisión
Se instala desde git fijando un tag (`github:GCBA-Development/codigo-floralis#v0.x.y`). Los tags los crea Changesets (`npm run release`). `dist/` no se versiona: el script `prepare` ejecuta `vite build` al instalar.

## Consecuencias
- Sin registro privado ni credenciales de publicación; el versionado es explícito por tag.
- Cada `npm install` del consumidor compila la librería: más lento y requiere las devDependencies del DS y memoria suficiente.
- Alternativa si molesta: commitear `dist` en el commit del tag de release.
