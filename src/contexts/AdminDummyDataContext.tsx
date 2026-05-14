import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const STORAGE_KEY = "shifacarebd_admin_show_dummy_data";

function readStored(): boolean {
  try {
    if (typeof window === "undefined") return false;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return false;
    return raw === "1" || raw === "true";
  } catch {
    return false;
  }
}

type AdminDummyDataContextValue = {
  showDummyData: boolean;
  setShowDummyData: (value: boolean) => void;
};

const AdminDummyDataContext = createContext<AdminDummyDataContextValue | null>(null);

export function AdminDummyDataProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [showDummyData, setShowDummyDataState] = useState(readStored);

  const setShowDummyData = useCallback(
    (value: boolean) => {
      setShowDummyDataState(value);
      try {
        window.localStorage.setItem(STORAGE_KEY, value ? "1" : "0");
      } catch {
        /* ignore quota / private mode */
      }
      void queryClient.invalidateQueries({ predicate: (q) => Array.isArray(q.queryKey) && q.queryKey[0] === "admin" });
    },
    [queryClient],
  );

  const value = useMemo(
    () => ({
      showDummyData,
      setShowDummyData,
    }),
    [showDummyData, setShowDummyData],
  );

  return <AdminDummyDataContext.Provider value={value}>{children}</AdminDummyDataContext.Provider>;
}

export function useAdminDummyData() {
  const ctx = useContext(AdminDummyDataContext);
  if (!ctx) {
    throw new Error("useAdminDummyData must be used within AdminDummyDataProvider");
  }
  return ctx;
}
