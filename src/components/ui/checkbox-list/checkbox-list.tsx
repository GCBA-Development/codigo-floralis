"use client"

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Fieldset } from "@base-ui/react/fieldset";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { checkboxVariants } from "./checkbox-list.variants";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { FieldMessages } from "@/components/ui/field";

export interface CheckboxListOption {
  value: string | number;
  label: string;
}

export interface CheckboxListProps extends VariantProps<typeof checkboxVariants> {
  options: CheckboxListOption[];
  value?: (string | number)[];
  onValueChange?: (value: (string | number)[]) => void;
  /** Título del grupo; es la leyenda accesible del `fieldset`. */
  label?: string;
  /** Texto de ayuda debajo del grupo. */
  description?: string;
  /** Mensaje de error (string) o solo estado inválido (true). Tiene prioridad sobre `description`. */
  error?: string | boolean;
  disabled?: boolean;
  className?: string;
  name?: string;
}

const CheckboxList = React.forwardRef<HTMLDivElement, CheckboxListProps>(
  ({ options, value = [], onValueChange, label, description, error, disabled, variant, className, name }, ref) => {
    const messageId = React.useId();
    const hasMessage = Boolean(description) || (typeof error === "string" && error !== "");

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
      // Un grupo tiene varios controles: va en `Fieldset` (leyenda + describedby), no en `Field`, que asume un solo control.
      <div ref={ref} className={cn("w-full space-y-3", className)}>
        <Fieldset.Root disabled={disabled} aria-describedby={hasMessage ? messageId : undefined}>
          {label && (
            <Fieldset.Legend className="mb-4 w-full text-center text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              {label}
            </Fieldset.Legend>
          )}

          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/50 shadow-sm backdrop-blur-md">
            <div className="flex flex-col">
              {options.map((option) => {
                const isChecked = value.includes(option.value);

                return (
                  <div
                    key={option.value}
                    onClick={() => handleToggle(option.value)}
                    className={cn(
                      "group flex cursor-pointer items-center justify-between border-b border-border px-6 py-4 transition-all duration-300 last:border-none",
                      isChecked ? "bg-primary/[0.03]" : "hover:bg-muted/80",
                      disabled && "cursor-not-allowed opacity-40"
                    )}
                  >
                    <span
                      className={cn(
                        "text-[13px] font-bold transition-all duration-300",
                        isChecked ? "translate-x-1 text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      )}
                    >
                      {option.label}
                    </span>

                    <CheckboxPrimitive.Root
                      id={name ? `${name}-${option.value}` : undefined}
                      checked={isChecked}
                      onCheckedChange={() => handleToggle(option.value)}
                      onClick={(event) => event.stopPropagation()}
                      className={cn(checkboxVariants({ variant: isChecked ? variant : "primary" }))}
                      disabled={disabled}
                      aria-label={option.label}
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
        </Fieldset.Root>
        <FieldMessages id={messageId} description={description} error={error} />
      </div>
    );
  }
);

CheckboxList.displayName = "CheckboxList";
export { CheckboxList };
