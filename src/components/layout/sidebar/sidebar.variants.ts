import { cva } from "class-variance-authority"

export const sidebarMenuButtonVariants = cva(
  "peer/menu-button group/menu-button relative flex w-full items-center gap-2 overflow-hidden rounded-[calc(var(--radius-sm)+2px)] p-2 text-left text-s6 ring-sidebar-ring outline-hidden transition-[width,height,padding,background-color] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-foreground/10 focus-visible:ring-2 active:bg-sidebar-foreground/15 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-foreground/10 data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground data-active:before:absolute data-active:before:inset-y-1 data-active:before:left-0 data-active:before:w-[3px] data-active:before:rounded-full data-active:before:bg-sidebar-ring [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate",
  {
    variants: {
      variant: {
        ghost: "hover:bg-sidebar-foreground/10",
        outline:
          "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]",
      },
      size: {
        md: "h-8 text-s6",
        sm: "h-7 text-s6",
        lg: "h-12 text-s6 group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  }
)
