-- Run once if you previously applied the old schema with public.profiles + is_staff().
-- Safe to run after 20260114000000_admin_panel.sql (new version): drops legacy objects only.

drop table if exists public.profiles cascade;

drop function if exists public.is_staff() cascade;

drop policy if exists "products_staff_select" on public.products;
drop policy if exists "products_staff_insert" on public.products;
drop policy if exists "products_staff_update" on public.products;
drop policy if exists "products_staff_delete" on public.products;

drop policy if exists "orders_staff_select" on public.orders;
drop policy if exists "orders_staff_insert" on public.orders;
drop policy if exists "orders_staff_update" on public.orders;
drop policy if exists "orders_staff_delete" on public.orders;

drop policy if exists "returns_staff_select" on public.return_orders;
drop policy if exists "returns_staff_insert" on public.return_orders;
drop policy if exists "returns_staff_update" on public.return_orders;
drop policy if exists "returns_staff_delete" on public.return_orders;

-- Replace with simple authenticated policies (skip if already exist from new base migration)
drop policy if exists "products_authenticated_all" on public.products;
drop policy if exists "orders_authenticated_all" on public.orders;
drop policy if exists "return_orders_authenticated_all" on public.return_orders;

create policy "products_authenticated_all"
  on public.products for all to authenticated using (true) with check (true);

create policy "orders_authenticated_all"
  on public.orders for all to authenticated using (true) with check (true);

create policy "return_orders_authenticated_all"
  on public.return_orders for all to authenticated using (true) with check (true);
