import { Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAdminDummyData } from "@/contexts/AdminDummyDataContext";

export function DummyDataBanner() {
  const { showDummyData } = useAdminDummyData();
  if (!showDummyData) return null;

  return (
    <Alert className="border-amber-300/80 bg-amber-50 text-amber-950 dark:border-amber-700/50 dark:bg-amber-950/40 dark:text-amber-50">
      <Info className="h-4 w-4 text-amber-700 dark:text-amber-300" />
      <AlertTitle>Preview mode — sample data</AlertTitle>
      <AlertDescription>
        Tables and charts use placeholder rows. Turn this off under{" "}
        <strong>Settings → Show dummy data</strong> to load live data from Supabase.
      </AlertDescription>
    </Alert>
  );
}
