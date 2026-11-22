"use client"

import * as React from "react"

import { LinkComponentContext, type LinkComponentProps } from "./link-component"

/** Renderiza el link configurado en el contexto; createElement evita crear componentes durante el render. */
export function AppLink(props: LinkComponentProps) {
  return React.createElement(React.useContext(LinkComponentContext), props)
}
