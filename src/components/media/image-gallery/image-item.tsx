"use client"

import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ImagePreviewProps {
  src: string | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
}

export const ImagePreview = ({ src, isOpen, onClose, onDelete }: ImagePreviewProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] border-none bg-transparent p-0 shadow-none outline-none sm:max-w-4xl [&>button]:text-primary-foreground [&>button]:opacity-100 [&>button]:cursor-pointer">
        <DialogHeader className="sr-only">
          <DialogTitle>Vista previa</DialogTitle>
        </DialogHeader>

        <div className="relative flex h-full w-full items-center justify-center p-4">
          <div className="relative group/maximized">
            <img
              src={src || ""}
              alt="Preview"
              className="max-h-[90vh] w-auto rounded-xl object-contain shadow-2xl ring-1 ring-card/10 animate-in fade-in zoom-in-95 duration-300"
            />

            {onDelete && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Button
                  type="button"
                  variant="destructive"
                  size="lg"
                  className="flex items-center gap-2 rounded-full px-6 shadow-2xl hover:scale-105 transition-transform active:scale-95"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    onDelete();
                    onClose();
                  }}
                >
                  <HugeiconsIcon icon={Delete02Icon} className="size-5" />
                  <span className="font-semibold">Eliminar imagen</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};