import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Sin esto, tailwind-merge no reconoce `text-s1..s7` como tamaños y los pisa contra `text-<color>`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["s1", "s2", "s3", "s4", "s5", "s6", "s7"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
