import * as React from "react"

export interface AppSidebarContextValue {
  activeHref?: string
  loading: boolean
  onNavigate?: () => void
}

export const AppSidebarContext = React.createContext<AppSidebarContextValue>({ loading: false })

/** Lo provee el item padre cuando muestra sus sub-items en un popover (sidebar colapsado a íconos). */
export const SubItemPopoverContext = React.createContext<{ closePopover?: () => void }>({})
