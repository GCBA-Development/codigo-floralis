import * as React from "react";
import { Loader2 } from "lucide-react";
import { loadingVariants } from "./Loading.variants";
import type { VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import logoPlaceHolder from "../../../assets/logo.webp"

export interface LoadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  showLogo?: boolean;
  label?: string;
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, variant, size, showLogo = true, label, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(loadingVariants({ variant, size }), className)}
        {...props}
      >
        <div className="relative flex items-center justify-center w-full h-full">
          <Loader2 
            className={cn(
              "animate-spin text-primary p-2", 
              variant === "fullscreen" 
                ? "fixed top-[140px] h-[110px] w-[110px]"
                : "h-20 w-20"
            )} 
            strokeWidth={1.8}
          />
          
          {showLogo && variant !== "inline" && (
            <img 
              src={logoPlaceHolder} 
              alt="Logo" 
              className={cn(
                "object-contain p-1", 
                variant === "fullscreen" 
                  ? "fixed top-[164px] h-[58px] w-[62px]"
                  : "absolute h-10 w-10"
              )}
            />
          )}

          {label && variant === "fullscreen" && (
            <span className="fixed top-[250px] text-[11px] font-bold uppercase tracking-[0.4em] text-muted-foreground animate-pulse">
              {label}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Loading.displayName = "Loading";
export { Loading };