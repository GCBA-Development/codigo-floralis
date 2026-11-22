import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, screen, userEvent, within } from "storybook/test"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Calendar03Icon,
  Camera01Icon,
  HelpCircleIcon,
  Mail01Icon,
  Notification03Icon,
  Settings02Icon,
  Tree03Icon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons"

import { SidebarProvider } from "@/components/layout/sidebar"
import {
  AppNavbar,
  AppNavbarAction,
  AppNavbarActions,
  AppNavbarBrand,
  AppNavbarEnd,
  AppNavbarSidebarTrigger,
  AppNavbarStart,
  AppNavbarUser,
  AppNavbarUserItem,
  type AppNavbarUserProps,
} from "."

const Logo = <HugeiconsIcon icon={Tree03Icon} strokeWidth={2} className="size-8" />

type DemoProps = Partial<AppNavbarUserProps> & { withUser?: boolean; manyActions?: boolean }

function DemoNavbar({ withUser = true, manyActions = false, ...user }: DemoProps) {
  return (
    <SidebarProvider>
      <AppNavbar>
        <AppNavbarStart>
          <AppNavbarSidebarTrigger />
          <AppNavbarBrand href="/" logo={Logo} title="GCBA" subtitle="Arbolado" />
        </AppNavbarStart>
        <AppNavbarEnd>
          <AppNavbarActions>
            <AppNavbarAction icon={Notification03Icon} label="Avisos" badge={3} onClick={fn()} />
            {manyActions ? (
              <>
                <AppNavbarAction icon={Mail01Icon} label="Mensajes" badge={120} href="/mensajes" />
                <AppNavbarAction icon={Calendar03Icon} label="Agenda" href="/agenda" />
                <AppNavbarAction icon={Camera01Icon} label="Cámaras" href="/camaras" />
                <AppNavbarAction icon={Settings02Icon} label="Ajustes" href="/ajustes" />
                <AppNavbarAction icon={HelpCircleIcon} label="Ayuda" href="/ayuda" />
              </>
            ) : null}
          </AppNavbarActions>
          {withUser ? (
            <AppNavbarUser name="Ana María Pérez" email="ana.perez@example.com" onLogout={fn()} {...user}>
              <AppNavbarUserItem icon={UserCircleIcon} href="/perfil">
                Ver perfil
              </AppNavbarUserItem>
              <AppNavbarUserItem icon={Settings02Icon} onClick={fn()}>
                Preferencias
              </AppNavbarUserItem>
            </AppNavbarUser>
          ) : null}
        </AppNavbarEnd>
      </AppNavbar>
    </SidebarProvider>
  )
}

const meta: Meta<typeof DemoNavbar> = {
  title: "GCBA/Layout/AppNavbar",
  component: DemoNavbar,
  parameters: { layout: "fullscreen" },
}
export default meta
type Story = StoryObj<typeof DemoNavbar>

export const Default: Story = {
  args: { onLogout: fn() },
  play: async ({ args }) => {
    await userEvent.click(screen.getByRole("button", { name: "Menú de usuario" }))
    await expect(await screen.findByText("ana.perez@example.com")).toBeVisible()
    await userEvent.click(await screen.findByRole("button", { name: "Cerrar sesión" }))
    await expect(args.onLogout).toHaveBeenCalledTimes(1)
  },
}

export const SinUsuario: Story = { args: { withUser: false } }

export const Cargando: Story = { args: { loading: true } }

export const ConAvatar: Story = { args: { avatar: "https://i.pravatar.cc/64?img=5" } }

export const MuchasAcciones: Story = {
  args: { manyActions: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("link", { name: "Mensajes: 99+" })).toBeVisible()
    await expect(canvas.getByRole("button", { name: "Avisos: 3" })).toBeVisible()
  },
}

export const Mobile: Story = {
  globals: { viewport: { value: "mobile1", isRotated: false } },
}
