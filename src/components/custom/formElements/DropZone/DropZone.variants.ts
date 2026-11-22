import { cva } from "class-variance-authority";

export const dropzoneVariants = cva(
  "relative flex flex-col items-center justify-center border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 shadow-sm",
        modern: "border-slate-100 bg-slate-50/50 backdrop-blur-sm hover:bg-white hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/40",
      },
      size: {
        sm: "min-h-[100px] py-4 rounded-xl",
        md: "min-h-[160px] py-8 rounded-2xl",
        lg: "min-h-[240px] py-12 rounded-[2rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);