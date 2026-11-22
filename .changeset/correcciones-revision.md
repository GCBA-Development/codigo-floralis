---
"codigo-floralis": minor
---

- `ImageGallery`: el botón "Eliminar" de la vista previa ahora funciona (no se seteaba el índice seleccionado). Se eliminan las props `variant`/`size`, que no tenían efecto.
- `TimePickerCustom` se renombra a `TimePicker`. `TimePickerCustom` queda como alias deprecado por un release.
- Textos por defecto en español y sobrescribibles: `DialogContent`/`SheetContent` (`closeLabel`, antes "Close"), `SidebarTrigger`/`SidebarRail` (`label`, antes "Toggle Sidebar"), `Sidebar` (`mobileTitle`, `mobileDescription`). `alt` de `ImageGallery` en español.
