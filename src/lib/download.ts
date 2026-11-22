/** Utilidades genéricas para bajar archivos desde el navegador, reusables por cualquier módulo. */

/** Hace que el navegador baje `blob` con el nombre `filename`. */
export function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
