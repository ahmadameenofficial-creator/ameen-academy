"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { IconCheck, IconX, IconAlertTriangle, IconInfoCircle } from "@tabler/icons-react";

// ============ Types ============

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  toast: (type: ToastType, message: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
}

// ============ Context ============

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast لازم يكون جوا ToastProvider");
  return ctx;
}

// ============ Provider ============

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, message }]);
    // حذف تلقائي بعد 4 ثواني
    setTimeout(() => removeToast(id), 4000);
  }, [removeToast]);

  const value: ToastContextType = {
    toast: addToast,
    success: (msg) => addToast("success", msg),
    error: (msg) => addToast("error", msg),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// ============ Toast Item ============

const icons = {
  success: IconCheck,
  error: IconX,
  warning: IconAlertTriangle,
  info: IconInfoCircle,
};

const styles = {
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
  warning: "bg-amber-50 border-amber-200 text-amber-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
};

const iconStyles = {
  success: "text-green-600 bg-green-100",
  error: "text-red-600 bg-red-100",
  warning: "text-amber-600 bg-amber-100",
  info: "text-blue-600 bg-blue-100",
};

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const Icon = icons[toast.type];

  useEffect(() => {
    // Animation: slide in
    requestAnimationFrame(() => setVisible(true));
  }, []);

  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg transition-all duration-300 ${
        styles[toast.type]
      } ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
    >
      <div className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${iconStyles[toast.type]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-sm font-medium flex-1">{toast.message}</p>
      <button
        onClick={onClose}
        className="shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors"
      >
        <IconX className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
