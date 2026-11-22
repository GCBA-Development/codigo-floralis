"use client"

import * as React from "react"

/** Cualquier componente de link que acepte `href` (`"a"`, `next/link`, `react-router` Link, ...). */
export type LinkComponentProps = {
  href: string
  className?: string
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  "aria-label"?: string
  "aria-current"?: "page"
}

export type LinkComponent = React.ElementType<LinkComponentProps>

export const LinkComponentContext = React.createContext<LinkComponent>("a")
