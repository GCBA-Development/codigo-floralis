import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Clock01Icon } from "@hugeicons/core-free-icons";
import { type VariantProps } from "class-variance-authority";
import { timePickerVariants } from "./time-picker.variants";
import { cn } from "@/lib/utils";

export interface TimePickerProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof timePickerVariants> {
  label?: string;
  helperText?: string;
  /** Mensaje de error (string) o solo estado inválido (true). */
  error?: string | boolean;
}

const TimePickerCustom = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({ className, variant, label, helperText, error, disabled, required, ...props }, ref) => {
    return (
      /* Cambiamos w-full por w-fit para que no se estire */
      <div className="w-fit space-y-2 group/field">
        {label && (
          <label className={cn(
            "text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground transition-colors group-focus-within/field:text-primary",
            error && "text-destructive"
          )}>
            {label} {required && <span className="text-destructive/80">*</span>}
          </label>
        )}
        
        <div className="relative flex items-center">
          <div className="absolute left-4 flex items-center pointer-events-none">
            <HugeiconsIcon icon={Clock01Icon} className={cn(
              "size-4 text-muted-foreground transition-all duration-300 group-focus-within/field:text-primary group-focus-within/field:scale-110",
              error && "text-destructive"
            )} />
          </div>
          
          <input
            type="time"
            ref={ref}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            className={cn(
              timePickerVariants({ variant }),
              "pl-11 pr-4", 
              "w-[140px]", // <--- Tamaño fijo ideal para un Time Picker (hh:mm)
              className
            )}
            {...props}
          />
        </div>

        {(helperText || typeof error === "string") && (
          <p className={cn(
            "text-[11px] leading-none max-w-[140px] break-words", // Limitamos el texto de ayuda también
            error ? "text-destructive font-semibold" : "text-muted-foreground opacity-80"
          )}>
            {typeof error === "string" ? error : helperText}
          </p>
        )}
      </div>
    );
  }
);

TimePickerCustom.displayName = "TimePickerCustom";
export { TimePickerCustom };