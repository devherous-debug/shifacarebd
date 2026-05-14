import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAdminDummyData } from "@/contexts/AdminDummyDataContext";
import { dummyOrders } from "@/lib/admin-dummy";

type OrderCustomer = {
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
};

export default function AdminCustomersPage() {
  const { showDummyData } = useAdminDummyData();
  const { data: liveOrders = [], isLoading } = useQuery({
    queryKey: ["admin", "orders", "customers-source"],
    enabled: !showDummyData,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("customer_name, customer_phone, customer_email, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as (OrderCustomer & { created_at: string })[];
    },
  });

  const orders = showDummyData
    ? dummyOrders.map((o) => ({
        customer_name: o.customer_name,
        customer_phone: o.customer_phone,
        customer_email: o.customer_email,
        created_at: o.created_at,
      }))
    : liveOrders;

  const isTableLoading = !showDummyData && isLoading;

  const customers = useMemo(() => {
    const map = new Map<
      string,
      { customer_name: string; customer_phone: string; customer_email: string | null; orders: number; last: string }
    >();
    for (const o of orders) {
      const key = o.customer_phone.trim();
      if (!key) continue;
      const prev = map.get(key);
      if (!prev) {
        map.set(key, {
          customer_name: o.customer_name,
          customer_phone: o.customer_phone,
          customer_email: o.customer_email,
          orders: 1,
          last: o.created_at,
        });
      } else {
        prev.orders += 1;
        if (new Date(o.created_at) > new Date(prev.last)) prev.last = o.created_at;
      }
    }
    return [...map.values()].sort((a, b) => new Date(b.last).getTime() - new Date(a.last).getTime());
  }, [orders]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Customers</h1>
        <p className="text-muted-foreground">Derived from order history (unique phone numbers).</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer list</CardTitle>
          <CardDescription>For a dedicated CRM, sync these contacts to your marketing tools.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Last order</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isTableLoading && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Loading…
                  </TableCell>
                </TableRow>
              )}
              {!isTableLoading && customers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No customers yet — orders will populate this view.
                  </TableCell>
                </TableRow>
              )}
              {customers.map((c) => (
                <TableRow key={c.customer_phone}>
                  <TableCell className="font-medium">{c.customer_name}</TableCell>
                  <TableCell className="font-mono text-sm">{c.customer_phone}</TableCell>
                  <TableCell className="text-muted-foreground">{c.customer_email ?? "—"}</TableCell>
                  <TableCell>{c.orders}</TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {new Date(c.last).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
