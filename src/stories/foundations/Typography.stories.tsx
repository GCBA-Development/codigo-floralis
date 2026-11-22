import type { Meta, StoryObj } from "@storybook/react-vite"

const TEXT_SIZES = [
  { token: "text-s1", size: "2rem / 2.5rem" },
  { token: "text-s2", size: "1.5rem / 2rem" },
  { token: "text-s3", size: "1.25rem / 1.75rem" },
  { token: "text-s4", size: "1rem / 1.5rem" },
  { token: "text-s5", size: "0.875rem / 1.25rem" },
  { token: "text-s6", size: "0.75rem / 1rem" },
  { token: "text-s7", size: "0.625rem / 0.875rem" },
] as const

function TypeScale() {
  return (
    <div className="flex flex-col gap-4 p-4">
      {TEXT_SIZES.map(({ token, size }) => (
        <div key={token} className="flex items-baseline gap-4 border-b border-border pb-3">
          <code className="w-24 shrink-0 text-s6 text-muted-foreground">{token}</code>
          <span className="w-40 shrink-0 text-s6 text-muted-foreground">{size}</span>
          <span className={`${token} text-foreground`}>Arbolado urbano de la Ciudad</span>
        </div>
      ))}
    </div>
  )
}

const meta: Meta = { title: "GCBA/Foundations/Typography", parameters: { layout: "fullscreen" } }
export default meta
type Story = StoryObj

export const Scale: Story = { render: () => <TypeScale /> }
