import * as React from "react";
import { dividerVariants } from "./Divider.variants";
import type { VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, variant, orientation, gradient, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(dividerVariants({ variant, orientation, gradient }), className)}
        role="separator"
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

export { Divider };