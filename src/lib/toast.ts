import { Toast } from "@base-ui/react/toast";

export const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
} as const;

export type ToastType = (typeof TOAST_TYPES)[keyof typeof TOAST_TYPES];

export const toastManager = Toast.createToastManager();

const TIMEOUT_BY_TYPE: Record<ToastType, number> = {
  [TOAST_TYPES.SUCCESS]: 4000,
  [TOAST_TYPES.ERROR]: 7000,
  [TOAST_TYPES.WARNING]: 6000,
  [TOAST_TYPES.INFO]: 5000,
};

export type ToastOptions = {
  description?: string;
  timeout?: number;
};

function add(type: ToastType, message: string, options: ToastOptions = {}) {
  return toastManager.add({
    type,
    title: message,
    description: options.description,
    timeout: options.timeout ?? TIMEOUT_BY_TYPE[type],
    priority: type === TOAST_TYPES.ERROR ? "high" : "low",
  });
}

export const toast = {
  success: (message: string, options?: ToastOptions) => add(TOAST_TYPES.SUCCESS, message, options),
  error: (message: string, options?: ToastOptions) => add(TOAST_TYPES.ERROR, message, options),
  warning: (message: string, options?: ToastOptions) => add(TOAST_TYPES.WARNING, message, options),
  info: (message: string, options?: ToastOptions) => add(TOAST_TYPES.INFO, message, options),
  dismiss: (id: string) => toastManager.close(id),
};
