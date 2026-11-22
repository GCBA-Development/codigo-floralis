import React, { forwardRef } from "react";
import { cn } from "../../../../lib/utils";
import { inputVariants } from "./Input.variants";
import type { VariantProps } from "class-variance-authority";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  error?: boolean;
  startIcon?: React.ReactNode;
  restricciones?: Array<"soloNumeros" | "soloTelefono" | "sentenceCase" | "alfanumerico" | "email">;
  onErrorStateChange?: (hasError: boolean) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, label, helperText, error, startIcon, restricciones, onChange, ...props }, ref) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      if (restricciones?.includes("soloNumeros") && !/^\d*$/.test(value)) return;
      if (restricciones?.includes("soloTelefono") && !/^[\d+]*$/.test(value)) return;

      if (restricciones?.includes("sentenceCase") && value.length > 0) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
        e.target.value = value; 
      }

      if (onChange) {
        onChange(e); 
      }
    };

    return (
      <div className="w-full space-y-2 group">
        {label && (
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-all">
            {label}
          </label>
        )}
        
        <div className="relative flex items-center group/input">
          {startIcon && (
            <div className="absolute left-3.5 text-muted-foreground group-focus-within/input:text-primary transition-colors">
              {startIcon}
            </div>
          )}
          
          <input
            ref={ref}
            onChange={handleChange}
            className={cn(
              inputVariants({ variant: error ? "error" : variant }),
              startIcon && "pl-11",
              "bg-card/80 backdrop-blur-sm shadow-sm",
              className
            )}
            {...props}
          />
        </div>

        {helperText && (
          <p className={cn("text-[11px] font-bold px-1", error ? "text-destructive animate-pulse" : "text-muted-foreground")}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);


Input.displayName = "Input";

export default Input;