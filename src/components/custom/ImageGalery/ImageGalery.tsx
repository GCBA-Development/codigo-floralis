import { type VariantProps } from "class-variance-authority";
import * as React from "react";
import { imageItemVariants } from "./ImageGalery.variants";
import { ImageThumbnail } from "./ImageThumbnail";
import { ImagePreview } from "./ImageItem";

interface ListImagesProps extends VariantProps<typeof imageItemVariants> {
  imagenes: string[];
  editable?: boolean;
  handleChange: (ruta: string, imagenes: string[]) => void;
  ruta: string;
}

export default function ImageGalery({ 
  imagenes, 
  editable, 
  handleChange, 
  ruta
}: ListImagesProps) {
  const [selectedIdx, setSelectedIdx] = React.useState<number | null>(null);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const handleDelete = (index: number) => {
    const newImages = [...imagenes];
    newImages.splice(index, 1);
    handleChange(ruta, newImages);
    setSelectedIdx(null);
  };

 return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {imagenes.map((src, index) => (
        <ImageThumbnail
          key={`${src}-${index}`}
          src={src}
          onClick={() => setSelectedImage(src)}
          onDelete={editable ? () => handleDelete(index) : undefined}
        />
      ))}

    <ImagePreview
      src={selectedImage}
      isOpen={!!selectedImage}
      onClose={() => setSelectedImage(null)}
      onDelete={editable && selectedIdx !== null 
        ? () => handleDelete(selectedIdx) 
        : undefined
      }
    />
    </div>
  );
}