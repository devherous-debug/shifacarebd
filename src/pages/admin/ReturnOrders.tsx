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
import { dummyOrderChoices, dummyReturns } from "@/lib/admin-dummy";

type ReturnRow = Database["public"]["Tables"]["return_orders"]["Row"];
type ReturnStatus = ReturnRow["status"];

type ReturnWithOrder = ReturnRow & {
  orders: { order_number: string; customer_name: string } | null;
};

export default function AdminReturnOrdersPage() {
  const { showDummyData } = useAdminDummyData();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [reason, setReason] = useState("");
  const [refund, setRefund] = useState("");

  const { data: liveReturns = [], isLoading: loadingReturns } = useQuery({
    queryKey: ["admin", "returns"],
    enabled: !showDummyData,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("return_orders")
        .select("*, orders(order_number, customer_name)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ReturnWithOrder[];
    },
  });

  const { data: liveChoices = [], isLoading: loadingChoices } = useQuery({
    queryKey: ["admin", "orders", "choices"],
    enabled: !showDummyData,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id, order_number, customer_name")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data ?? [];
    },
  });

  const returns = showDummyData ? dummyReturns : liveReturns;
  const orderChoices = showDummyData ? dummyOrderChoices : liveChoices;
  const isLoading = !showDummyData && (loadingReturns || loadingChoices);

  const updateReturn = useMutation({
    mutationFn: async (payload: { id: string; status: ReturnStatus }) => {
      if (showDummyData) {
        toast.message("Preview mode: connect real data to edit returns.");
        throw new Error("preview");
      }
      const { error } = await supabase.from("return_orders").update({ status: payload.status }).eq("id", payload.id);
      if (error) throw error;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin", "returns"] });
      void qc.invalidateQueries({ queryKey: ["admin", "dashboard-stats"] });
      toast.success("Return updated");
    },
    onError: (e: Error) => {
      if (e.message !== "preview") toast.error(e.message);
    },
  });

  const createReturn = useMutation({
    mutationFn: async () => {
      if (showDummyData) {
        toast.message("Preview mode: turn off dummy data to log returns.");
        throw new Error("preview");
      }
      const refundAmount = Number(refund);
      if (!orderId) throw new Error("Select an order");
      if (Number.isNaN(refundAmount) || refundAmount < 0) throw new Error("Enter a valid refund amount");
      const { error } = await supabase.from("return_orders").insert({
        order_id: orderId,
        reason: reason.trim() || null,
        refund_amount: refundAmount,
        status: "requested",
        items: [],
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setOpen(false);
      setOrderId("");
      setReason("");
      setRefund("");
      void qc.invalidateQueries({ queryKey: ["admin", "returns"] });
      void qc.invalidateQueries({ queryKey: ["admin", "dashboard-stats"] });
      toast.success("Return logged");
    },
    onError: (e: Error) => {
      if (e.message !== "preview") toast.error(e.message);
    },
  });

  const sorted = useMemo(() => returns, [returns]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Return orders</h1>
          <p className="text-muted-foreground">Track refunds and reverse logistics.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button disabled={showDummyData} title={showDummyData ? "Disabled while dummy data is on" : undefined}>
              <Plus className="mr-2 h-4 w-4" />
              New return
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log a return</DialogTitle>
            </DialogHeader>
            <div className="grid gap-3 py-2">
              <div className="grid gap-2">
                <Label>Order</Label>
                <Select value={orderId} onValueChange={setOrderId} disabled={showDummyData}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select order" />
                  </SelectTrigger>
                  <SelectContent>
                    {orderChoices.map((o) => (
                      <SelectItem key={o.id} value={o.id}>
                        {o.order_number} — {o.customer_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reason">Reason</Label>
                <Input id="reason" value={reason} onChange={(e) => setReason(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="refund">Refund amount (৳)</Label>
                <Input id="refund" inputMode="decimal" value={refund} onChange={(e) => setRefund(e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => createReturn.mutate()} disabled={createReturn.isPending}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Returns</CardTitle>
          <CardDescription>Approve or complete returns as inventory is received.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Refund</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Loading…
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && sorted.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No returns yet.
                  </TableCell>
                </TableRow>
              )}
              {sorted.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.orders?.order_number ?? r.order_id}</TableCell>
                  <TableCell>{r.orders?.customer_name ?? "—"}</TableCell>
                  <TableCell>৳{Number(r.refund_amount).toLocaleString()}</TableCell>
                  <TableCell>
                    <Select
                      value={r.status}
                      disabled={showDummyData}
                      onValueChange={(v) => updateReturn.mutate({ id: r.id, status: v as ReturnStatus })}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(["requested", "approved", "rejected", "received", "completed"] as const).map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {format(new Date(r.created_at), "MMM d, yyyy")}
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
