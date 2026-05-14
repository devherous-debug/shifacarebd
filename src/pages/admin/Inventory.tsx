import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/integrations/supabase/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAdminDummyData } from "@/contexts/AdminDummyDataContext";
import { dummyProducts } from "@/lib/admin-dummy";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];

const LOW = 5;

export default function AdminInventoryPage() {
  const { showDummyData } = useAdminDummyData();
  const { data: liveProducts = [], isLoading } = useQuery({
    queryKey: ["admin", "products"],
    enabled: !showDummyData,
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("stock", { ascending: true });
      if (error) throw error;
      return data as ProductRow[];
    },
  });

  const products = showDummyData
    ? [...dummyProducts].sort((a, b) => a.stock - b.stock)
    : liveProducts;

  const isTableLoading = !showDummyData && isLoading;

  const low = useMemo(() => products.filter((p) => p.is_active && p.stock <= LOW), [products]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Inventory</h1>
        <p className="text-muted-foreground">Stock levels sorted by quantity on hand. Low-stock threshold: {LOW}.</p>
      </div>

      {low.length > 0 && (
        <Card className="border-destructive/40 bg-destructive/5">
          <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-base">Low stock</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {low.length} active SKU{low.length === 1 ? "" : "s"} at or below {LOW} units. Replenish or pause sales in
            Products.
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Stock by SKU</CardTitle>
          <CardDescription>Active products with healthy stock appear after critical rows.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isTableLoading && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    Loading…
                  </TableCell>
                </TableRow>
              )}
              {!isTableLoading && products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No products in catalog.
                  </TableCell>
                </TableRow>
              )}
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-sm">{p.sku}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.stock}</TableCell>
                  <TableCell>
                    {!p.is_active && <Badge variant="secondary">Inactive</Badge>}
                    {p.is_active && p.stock <= LOW && <Badge variant="destructive">Low</Badge>}
                    {p.is_active && p.stock > LOW && <Badge variant="outline">OK</Badge>}
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
