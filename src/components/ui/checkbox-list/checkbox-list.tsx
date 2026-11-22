"use client"

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { checkboxVariants } from "./checkbox-list.variants";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export interface CheckboxListOption {
  value: string | number;
  label: string;
}

export interface CheckboxListProps extends VariantProps<typeof checkboxVariants> {
  options: CheckboxListOption[];
  value?: (string | number)[];
  onValueChange?: (value: (string | number)[]) => void;
  label?: string;
  /** Mensaje de error (string) o solo estado inválido (true). */
  error?: string | boolean;
  disabled?: boolean;
  className?: string;
  name?: string; // Importante para RHF
}

const CheckboxList = React.forwardRef<HTMLDivElement, CheckboxListProps>(
  ({ options, value = [], onValueChange, label, error, disabled, variant, className, name }, ref) => {
    
    // Función que maneja el cambio y notifica al padre / RHF
    const handleToggle = (optionValue: string | number) => {
      if (disabled) return;

      const current = new Set(value);
      if (current.has(optionValue)) {
        current.delete(optionValue);
      } else {
        current.add(optionValue);
      }
      
      onValueChange?.(Array.from(current));
    };

    return (
      <div ref={ref} className={cn("w-full space-y-3", className)}>
        {label && (
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-center mb-4">
            {label}
          </h4>
        )}
        
        <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-md overflow-hidden shadow-sm">
          <div className="flex flex-col">
            {options.map((option) => {
              const isChecked = value.includes(option.value);
              
              return (
                <div
                  key={option.value}
                  onClick={() => handleToggle(option.value)}
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
                    {option.label}
                  </span>

                  <CheckboxPrimitive.Root
                    id={name ? `${name}-${option.value}` : undefined}
                    checked={isChecked}
                    onCheckedChange={() => handleToggle(option.value)}
                    onClick={(e) => e.stopPropagation()}
                    className={cn(checkboxVariants({ variant: isChecked ? variant : "primary" }))}
                    disabled={disabled}
                    aria-invalid={error ? true : undefined}
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