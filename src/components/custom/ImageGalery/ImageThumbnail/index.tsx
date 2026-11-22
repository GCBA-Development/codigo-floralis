import { Trash2 } from "lucide-react";
import { Button } from "../../../ui/button";

interface ImageThumbnailProps {
  src: string;
  onDelete?: (e: React.MouseEvent) => void;
  onClick?: () => void;
}

export const ImageThumbnail = ({ src, onDelete, onClick }: ImageThumbnailProps) => {
  return (
    <div 
      onClick={onClick}
      className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-muted transition-all duration-300 hover:shadow-xl cursor-zoom-in active:scale-95"
    >
      <img
        src={src}
        alt="Thumbnail"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/10" />

      {onDelete && (
        <div className="absolute top-2 right-2 z-20">
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="h-8 w-8 rounded-lg opacity-0 shadow-lg transition-all duration-300 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(e);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
        <span className="bg-card/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-primary-foreground uppercase tracking-widest border border-card/30">
          Ampliar
        </span>
      </div>
    </div>
  );
};