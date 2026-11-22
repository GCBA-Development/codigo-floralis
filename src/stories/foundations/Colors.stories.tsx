import type { Meta, StoryObj } from "@storybook/react-vite"
import indexCss from "../../index.css?raw"
import { contrastRatio, passesAA } from "../../lib/contrast"
import { SEMANTIC_COLOR_PAIRS, isPrimitiveToken, resolveThemeTokens } from "../../lib/theme-tokens"

const lightTokens = resolveThemeTokens(indexCss, "light")
const darkTokens = resolveThemeTokens(indexCss, "dark")

const PRIMITIVE_SCALES = Object.entries(lightTokens)
  .filter(([name]) => isPrimitiveToken(name))
  .reduce<Record<string, [string, string][]>>((scales, [name, hex]) => {
    const scale = name.replace("--fl-", "").split("-")[0]
    return { ...scales, [scale]: [...(scales[scale] ?? []), [name, hex]] }
  }, {})

const SEMANTIC_TOKEN_NAMES = [...new Set(SEMANTIC_COLOR_PAIRS.flat()), "border", "input", "ring", "field-border", "field-border-disabled", "sidebar-border", "sidebar-ring"]

function PrimitiveScales() {
  return (
    <section className="flex flex-col gap-4 p-4">
      <h2 className="text-s3 font-bold text-foreground">Nivel 1: primitivas</h2>
      <p className="text-s5 text-muted-foreground">Paleta cruda. No se usa en componentes: solo la referencian los tokens semánticos.</p>
      {Object.entries(PRIMITIVE_SCALES).map(([scale, steps]) => (
        <div key={scale}>
          <h3 className="mb-1 text-s5 font-semibold capitalize text-foreground">{scale}</h3>
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-12">
            {steps.map(([name, hex]) => (
              <div key={name} className="overflow-hidden rounded-md border border-border bg-card">
                <div className="h-10" style={{ backgroundColor: `var(${name})` }} />
                <p className="px-1 pt-1 text-s7 font-semibold text-foreground">{name.split("-").pop()}</p>
                <p className="px-1 pb-1 text-s7 text-muted-foreground">{hex}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

function ContrastCell({ tokens, foreground, background }: { tokens: Record<string, string>; foreground: string; background: string }) {
  const ratio = contrastRatio(tokens[`--${foreground}`], tokens[`--${background}`])
  const isAccessible = passesAA(ratio)
  return (
    <td className="px-3 py-2 tabular-nums">
      {ratio.toFixed(2)}:1{" "}
      <span className={isAccessible ? "font-semibold text-success" : "font-semibold text-destructive"}>{isAccessible ? "AA ✓" : "AA ✗"}</span>
    </td>
  )
}

function SemanticTokens() {
  return (
    <section className="flex flex-col gap-4 p-4">
      <h2 className="text-s3 font-bold text-foreground">Nivel 2: semánticos</h2>
      <p className="text-s5 text-muted-foreground">Cambian con el tema (toolbar de Storybook). Muestra el tema activo.</p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {SEMANTIC_TOKEN_NAMES.map((name) => (
          <div key={name} className="overflow-hidden rounded-md border border-border bg-card">
            <div className="h-16 border-b border-border" style={{ backgroundColor: `var(--color-${name})` }} />
            <div className="p-2">
              <p className="text-s5 font-semibold text-foreground">{name}</p>
              <p className="text-s6 text-muted-foreground">claro {lightTokens[`--${name}`]} · oscuro {darkTokens[`--${name}`]}</p>
              <p className="text-s7 text-muted-foreground">--color-{name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ContrastTable() {
  return (
    <section className="flex flex-col gap-4 p-4">
      <h2 className="text-s3 font-bold text-foreground">Contraste WCAG (AA texto normal, 4.5:1)</h2>
      <table className="w-full max-w-3xl text-left text-s5 text-foreground">
        <thead className="border-b border-border text-s6 text-muted-foreground">
          <tr>
            <th className="px-3 py-2">Texto</th>
            <th className="px-3 py-2">Fondo</th>
            <th className="px-3 py-2">Claro</th>
            <th className="px-3 py-2">Oscuro</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {SEMANTIC_COLOR_PAIRS.map(([foreground, background]) => (
            <tr key={`${foreground}-${background}`}>
              <td className="px-3 py-2">{foreground}</td>
              <td className="px-3 py-2">{background}</td>
              <ContrastCell tokens={lightTokens} foreground={foreground} background={background} />
              <ContrastCell tokens={darkTokens} foreground={foreground} background={background} />
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

const meta: Meta = { title: "GCBA/Foundations/Colors", parameters: { layout: "fullscreen" } }
export default meta
type Story = StoryObj

export const Primitives: Story = { render: () => <PrimitiveScales /> }
export const Semantic: Story = { render: () => <SemanticTokens /> }
export const Contrast: Story = { render: () => <ContrastTable /> }
