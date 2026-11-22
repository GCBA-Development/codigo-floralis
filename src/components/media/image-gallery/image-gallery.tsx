"use client"

import * as React from "react"
import { ImageThumbnail } from "./image-thumbnail"
import { ImagePreview } from "./image-item"

export interface ImageGalleryProps {
  value: string[]
  editable?: boolean
  onValueChange: (value: string[]) => void
}

export function ImageGallery({ value, editable, onValueChange }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null)
  const selectedImage = selectedIndex === null ? null : (value[selectedIndex] ?? null)

  const handleDelete = (index: number) => {
    onValueChange(value.filter((_, imageIndex) => imageIndex !== index))
    setSelectedIndex(null)
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {value.map((src, index) => (
        <ImageThumbnail
          key={`${src}-${index}`}
          src={src}
          onClick={() => setSelectedIndex(index)}
          onDelete={editable ? () => handleDelete(index) : undefined}
        />
      ))}

      <ImagePreview
        src={selectedImage}
        open={selectedImage !== null}
        onOpenChange={() => setSelectedIndex(null)}
        onDelete={editable && selectedIndex !== null ? () => handleDelete(selectedIndex) : undefined}
      />
    </div>
  )
}
