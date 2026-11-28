# Consumir desde GitHub Packages

Paquete: `@gcba-development/codigo-floralis`. Requiere un token con `read:packages` en la variable `GITHUB_TOKEN` (local: un PAT; en Actions: el `GITHUB_TOKEN`).

## npm (`.npmrc`)
```ini
@gcba-development:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

## yarn Berry (`.yarnrc.yml`)
```yaml
npmScopes:
  gcba-development:
    npmRegistryServer: "https://npm.pkg.github.com"
    npmAuthToken: "${GITHUB_TOKEN}"
```
Usá `"${GITHUB_TOKEN-}"` si querés que `yarn` no falle cuando la variable no está definida (por ejemplo en comandos que no instalan).

## Dependencia con alias
Para mantener los imports `from "codigo-floralis"`:
```json
"codigo-floralis": "npm:@gcba-development/codigo-floralis@^0.9.0"
```

## Acceso desde GitHub Actions
En el repo de la librería: Packages > `codigo-floralis` > Package settings > **Manage Actions access** > agregar el repo consumidor con rol Read. Sin eso el `GITHUB_TOKEN` del consumidor recibe 403/404. El workflow consumidor necesita `permissions: packages: read`.

## Build Docker
Pasá el token como build secret; nunca como `ARG` ni `ENV` (quedan en las capas de la imagen).
```dockerfile
RUN --mount=type=secret,id=github_token \
    GITHUB_TOKEN="$(cat /run/secrets/github_token)" yarn install --immutable
```
```bash
docker build --secret id=github_token,env=GITHUB_TOKEN .
```
Con un multi-stage, el `.npmrc`/`.yarnrc.yml` no debe contener el token en claro (usá la variable de entorno como arriba).
