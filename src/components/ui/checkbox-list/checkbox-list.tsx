import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { checkboxVariants } from "./checkbox-list.variants";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export interface Opcion {
  codigo: string | number;
  nombre: string;
}

export interface CheckboxListProps extends VariantProps<typeof checkboxVariants> {
  opciones: Opcion[];
  elegidos?: (string | number)[];
  onChange?: (values: (string | number)[]) => void; // Este es el que usa RHF
  titulo?: string;
  disabled?: boolean;
  className?: string;
  name?: string; // Importante para RHF
}

const CheckboxList = React.forwardRef<HTMLDivElement, CheckboxListProps>(
  ({ opciones, elegidos = [], onChange, titulo, disabled, variant, className, name }, ref) => {
    
    // Función que maneja el cambio y notifica al padre / RHF
    const handleToggle = (codigo: string | number) => {
      if (disabled) return;

      const current = new Set(elegidos);
      if (current.has(codigo)) {
        current.delete(codigo);
      } else {
        current.add(codigo);
      }
      
      const newValores = Array.from(current);
      
      // Notificamos el cambio
      if (onChange) {
        onChange(newValores);
      }
    };

    return (
      <div ref={ref} className={cn("w-full space-y-3", className)}>
        {titulo && (
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-center mb-4">
            {titulo}
          </h4>
        )}
        
        <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-md overflow-hidden shadow-sm">
          <div className="flex flex-col">
            {opciones.map((opcion) => {
              const isChecked = elegidos.includes(opcion.codigo);
              
              return (
                <div
                  key={opcion.codigo}
                  onClick={() => handleToggle(opcion.codigo)}
                  className={cn(
                    "group flex items-center justify-between px-6 py-4 transition-all duration-300 cursor-pointer border-b border-border last:border-none",
                    isChecked ? "bg-primary/[0.03]" : "hover:bg-muted/80",
                    disabled && "opacity-40 cursor-not-allowed"
                  )}
                >
                  <span className={cn(
                    "text-[13px] font-bold transition-all duration-300",
                    isChecked ? "text-foreground translate-x-1" : "text-muted-foreground group-hover:text-foreground"
                  )}>
                    {opcion.nombre}
                  </span>

                  <CheckboxPrimitive.Root
                    id={`${name}-${opcion.codigo}`}
                    checked={isChecked}
                    onCheckedChange={() => handleToggle(opcion.codigo)}
                    onClick={(e) => e.stopPropagation()}
                    className={cn(checkboxVariants({ variant: isChecked ? variant : "default" }))}
                    disabled={disabled}
                  >
                    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
                      <HugeiconsIcon icon={Tick02Icon} strokeWidth={3} className="size-3.5" />
                    </CheckboxPrimitive.Indicator>
                  </CheckboxPrimitive.Root>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

CheckboxList.displayName = "CheckboxList";
export { CheckboxList };