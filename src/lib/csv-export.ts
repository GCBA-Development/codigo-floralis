/** Utilidades genéricas para exportar datos a CSV desde el cliente, reusables por cualquier módulo. */

import { triggerDownload } from "@/lib/download";

function csvEscape(value: unknown): string {
  const str = value === null || value === undefined ? "" : String(value);
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

export function toCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((header) => csvEscape(row[header])).join(","));
  }
  return lines.join("\n");
}

/** El BOM al inicio hace que Excel abra el CSV como UTF-8 (si no, rompe tildes/ñ). */
export function downloadCsv(filename: string, rows: Record<string, unknown>[]) {
  triggerDownload(new Blob(["﻿" + toCsv(rows)], { type: "text/csv;charset=utf-8;" }), filename);
}
