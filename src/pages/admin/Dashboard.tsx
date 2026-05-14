import { useQuery } from "@tanstack/react-query";
import { Package, RotateCcw, ShoppingCart, Wallet } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Pie, PieChart, Cell, XAxis, YAxis } from "recharts";
import { supabase } from "@/lib/supabase";
import { useAdminDummyData } from "@/contexts/AdminDummyDataContext";
import {
  dummyChartCategoryMix,
  dummyChartOrdersDaily,
  dummyDashboardStats,
} from "@/lib/admin-dummy";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const ordersChartConfig = {
  orders: { label: "Orders", color: "hsl(var(--primary))" },
};

const pieChartConfig = Object.fromEntries(
  dummyChartCategoryMix.map((d) => [d.name, { label: d.name, color: d.fill }]),
) as Record<string, { label: string; color: string }>;

export default function AdminDashboardPage() {
  const { showDummyData } = useAdminDummyData();

  const { data: liveStats, isLoading } = useQuery({
    queryKey: ["admin", "dashboard-stats"],
    enabled: !showDummyData,
    queryFn: async () => {
      const [orderCount, returnCount, productCount, paidRows, pendingReturns] = await Promise.all([
        supabase.from("orders").select("id", { count: "exact", head: true }),
        supabase.from("return_orders").select("id", { count: "exact", head: true }),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("total").eq("payment_status", "paid"),
        supabase.from("return_orders").select("id", { count: "exact", head: true }).eq("status", "requested"),
      ]);

      const paidTotal =
        paidRows.data?.reduce((sum, row) => sum + Number(row.total ?? 0), 0) ?? 0;

      return {
        orders: orderCount.count ?? 0,
        returns: returnCount.count ?? 0,
        products: productCount.count ?? 0,
        paidRevenue: paidTotal,
        openReturns: pendingReturns.count ?? 0,
      };
    },
  });

  const data = showDummyData ? dummyDashboardStats : liveStats;

  const stats = [
    { title: "Total orders", value: data?.orders ?? "—", icon: ShoppingCart },
    { title: "Return requests", value: data?.returns ?? "—", icon: RotateCcw },
    { title: "SKU count", value: data?.products ?? "—", icon: Package },
    { title: "Paid revenue (৳)", value: data ? data.paidRevenue.toLocaleString() : "—", icon: Wallet },
  ];

  const showLoading = !showDummyData && isLoading;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your store operations.</p>
      </div>

      {data && data.openReturns > 0 && (
        <Card className="border-amber-200 bg-amber-50/80 dark:bg-amber-950/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Attention</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            You have {data.openReturns} return request{data.openReturns === 1 ? "" : "s"} awaiting review.
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{s.title}</CardTitle>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{showLoading ? "…" : s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showDummyData && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Orders this week</CardTitle>
              <CardDescription>Sample daily volume (placeholder).</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={ordersChartConfig} className="aspect-auto h-[280px] w-full">
                <AreaChart data={dummyChartOrdersDaily} margin={{ left: 8, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="fillOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-orders)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--color-orders)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} className="text-xs" />
                  <YAxis tickLine={false} axisLine={false} className="text-xs" width={32} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="orders"
                    stroke="var(--color-orders)"
                    fill="url(#fillOrders)"
                    strokeWidth={2}
                    name="orders"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category mix</CardTitle>
              <CardDescription>Sample share by product type (placeholder).</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ChartContainer config={pieChartConfig} className="aspect-square h-[280px] max-w-[320px]">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie data={dummyChartCategoryMix} dataKey="value" nameKey="name" innerRadius={52} strokeWidth={2}>
                    {dummyChartCategoryMix.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} stroke="hsl(var(--background))" />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
