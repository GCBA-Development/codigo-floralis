import * as React from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import { CloudUpload, X, Loader2, AlertCircle } from "lucide-react";
import { dropzoneVariants } from "./DropZone.variants";
import type { VariantProps } from "class-variance-authority";
import { cn } from "../../../../lib/utils";

interface DropzoneProps extends VariantProps<typeof dropzoneVariants> {
  value: string[];
  onChange: (value: string[]) => void;
  // Esta es la clave: el componente no sabe quién sube el archivo
  onUpload: (file: FormData, filename: string) => Promise<{ ruta: string }>;
  error?: string;
  label?: string;
  maxFiles?: number;
  maxSize?: number;
  className?: string;
}

export const Dropzone = React.forwardRef<HTMLDivElement, DropzoneProps>(
  ({ value = [], onChange, onUpload, error, label, maxFiles = 1, maxSize = 5000000, variant, size, className }, ref) => {
    const [isUploading, setIsUploading] = React.useState(false);
    const [localError, setLocalError] = React.useState<string | null>(null);

    const handleUpload = async (files: File[]) => {
      setLocalError(null);
      setIsUploading(true);
      const newPaths = [...value];

      try {
        for (const file of files) {
          const timestamp = Date.now().toString();
          
          // Compresión Alta
          const highRes = await imageCompression(file, { maxSizeMB: 0.8, maxWidthOrHeight: 1920 });
          const bodyHigh = new FormData();
          bodyHigh.append("file", highRes);
          const res = await onUpload(bodyHigh, timestamp);

          // Compresión Baja (sin esperar respuesta para no bloquear, o puedes esperarla si la necesitas)
          const lowRes = await imageCompression(file, { maxSizeMB: 0.05, maxWidthOrHeight: 300 });
          const bodyLow = new FormData();
          bodyLow.append("file", lowRes);
          await onUpload(bodyLow, `${timestamp}_baja`);

          if (res?.ruta) newPaths.push(res.ruta);
        }
        onChange(newPaths);
      } catch (err) {
        setLocalError("Error al cargar la imagen. Intente nuevamente.");
      } finally {
        setIsUploading(false);
      }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDropAccepted: handleUpload,
      onDropRejected: (rejections) => setLocalError(rejections[0].errors[0].message),
      maxFiles: maxFiles - value.length,
      maxSize,
      accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
      disabled: isUploading || value.length >= maxFiles,
    });

    const displayError = localError || error;

    return (
      <div ref={ref} className={cn("w-full space-y-3", className)}>
        {label && (
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
            {label}
          </label>
        )}

        <div
          {...getRootProps()}
          className={cn(
            dropzoneVariants({ 
              variant: displayError ? "default" : isDragActive ? "modern" : variant, 
              size 
            }),
            displayError && "border-red-400 bg-red-50/30"
          )}
        >
          <input {...getInputProps()} />
          
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-slate-900" />
              <span className="text-[10px] font-bold uppercase tracking-tight">Subiendo...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-xl bg-white shadow-sm border border-slate-100">
                <CloudUpload className="h-5 w-5 text-slate-600" />
              </div>
              <div className="text-center px-4">
                <p className="text-sm font-bold text-slate-900 tracking-tight">Subir imágenes</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">
                   {value.length} / {maxFiles} CARGADAS
                </p>
              </div>
            </div>
          )}
        </div>

        {displayError && (
          <div className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg animate-in fade-in slide-in-from-top-1">
            <AlertCircle size={14} />
            <span className="text-[10px] font-black uppercase tracking-tight">{displayError}</span>
          </div>
        )}

        {/* Previews */}
        {value.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-1">
            {value.map((path, i) => (
              <div key={i} className="group relative h-20 w-20 rounded-xl border bg-slate-50 overflow-hidden shadow-sm">
                <img src={path} className="h-full w-full object-cover" alt="" />
                <button
                  type="button"
                  onClick={() => onChange(value.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 p-1 bg-white/90 backdrop-blur-sm rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:text-red-500"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Dropzone.displayName = "Dropzone";