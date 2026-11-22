"use client"

import { type VariantProps } from "class-variance-authority";
import * as React from "react";
import { imageItemVariants } from "./image-gallery.variants";
import { ImageThumbnail } from "./image-thumbnail";
import { ImagePreview } from "./image-item";

interface ListImagesProps extends VariantProps<typeof imageItemVariants> {
  value: string[];
  editable?: boolean;
  onValueChange: (value: string[]) => void;
}

export function ImageGallery({ value, editable, onValueChange }: ListImagesProps) {
  const [selectedIdx, setSelectedIdx] = React.useState<number | null>(null);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const handleDelete = (index: number) => {
    onValueChange(value.filter((_, imageIndex) => imageIndex !== index));
    setSelectedIdx(null);
  };

 return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {value.map((src, index) => (
        <ImageThumbnail
          key={`${src}-${index}`}
          src={src}
          onClick={() => setSelectedImage(src)}
          onDelete={editable ? () => handleDelete(index) : undefined}
        />
      ))}

    <ImagePreview
      src={selectedImage}
      open={!!selectedImage}
      onOpenChange={() => setSelectedImage(null)}
      onDelete={editable && selectedIdx !== null 
        ? () => handleDelete(selectedIdx) 
        : undefined
      }
    />
    </div>
  );
}