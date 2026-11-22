import { useEffect, useState } from "react"

type UseGeoJsonResult<T> = {
  data: T | null
  isLoading: boolean
  error: Error | null
}

// Un cache por URL: cada archivo se baja una sola vez por sesión de página.
const cache = new Map<string, unknown>()

/**
 * Carga un archivo GeoJSON estático de `public/geo`.
 *
 * Valida el content-type porque el proxy de auth puede contestar 200 con el HTML
 * de /login: sin este chequeo, ese HTML se parsearía como si fuera el GeoJSON.
 */
export function useGeoJson<T>(url: string): UseGeoJsonResult<T> {
  const [data, setData] = useState<T | null>((cache.get(url) as T | undefined) ?? null)
  const [isLoading, setIsLoading] = useState(!cache.has(url))
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (cache.has(url)) return

    const controller = new AbortController()

    const load = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const res = await fetch(url, { signal: controller.signal, cache: "force-cache" })

        if (!res.ok) throw new Error(`No se pudo cargar ${url} (${res.status})`)

        const contentType = res.headers.get("content-type")
        if (!contentType?.includes("json")) {
          throw new Error(`Se esperaba JSON pero el servidor devolvió ${contentType ?? "un tipo desconocido"}`)
        }

        const geojson = (await res.json()) as T
        cache.set(url, geojson)
        setData(geojson)
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return
        setError(err instanceof Error ? err : new Error("Error desconocido al cargar el GeoJSON"))
      } finally {
        setIsLoading(false)
      }
    }

    load()

    return () => controller.abort()
  }, [url])

  return { data, isLoading, error }
}
