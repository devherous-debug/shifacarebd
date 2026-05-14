-- ShifaCare admin panel: catalog, orders, returns.
-- Any user signed in with Supabase Auth (session) can access these tables via RLS.
-- Disable public sign-up in Auth if you only want manually created accounts.
--
-- If you already created the OLD schema (with public.profiles), do not re-run this file;
-- run `20260115120000_remove_profiles_if_present.sql` instead to migrate.

create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Products
-- ---------------------------------------------------------------------------
create table public.products (
  id uuid primary key default gen_random_uuid(),
  sku text not null unique,
  name text not null,
  description text,
  price numeric(12, 2) not null default 0,
  stock integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Orders
-- ---------------------------------------------------------------------------
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  status text not null default 'pending' check (
    status in ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')
  ),
  payment_status text not null default 'unpaid' check (
    payment_status in ('unpaid', 'paid', 'refunded', 'partial')
  ),
  total numeric(12, 2) not null default 0,
  items jsonb not null default '[]'::jsonb,
  shipping_address jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger orders_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

create index orders_created_at_idx on public.orders (created_at desc);
create index orders_status_idx on public.orders (status);

-- ---------------------------------------------------------------------------
-- Return orders
-- ---------------------------------------------------------------------------
create table public.return_orders (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete restrict,
  reason text,
  status text not null default 'requested' check (
    status in ('requested', 'approved', 'rejected', 'received', 'completed')
  ),
  refund_amount numeric(12, 2) not null default 0,
  items jsonb not null default '[]'::jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger return_orders_updated_at
before update on public.return_orders
for each row execute function public.set_updated_at();

create index return_orders_order_id_idx on public.return_orders (order_id);

-- ---------------------------------------------------------------------------
-- Row level security: any authenticated session (admin login) has full access
-- ---------------------------------------------------------------------------
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.return_orders enable row level security;

create policy "products_authenticated_all"
  on public.products for all to authenticated using (true) with check (true);

create policy "orders_authenticated_all"
  on public.orders for all to authenticated using (true) with check (true);

create policy "return_orders_authenticated_all"
  on public.return_orders for all to authenticated using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Grants
-- ---------------------------------------------------------------------------
grant usage on schema public to authenticated;
grant select, insert, update, delete on public.products to authenticated;
grant select, insert, update, delete on public.orders to authenticated;
grant select, insert, update, delete on public.return_orders to authenticated;
