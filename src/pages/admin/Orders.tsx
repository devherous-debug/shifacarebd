import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { useAdminDummyData } from "@/contexts/AdminDummyDataContext";
import { dummyOrders } from "@/lib/admin-dummy";

type OrderRow = Database["public"]["Tables"]["orders"]["Row"];
type OrderStatus = Database["public"]["Tables"]["orders"]["Row"]["status"];
type PaymentStatus = Database["public"]["Tables"]["orders"]["Row"]["payment_status"];

function randomOrderNumber() {
  return `SFC-${Date.now().toString(36).toUpperCase()}`;
}

export default function AdminOrdersPage() {
  const { showDummyData } = useAdminDummyData();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    total: "",
  });

  const { data: liveOrders = [], isLoading } = useQuery({
    queryKey: ["admin", "orders"],
    enabled: !showDummyData,
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as OrderRow[];
    },
  });

  const orders = showDummyData ? dummyOrders : liveOrders;

  const updateOrder = useMutation({
    mutationFn: async (payload: { id: string; status?: OrderStatus; payment_status?: PaymentStatus }) => {
      if (showDummyData) {
        toast.message("Preview mode: connect real data to edit orders.");
        throw new Error("preview");
      }
      const { id, ...rest } = payload;
      const { error } = await supabase.from("orders").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin", "orders"] });
      void qc.invalidateQueries({ queryKey: ["admin", "dashboard-stats"] });
      toast.success("Order updated");
    },
    onError: (e: Error) => {
      if (e.message !== "preview") toast.error(e.message);
    },
  });

  const createOrder = useMutation({
    mutationFn: async () => {
      if (showDummyData) {
        toast.message("Preview mode: turn off dummy data to create orders.");
        throw new Error("preview");
      }
      const total = Number(form.total);
      if (!form.customer_name.trim() || !form.customer_phone.trim() || Number.isNaN(total)) {
        throw new Error("Fill name, phone, and a valid total");
      }
      const { error } = await supabase.from("orders").insert({
        order_number: randomOrderNumber(),
        customer_name: form.customer_name.trim(),
        customer_phone: form.customer_phone.trim(),
        customer_email: form.customer_email.trim() || null,
        total,
        status: "pending",
        payment_status: "unpaid",
        items: [],
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setOpen(false);
      setForm({ customer_name: "", customer_phone: "", customer_email: "", total: "" });
      void qc.invalidateQueries({ queryKey: ["admin", "orders"] });
      void qc.invalidateQueries({ queryKey: ["admin", "dashboard-stats"] });
      toast.success("Order created");
    },
    onError: (e: Error) => {
      if (e.message !== "preview") toast.error(e.message);
    },
  });

  const rows = useMemo(() => orders, [orders]);
  const isTableLoading = !showDummyData && isLoading;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage customer orders and fulfillment status.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button disabled={showDummyData} title={showDummyData ? "Disabled while dummy data is on" : undefined}>
              <Plus className="mr-2 h-4 w-4" />
              New order
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create order</DialogTitle>
            </DialogHeader>
            <div className="grid gap-3 py-2">
              <div className="grid gap-2">
                <Label htmlFor="cname">Customer name</Label>
                <Input
                  id="cname"
                  value={form.customer_name}
                  onChange={(e) => setForm((f) => ({ ...f, customer_name: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cphone">Phone</Label>
                <Input
                  id="cphone"
                  value={form.customer_phone}
                  onChange={(e) => setForm((f) => ({ ...f, customer_phone: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cemail">Email (optional)</Label>
                <Input
                  id="cemail"
                  type="email"
                  value={form.customer_email}
                  onChange={(e) => setForm((f) => ({ ...f, customer_email: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="total">Total (৳)</Label>
                <Input
                  id="total"
                  inputMode="decimal"
                  value={form.total}
                  onChange={(e) => setForm((f) => ({ ...f, total: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => createOrder.mutate()} disabled={createOrder.isPending}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All orders</CardTitle>
          <CardDescription>Latest first. Update status as you process shipments.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isTableLoading && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    Loading…
                  </TableCell>
                </TableRow>
              )}
              {!isTableLoading && rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No orders yet.
                  </TableCell>
                </TableRow>
              )}
              {rows.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-medium">{o.order_number}</TableCell>
                  <TableCell>
                    <div>{o.customer_name}</div>
                    <div className="text-xs text-muted-foreground">{o.customer_phone}</div>
                  </TableCell>
                  <TableCell>৳{Number(o.total).toLocaleString()}</TableCell>
                  <TableCell>
                    <Select
                      value={o.status}
                      disabled={showDummyData}
                      onValueChange={(v) => updateOrder.mutate({ id: o.id, status: v as OrderStatus })}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(
                          ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"] as const
                        ).map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={o.payment_status}
                      disabled={showDummyData}
                      onValueChange={(v) => updateOrder.mutate({ id: o.id, payment_status: v as PaymentStatus })}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(["unpaid", "paid", "refunded", "partial"] as const).map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {format(new Date(o.created_at), "MMM d, yyyy HH:mm")}
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
