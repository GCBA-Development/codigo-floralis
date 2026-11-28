# 0007. Distribución por GitHub Packages

Estado: aceptada

## Contexto
Con la distribución por git (ADR 0004) cada install del consumidor compilaba la librería con `prepare`: era lento, requería las devDependencies del DS y bastante memoria, y el `dist` no era inmutable (dependía de la toolchain de cada instalación).

## Decisión
La librería se publica como `@gcba-development/codigo-floralis` en GitHub Packages, y es el único canal. El workflow `publish.yml` compila y publica al pushear un tag `vX.Y.Z` (verifica que coincida con `package.json`). Se elimina el script `prepare`. Guía de consumo: [consumir-desde-github-packages](../consumir-desde-github-packages.md).

## Consecuencias
- El install baja un `dist` ya compilado e inmutable; no compila ni necesita devDependencies.
- Las apps necesitan un token con `read:packages` (local y en CI).
- En GitHub Actions alcanza el `GITHUB_TOKEN` si el paquete da acceso al repo consumidor (Manage Actions access).
- Una versión publicada no se puede pisar: un error se corrige con una versión nueva.
