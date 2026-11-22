"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, Tick02Icon } from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";

function Select<Value, Multiple extends boolean | undefined = false>({
  ...props
}: SelectPrimitive.Root.Props<Value, Multiple>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectValue({ ...props }: SelectPrimitive.Value.Props) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

type SelectTriggerProps = SelectPrimitive.Trigger.Props & { label?: React.ReactNode };

function SelectTrigger({ className, children, label, id, ...props }: SelectTriggerProps) {
  const generatedId = React.useId();
  const triggerId = id ?? generatedId;

  const trigger = (
    <SelectPrimitive.Trigger
      id={triggerId}
      data-slot="select-trigger"
      className={cn(
        "flex h-8 w-full items-center justify-between gap-1 rounded-t-md border-0 border-b-2 border-field-border bg-muted/40 bg-clip-padding px-2.5 text-s6 text-foreground outline-none select-none transition-all duration-200 hover:bg-muted/60 focus-visible:border-border data-[popup-open]:border-border data-[popup-open]:bg-muted/60 disabled:pointer-events-none disabled:border-field-border-disabled disabled:bg-transparent disabled:text-muted-foreground disabled:opacity-60",
        label && "h-11 pt-4.5 pb-1",
        className,
      )}
      {...props}
    >
      <span className="min-w-0 flex-1 truncate text-left">{children}</span>
      <SelectPrimitive.Icon data-slot="select-icon">
        <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} className="size-3.5 shrink-0 text-muted-foreground" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );

  if (!label) return trigger;

  return (
    <div className="relative w-full">
      {trigger}
      <label
        htmlFor={triggerId}
        className="pointer-events-none absolute top-1.5 left-2.5 text-s7 font-medium text-muted-foreground"
      >
        {label}
      </label>
    </div>
  );
}

function SelectPortal({ ...props }: SelectPrimitive.Portal.Props) {
  return <SelectPrimitive.Portal data-slot="select-portal" {...props} />;
}

function SelectPositioner({
  className,
  side = "bottom",
  sideOffset = 4,
  alignItemWithTrigger = false,
  ...props
}: SelectPrimitive.Positioner.Props) {
  return (
    <SelectPrimitive.Positioner
      data-slot="select-positioner"
      side={side}
      sideOffset={sideOffset}
      alignItemWithTrigger={alignItemWithTrigger}
      className={cn("z-[110] outline-none", className)}
      {...props}
    />
  );
}

function SelectPopup({ className, ...props }: SelectPrimitive.Popup.Props) {
  return (
    <SelectPrimitive.Popup
      data-slot="select-popup"
      className={cn(
        "max-h-[min(24rem,var(--available-height))] min-w-[var(--anchor-width)] overflow-y-auto rounded-md border-0 bg-popover bg-clip-padding p-1 text-popover-foreground shadow-lg transition duration-150 ease-in-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function SelectContent({ className, children, ...props }: SelectPrimitive.Popup.Props) {
  return (
    <SelectPortal>
      <SelectPositioner>
        <SelectPopup className={className} {...props}>
          {children}
        </SelectPopup>
      </SelectPositioner>
    </SelectPortal>
  );
}

function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-s6 text-foreground outline-none select-none data-highlighted:bg-muted data-highlighted:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText data-slot="select-item-text" className="flex-1">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator data-slot="select-item-indicator" className="ml-2 flex items-center">
        <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} className="size-3.5" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

export { Select, SelectValue, SelectTrigger, SelectContent, SelectItem };
