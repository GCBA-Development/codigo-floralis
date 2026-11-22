"use client";

import { Toast } from "@base-ui/react/toast";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { Alert02Icon, Cancel01Icon, CheckmarkCircle02Icon, InformationCircleIcon } from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";
import { toastManager, TOAST_TYPES, type ToastType } from "@/lib/toast";


const VISIBLE_LIMIT = 3;

type ToastAppearance = {
  icon: IconSvgElement;
  accent: string;
  iconColor: string;
};

const APPEARANCE_BY_TYPE: Record<ToastType, ToastAppearance> = {
  [TOAST_TYPES.SUCCESS]: {
    icon: CheckmarkCircle02Icon,
    accent: "border-l-success",
    iconColor: "text-success",
  },
  [TOAST_TYPES.ERROR]: {
    icon: Alert02Icon,
    accent: "border-l-destructive",
    iconColor: "text-destructive",
  },
  [TOAST_TYPES.WARNING]: {
    icon: Alert02Icon,
    accent: "border-l-warning",
    iconColor: "text-warning",
  },
  [TOAST_TYPES.INFO]: {
    icon: InformationCircleIcon,
    accent: "border-l-info",
    iconColor: "text-info",
  },
};

function appearanceOf(type: string | undefined): ToastAppearance {
  return APPEARANCE_BY_TYPE[type as ToastType] ?? APPEARANCE_BY_TYPE[TOAST_TYPES.INFO];
}

const TOAST_STACK = [
  "[--gap:0.625rem] [--peek:0.625rem]",
  "[--scale:calc(max(0,1-(var(--toast-index)*0.05)))] [--shrink:calc(1-var(--scale))]",
  "[--height:var(--toast-frontmost-height,var(--toast-height))]",
  "[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]",
  "absolute right-0 bottom-0 left-auto mr-0 w-full origin-bottom",
  "z-[calc(1000-var(--toast-index))] h-[var(--height)] data-expanded:h-[var(--toast-height)]",
  "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
].join(" ");

const TOAST_MOTION = [
  "[transition:transform_0.4s_cubic-bezier(0.22,1,0.36,1),opacity_0.4s,height_0.15s]",
  "[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]",
  "data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
  "data-starting-style:[transform:translateY(150%)]",
  "data-ending-style:opacity-0 data-limited:opacity-0",
  "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
  "data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
  "data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
  "data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
  "data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
].join(" ");

const TOAST_SURFACE =
  "overflow-hidden rounded-md border border-border border-l-4 bg-card bg-clip-padding text-card-foreground shadow-lg select-none";

function ToastList() {
  const { toasts } = Toast.useToastManager();

  return toasts.map((toast) => {
    const { icon, accent, iconColor } = appearanceOf(toast.type);

    return (
      <Toast.Root
        key={toast.id}
        toast={toast}
        data-slot="toast"
        className={cn(TOAST_STACK, TOAST_MOTION, TOAST_SURFACE, accent)}
      >
        <Toast.Content className="flex items-start gap-3 p-3 transition-opacity duration-200 data-behind:opacity-0 data-expanded:opacity-100">
          <HugeiconsIcon icon={icon} strokeWidth={2} className={cn("mt-px size-4 shrink-0", iconColor)} />

          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <Toast.Title className="text-s6 font-bold text-foreground" />
            <Toast.Description className="text-s6 text-muted-foreground empty:hidden" />
          </div>

          <Toast.Close
            aria-label="Cerrar notificación"
            className="-mr-1 -mt-1 flex size-6 shrink-0 items-center justify-center rounded-sm text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/30"
          >
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-3" />
          </Toast.Close>
        </Toast.Content>
      </Toast.Root>
    );
  });
}

export function Toaster() {
  return (
    <Toast.Provider toastManager={toastManager} limit={VISIBLE_LIMIT}>
      <Toast.Portal>
        <Toast.Viewport className="fixed right-4 bottom-4 left-4 z-[200] mx-auto w-auto outline-none sm:left-auto sm:w-90">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}
