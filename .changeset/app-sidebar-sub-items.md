---
"codigo-floralis": minor
---

`AppSidebarItem` acepta `AppSidebarSubItem` como hijos (submenú colapsable con `open` / `onOpenChange` / `defaultOpen`, expandido automático según `activeHref`). Con `collapsible="icon"` los sub-items se muestran en un popover. `AppSidebarProps` expone `collapsible` y `AppSidebarItem.href` pasa a ser opcional cuando tiene sub-items.
