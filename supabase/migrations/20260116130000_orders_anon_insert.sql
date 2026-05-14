-- Storefront: allow guests (anon role) to INSERT orders only — no read/update/delete.
--
-- Prerequisite: public.orders must exist. Run first:
--   supabase/migrations/20260114000000_admin_panel.sql
-- Or use the all-in-one script: supabase/shop_bootstrap.sql

grant insert on public.orders to anon;

drop policy if exists "orders_anon_insert_storefront" on public.orders;
create policy "orders_anon_insert_storefront"
  on public.orders
  for insert
  to anon
  with check (true);
