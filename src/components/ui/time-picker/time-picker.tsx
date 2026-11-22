"use client";

import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { HugeiconsIcon } from "@hugeicons/react";
import { Clock01Icon } from "@hugeicons/core-free-icons";
import { type VariantProps } from "class-variance-authority";
import { timePickerVariants } from "./time-picker.variants";
import { cn } from "@/lib/utils";
import { Field, FieldLabel, FieldMessages } from "@/components/ui/field";

export interface TimePickerProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof timePickerVariants> {
  label?: string;
  /** Texto de ayuda debajo del campo. */
  description?: string;
  /** @deprecated Usá `description`. Se elimina en la próxima versión. */
  helperText?: string;
  /** Mensaje de error (string) o solo estado inválido (true). Tiene prioridad sobre `description`. */
  error?: string | boolean;
}

const TimePickerCustom = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({ className, variant, label, description, helperText, error, required, ...props }, ref) => {
    return (
      <Field invalid={Boolean(error)} className="group/field w-fit gap-2">
        {label && (
          <FieldLabel className="text-[10px] font-black uppercase tracking-[0.1em] transition-colors group-focus-within/field:text-primary data-invalid:text-destructive">
            {label} {required && <span className="text-destructive/80">*</span>}
          </FieldLabel>
        )}

        <div className="relative flex items-center">
          <div className="pointer-events-none absolute left-4 flex items-center">
            <HugeiconsIcon
              icon={Clock01Icon}
              className={cn(
                "size-4 text-muted-foreground transition-all duration-300 group-focus-within/field:scale-110 group-focus-within/field:text-primary",
                error && "text-destructive"
              )}
            />
          </div>

          <InputPrimitive
            type="time"
            ref={ref}
            required={required}
            className={cn(
              timePickerVariants({ variant }),
              "pl-11 pr-4",
              "w-[140px]", // Ancho fijo ideal para hh:mm
              className
            )}
            {...props}
          />
        </div>

        <div className="max-w-[140px] break-words [&>*]:mt-0 [&>*]:px-0">
          <FieldMessages description={description ?? helperText} error={error} />
        </div>
      </Field>
    );
  }
);

TimePickerCustom.displayName = "TimePickerCustom";
export { TimePickerCustom };
