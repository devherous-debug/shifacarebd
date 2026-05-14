import { Link } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useAdminDummyData } from "@/contexts/AdminDummyDataContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function AdminSettingsPage() {
  const { user } = useAdminAuth();
  const { showDummyData, setShowDummyData } = useAdminDummyData();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Session and panel preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Data preview</CardTitle>
          <CardDescription>
            When enabled, the admin panel shows sample orders, products, and charts instead of your Supabase database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="dummy-data" className="text-base">
                Show dummy data
              </Label>
              <p className="text-sm text-muted-foreground">Off = live Supabase data. On = UI preview only (no writes).</p>
            </div>
            <Switch id="dummy-data" checked={showDummyData} onCheckedChange={setShowDummyData} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your account</CardTitle>
          <CardDescription>Signed in with Supabase Auth. Add or remove users under Authentication in the Supabase dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <p className="text-muted-foreground">Email</p>
            <p className="font-medium">{user?.email ?? "—"}</p>
          </div>
          <div>
            <p className="text-muted-foreground">User id</p>
            <p className="break-all font-mono text-xs text-muted-foreground">{user?.id ?? "—"}</p>
          </div>
          <Separator />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <Link to="/">View storefront</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
