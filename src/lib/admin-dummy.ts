/**
 * Temporary placeholder rows for admin UI previews.
 * Toggle from Settings → “Show dummy data” (see AdminDummyDataContext).
 */

import type { Database } from "@/integrations/supabase/types";

export type OrderRow = Database["public"]["Tables"]["orders"]["Row"];
export type ProductRow = Database["public"]["Tables"]["products"]["Row"];
export type ReturnRow = Database["public"]["Tables"]["return_orders"]["Row"];

export type ReturnWithOrder = ReturnRow & {
  orders: { order_number: string; customer_name: string } | null;
};

const iso = (d: string) => `${d}T12:00:00.000Z`;

export const dummyOrders: OrderRow[] = [
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1",
    order_number: "SFC-DEMO-001",
    customer_name: "রহিমা বেগম",
    customer_phone: "01711223344",
    customer_email: "rahima@example.com",
    status: "delivered",
    payment_status: "paid",
    total: 980,
    items: [],
    shipping_address: null,
    notes: null,
    created_at: iso("2026-05-01"),
    updated_at: iso("2026-05-02"),
  },
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2",
    order_number: "SFC-DEMO-002",
    customer_name: "Karim Hassan",
    customer_phone: "01819998877",
    customer_email: "karim@example.com",
    status: "shipped",
    payment_status: "paid",
    total: 1850,
    items: [],
    shipping_address: null,
    notes: "Fragile",
    created_at: iso("2026-05-08"),
    updated_at: iso("2026-05-09"),
  },
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3",
    order_number: "SFC-DEMO-003",
    customer_name: "Fatima Khatun",
    customer_phone: "01915550011",
    customer_email: null,
    status: "processing",
    payment_status: "partial",
    total: 750,
    items: [],
    shipping_address: null,
    notes: null,
    created_at: iso("2026-05-10"),
    updated_at: iso("2026-05-10"),
  },
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4",
    order_number: "SFC-DEMO-004",
    customer_name: "Md. Salam",
    customer_phone: "01618109505",
    customer_email: "salam@example.com",
    status: "confirmed",
    payment_status: "unpaid",
    total: 1200,
    items: [],
    shipping_address: null,
    notes: null,
    created_at: iso("2026-05-11"),
    updated_at: iso("2026-05-11"),
  },
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa5",
    order_number: "SFC-DEMO-005",
    customer_name: "Nusrat Jahan",
    customer_phone: "01322334455",
    customer_email: "nusrat@example.com",
    status: "pending",
    payment_status: "unpaid",
    total: 980,
    items: [],
    shipping_address: null,
    notes: null,
    created_at: iso("2026-05-12"),
    updated_at: iso("2026-05-12"),
  },
];

export const dummyProducts: ProductRow[] = [
  {
    id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1",
    sku: "SC-OIL-500",
    name: "ShifaCare Pain Relief Oil 50ml",
    description: "Demo SKU",
    price: 980,
    stock: 3,
    is_active: true,
    created_at: iso("2026-01-01"),
    updated_at: iso("2026-05-01"),
  },
  {
    id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2",
    sku: "SC-BALM-30",
    name: "ShifaCare Pain Relief Balm",
    description: "Demo SKU",
    price: 850,
    stock: 48,
    is_active: true,
    created_at: iso("2026-01-02"),
    updated_at: iso("2026-04-15"),
  },
  {
    id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb3",
    sku: "SC-MASS-100",
    name: "Body Massage Oil 100ml",
    description: "Demo SKU",
    price: 750,
    stock: 120,
    is_active: true,
    created_at: iso("2026-02-10"),
    updated_at: iso("2026-05-05"),
  },
  {
    id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb4",
    sku: "SC-KIT-DUO",
    name: "Oil + Balm Combo Pack",
    description: "Demo inactive",
    price: 1650,
    stock: 0,
    is_active: false,
    created_at: iso("2026-03-01"),
    updated_at: iso("2026-04-20"),
  },
];

export const dummyReturns: ReturnWithOrder[] = [
  {
    id: "cccccccc-cccc-cccc-cccc-ccccccccccc1",
    order_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1",
    reason: "Customer changed mind before dispatch",
    status: "requested",
    refund_amount: 980,
    items: [],
    notes: null,
    created_at: iso("2026-05-12"),
    updated_at: iso("2026-05-12"),
    orders: { order_number: "SFC-DEMO-001", customer_name: "রহিমা বেগম" },
  },
  {
    id: "cccccccc-cccc-cccc-cccc-ccccccccccc2",
    order_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2",
    reason: "Damaged outer box",
    status: "approved",
    refund_amount: 0,
    items: [],
    notes: "Replacement sent",
    created_at: iso("2026-05-09"),
    updated_at: iso("2026-05-10"),
    orders: { order_number: "SFC-DEMO-002", customer_name: "Karim Hassan" },
  },
  {
    id: "cccccccc-cccc-cccc-cccc-ccccccccccc3",
    order_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3",
    reason: "Wrong item shipped",
    status: "completed",
    refund_amount: 375,
    items: [],
    notes: null,
    created_at: iso("2026-05-06"),
    updated_at: iso("2026-05-08"),
    orders: { order_number: "SFC-DEMO-003", customer_name: "Fatima Khatun" },
  },
];

export const dummyOrderChoices = dummyOrders.map((o) => ({
  id: o.id,
  order_number: o.order_number,
  customer_name: o.customer_name,
}));

export const dummyDashboardStats = {
  orders: dummyOrders.length,
  returns: dummyReturns.length,
  products: dummyProducts.length,
  paidRevenue: dummyOrders.filter((o) => o.payment_status === "paid").reduce((s, o) => s + Number(o.total), 0),
  openReturns: dummyReturns.filter((r) => r.status === "requested").length,
};

/** Last 7 days — order count (preview) */
export const dummyChartOrdersDaily = [
  { label: "Mon", orders: 8 },
  { label: "Tue", orders: 12 },
  { label: "Wed", orders: 6 },
  { label: "Thu", orders: 15 },
  { label: "Fri", orders: 22 },
  { label: "Sat", orders: 18 },
  { label: "Sun", orders: 11 },
];

/** Funnel-style preview */
export const dummyChartCategoryMix = [
  { name: "Oil", value: 42, fill: "hsl(145, 63%, 42%)" },
  { name: "Balm", value: 28, fill: "hsl(160, 50%, 35%)" },
  { name: "Combo", value: 18, fill: "hsl(38, 92%, 48%)" },
  { name: "Other", value: 12, fill: "hsl(220, 14%, 46%)" },
];

/** Paid revenue by month (preview, mirrors earnings page) */
export const dummyEarningsMonthly = [
  { month: "2026-01", label: "Jan 2026", revenue: 124_000 },
  { month: "2026-02", label: "Feb 2026", revenue: 158_000 },
  { month: "2026-03", label: "Mar 2026", revenue: 142_500 },
  { month: "2026-04", label: "Apr 2026", revenue: 201_000 },
  { month: "2026-05", label: "May 2026", revenue: 89_400 },
];

export const dummyPaidOrdersForEarnings = dummyEarningsMonthly.flatMap((m) => [
  { total: m.revenue / 4, created_at: `${m.month}-05T10:00:00Z` },
  { total: m.revenue / 4, created_at: `${m.month}-12T10:00:00Z` },
  { total: m.revenue / 4, created_at: `${m.month}-20T10:00:00Z` },
  { total: m.revenue / 4, created_at: `${m.month}-28T10:00:00Z` },
]);
