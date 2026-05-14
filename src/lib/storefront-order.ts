import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { Json } from "@/integrations/supabase/types";

/** Offer prices aligned with OrderSection / ProductsSection copy */
const PRODUCT_META: Record<
  string,
  { nameBn: string; unitPrice: number; /** per pair of units, oil only */ pairDiscount?: number }
> = {
  oil: { nameBn: "পেইন রিলিফ অয়েল", unitPrice: 980, pairDiscount: 160 },
  balm: { nameBn: "পেইন রিলিফ বাম", unitPrice: 850 },
  massage: { nameBn: "বডি ম্যাসাজ অয়েল", unitPrice: 750 },
};

export function computeOrderTotal(productKey: string, quantity: number): number {
  const meta = PRODUCT_META[productKey] ?? PRODUCT_META.oil;
  const qty = Math.min(99, Math.max(1, quantity));
  let total = meta.unitPrice * qty;
  if (meta.pairDiscount && qty >= 2) {
    total -= meta.pairDiscount * Math.floor(qty / 2);
  }
  return Math.round(total * 100) / 100;
}

export function storefrontOrderNumber(): string {
  return `SFC-WEB-${Date.now().toString(36).toUpperCase()}`;
}

export type StorefrontOrderPayload = {
  name: string;
  phone: string;
  address: string;
  product: string;
  quantity: string;
};

export async function submitStorefrontOrder(form: StorefrontOrderPayload): Promise<void> {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured.");
  }

  const productKey = form.product in PRODUCT_META ? form.product : "oil";
  const qty = parseInt(form.quantity, 10) || 1;
  const meta = PRODUCT_META[productKey];
  const total = computeOrderTotal(productKey, qty);

  const items: Json = [
    {
      slug: productKey,
      name_bn: meta.nameBn,
      quantity: qty,
      unit_price: meta.unitPrice,
    },
  ];

  const { error } = await supabase.from("orders").insert({
    order_number: storefrontOrderNumber(),
    customer_name: form.name.trim(),
    customer_phone: form.phone.trim(),
    customer_email: null,
    status: "pending",
    payment_status: "unpaid",
    total,
    items,
    shipping_address: { line1: form.address.trim(), source: "storefront" } as Json,
    notes: `Storefront order — ${meta.nameBn} × ${qty}`,
  });

  if (error) {
    throw new Error(error.message);
  }
}
