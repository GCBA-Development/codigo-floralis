import type { Meta, StoryObj } from "@storybook/react-vite"

const COLOR_TOKENS = [
  { name: "background", value: "#f1f1f3" },
  { name: "foreground", value: "#1d3343" },
  { name: "card", value: "#ffffff" },
  { name: "card-foreground", value: "#1d3343" },
  { name: "popover", value: "#ffffff" },
  { name: "popover-foreground", value: "#1d3343" },
  { name: "primary", value: "#1d3343" },
  { name: "primary-foreground", value: "#ffffff" },
  { name: "secondary", value: "#035c80" },
  { name: "secondary-foreground", value: "#ffffff" },
  { name: "muted", value: "#f4f5f6" },
  { name: "muted-foreground", value: "#6b7280" },
  { name: "accent", value: "#f4f5f6" },
  { name: "accent-foreground", value: "#1d3343" },
  { name: "destructive", value: "#cb3232" },
  { name: "destructive-foreground", value: "#ffffff" },
  { name: "success", value: "#00642f" },
  { name: "success-foreground", value: "#ffffff" },
  { name: "warning", value: "#e88700" },
  { name: "warning-foreground", value: "#ffffff" },
  { name: "info", value: "#00769a" },
  { name: "info-foreground", value: "#ffffff" },
  { name: "border", value: "#dde2e8" },
  { name: "input", value: "#e5e7eb" },
  { name: "ring", value: "#0892cb" },
  { name: "field-border", value: "#9ca3af" },
  { name: "field-border-disabled", value: "#d1d5db" },
  { name: "sidebar", value: "#1d3343" },
  { name: "sidebar-foreground", value: "#ffffff" },
  { name: "sidebar-border", value: "#2c4256" },
  { name: "sidebar-accent", value: "#035c80" },
  { name: "sidebar-accent-foreground", value: "#ffffff" },
  { name: "sidebar-ring", value: "#0892cb" },
  { name: "number-highlight", value: "#056088" },
] as const

function ColorSwatches() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 lg:grid-cols-4">
      {COLOR_TOKENS.map(({ name, value }) => (
        <div key={name} className="overflow-hidden rounded-md border border-border bg-card">
          <div className="h-16 border-b border-border" style={{ backgroundColor: `var(--color-${name})` }} />
          <div className="p-2">
            <p className="text-s5 font-semibold text-foreground">{name}</p>
            <p className="text-s6 text-muted-foreground">{value}</p>
            <p className="text-s7 text-muted-foreground">--color-{name}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

const meta: Meta = { title: "GCBA/Design System/Colors", parameters: { layout: "fullscreen" } }
export default meta
type Story = StoryObj

export const Palette: Story = { render: () => <ColorSwatches /> }
