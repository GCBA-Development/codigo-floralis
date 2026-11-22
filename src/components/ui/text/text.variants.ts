import { cva } from "class-variance-authority"

export const textVariants = cva("", {
  variants: {
    variant: {
      pageTitle: "text-s2 font-bold text-primary",
      header: "text-s3 font-bold text-primary",
      subtitle: "text-s4 font-normal text-primary",
      body: "text-s5 font-normal text-primary",
      label: "text-s6 font-medium text-primary",
      muted: "text-s6 font-normal text-muted-foreground",
      link: "text-s5 font-normal text-secondary",
      number: "text-s4 font-bold text-number-highlight",
    },
  },
  defaultVariants: {
    variant: "body",
  },
})
