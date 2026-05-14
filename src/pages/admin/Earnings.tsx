import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO, startOfMonth } from "date-fns";
import { supabase } from "@/lib/supabase";
import { useAdminDummyData } from "@/contexts/AdminDummyDataContext";
import { dummyEarningsMonthly, dummyPaidOrdersForEarnings } from "@/lib/admin-dummy";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  revenue: { label: "Revenue (৳)", color: "hsl(var(--primary))" },
};

export default function AdminEarningsPage() {
  const { showDummyData } = useAdminDummyData();
  const { data: livePaid = [], isLoading } = useQuery({
    queryKey: ["admin", "earnings", "paid-orders"],
    enabled: !showDummyData,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("total, created_at")
        .eq("payment_status", "paid")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const paidOrders = showDummyData ? dummyPaidOrdersForEarnings : livePaid;

  const { chartData, total } = useMemo(() => {
    if (showDummyData) {
      const t = dummyEarningsMonthly.reduce((s, row) => s + row.revenue, 0);
      return { chartData: dummyEarningsMonthly, total: t };
    }
    const map = new Map<string, number>();
    let sum = 0;
    for (const row of paidOrders) {
      const m = format(startOfMonth(parseISO(row.created_at)), "yyyy-MM");
      const val = Number(row.total ?? 0);
      sum += val;
      map.set(m, (map.get(m) ?? 0) + val);
    }
    const chartData = [...map.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, revenue]) => ({
        month,
        label: format(parseISO(`${month}-01`), "MMM yyyy"),
        revenue,
      }));
    return { chartData, total: sum };
  }, [showDummyData, paidOrders]);

  const showLoading = !showDummyData && isLoading;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Earnings</h1>
        <p className="text-muted-foreground">Revenue from paid orders, grouped by calendar month.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Lifetime paid revenue</CardTitle>
            <CardDescription>Sum of all orders marked paid.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold tracking-tight">
              {showLoading ? "…" : `৳${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly trend</CardTitle>
          <CardDescription>Based on order creation date for paid orders.</CardDescription>
        </CardHeader>
        <CardContent className="pl-0">
          {chartData.length === 0 && !showLoading && (
            <p className="px-6 text-sm text-muted-foreground">No paid orders yet — chart will appear here.</p>
          )}
          {chartData.length > 0 && (
            <ChartContainer config={chartConfig} className="aspect-auto h-[320px] w-full">
              <BarChart data={chartData} margin={{ left: 12, right: 12, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} className="text-xs" />
                <YAxis tickLine={false} axisLine={false} className="text-xs" tickFormatter={(v) => `৳${v}`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} name="revenue" />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
