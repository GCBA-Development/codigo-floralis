"use client"

import { useId } from "react"
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import type { BreakdownItem } from "@/components/data/breakdown-table"

type SimpleBarChartProps = {
  data: BreakdownItem[]
  onBarClick?: (item: BreakdownItem) => void
}

const AXIS_LABEL_MAX_CHARS = 15

function AxisTick(props: { x?: number; y?: number; payload?: { value: string } }) {
  const { x = 0, y = 0, payload } = props
  const raw = payload?.value ?? ""
  const label =
    raw.length > AXIS_LABEL_MAX_CHARS ? `${raw.slice(0, AXIS_LABEL_MAX_CHARS - 1)}…` : raw

  return (
    <g transform={`translate(${x},${y})`}>
      <text dy={16} textAnchor="end" transform="rotate(-20)" className="fill-muted-foreground text-s7 font-medium">
        <title>{raw}</title>
        {label}
      </text>
    </g>
  )
}

function ValueLabel(props: { x?: number; y?: number; width?: number; value?: number }) {
  const { x = 0, y = 0, width = 0, value } = props
  if (value == null) return null

  return (
    <text
      x={x + width / 2}
      y={y - 8}
      textAnchor="middle"
      className="fill-primary text-s7 font-bold tabular-nums"
    >
      {value.toLocaleString("es-AR")}
    </text>
  )
}

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { payload: BreakdownItem }[]
}) {
  if (!active || !payload?.length) return null
  const item = payload[0].payload

  return (
    <div className="max-w-64 rounded-xl bg-popover px-3.5 py-2.5 shadow-(--shadow-float) ring-1 ring-(--hairline)">
      <p className="text-s6 font-medium leading-snug text-popover-foreground">{item.label}</p>
      <p className="text-s4 font-bold tabular-nums text-number-highlight">{item.value.toLocaleString("es-AR")}</p>
    </div>
  )
}

export function SimpleBarChart({ data, onBarClick }: SimpleBarChartProps) {
  // `useId` en React 19 ya devuelve un id válido para `url(#…)`; el gradiente
  // necesita id propio porque puede haber más de un chart en la página.
  const gradientId = useId()

  return (
    <div className={`h-56 w-full ${onBarClick ? "cursor-pointer" : ""}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap="30%" margin={{ top: 24, right: 8, bottom: 8, left: 8 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" style={{ stopColor: "var(--color-ring)" }} />
              <stop offset="100%" style={{ stopColor: "var(--color-secondary)" }} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--color-border)" strokeOpacity={0.7} strokeDasharray="2 6" />
          <XAxis
            dataKey="label"
            tick={<AxisTick />}
            axisLine={false}
            tickLine={false}
            interval={0}
            height={56}
          />
          <YAxis hide domain={[0, (dataMax: number) => dataMax * 1.15]} />
          <Tooltip cursor={{ fill: "var(--color-card)", opacity: 0.9, radius: 10 }} content={<ChartTooltip />} />
          <Bar
            dataKey="value"
            radius={[10, 10, 4, 4]}
            maxBarSize={28}
            // `background` dibuja, por cada columna, un rectángulo invisible de
            // punta a punta (todo el alto del gráfico, no sólo el value-bar) que
            // recibe el mismo `onClick` — es el mecanismo nativo de recharts para
            // esto. Usar el `onClick` a nivel de `<BarChart>` (con `activeLabel`)
            // tiene un bug propio de recharts: el estado interno que resuelve qué
            // barra tocaste no está listo en el primer click, así que hacía falta
            // clickear dos veces. Esto no depende de ese estado — es un click
            // nativo del SVG — y de paso resuelve el área de click grande.
            background={onBarClick ? { fill: "transparent" } : false}
            className={onBarClick ? "cursor-pointer" : undefined}
            onClick={onBarClick ? (item: { payload?: BreakdownItem }) => item.payload && onBarClick(item.payload) : undefined}
          >
            <LabelList dataKey="value" content={<ValueLabel />} />
            {data.map((item) => (
              <Cell
                key={item.label}
                fill={`url(#${gradientId})`}
                className="transition-[filter] duration-150 hover:brightness-90"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
