import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { badgeVariants } from "./Badge.variants";
import { cn } from "../../../lib/utils";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = ({ className, variant, size, ...props }: BadgeProps) => {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

Badge.displayName = "Badge";

export default Badge;