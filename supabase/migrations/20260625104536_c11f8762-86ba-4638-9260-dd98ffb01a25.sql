
-- ===================== ROLES =====================
CREATE TYPE public.app_role AS ENUM ('admin', 'staff', 'customer');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users see own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ===================== UPDATED_AT HELPER =====================
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

-- ===================== PRODUCTS =====================
CREATE TABLE public.products (
  id text PRIMARY KEY,
  line text NOT NULL CHECK (line IN ('acrylic','metal','merch')),
  name text NOT NULL,
  name_km text,
  blurb text,
  base_price numeric(10,2) NOT NULL DEFAULT 0,
  sizes jsonb NOT NULL DEFAULT '[]'::jsonb,
  options jsonb NOT NULL DEFAULT '[]'::jsonb,
  bulk_note text,
  mockup_url text,
  print_area jsonb,
  default_category text,
  sort_order int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads active products" ON public.products
  FOR SELECT USING (active OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins write products" ON public.products
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER products_touch BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ===================== STYLES (Acrylic gallery) =====================
CREATE TABLE public.styles (
  id text PRIMARY KEY,
  name text NOT NULL,
  name_km text,
  category text NOT NULL,
  image_url text NOT NULL,
  supported_sizes text[] NOT NULL DEFAULT ARRAY['a4','a5']::text[],
  sort_order int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.styles TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.styles TO authenticated;
GRANT ALL ON public.styles TO service_role;
ALTER TABLE public.styles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads active styles" ON public.styles
  FOR SELECT USING (active OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins write styles" ON public.styles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER styles_touch BEFORE UPDATE ON public.styles
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ===================== ORDERS =====================
CREATE TYPE public.order_status AS ENUM ('new','confirmed','in_production','ready','delivered','cancelled');
CREATE TYPE public.payment_method AS ENUM ('khqr','cod','bank');

CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number bigserial UNIQUE NOT NULL,
  customer_name text NOT NULL,
  phone text NOT NULL,
  telegram_handle text,
  line_items jsonb NOT NULL,
  subtotal numeric(10,2) NOT NULL,
  payment_method public.payment_method NOT NULL,
  status public.order_status NOT NULL DEFAULT 'new',
  notes text,
  preview_url text,
  telegram_sent boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.orders TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.orders TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.orders_order_number_seq TO anon, authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
-- Anyone can create an order (guest checkout)
CREATE POLICY "Anyone creates orders" ON public.orders
  FOR INSERT WITH CHECK (true);
-- Only admins can read/update/delete
CREATE POLICY "Admins read orders" ON public.orders
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff'));
CREATE POLICY "Admins update orders" ON public.orders
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'staff'));
CREATE POLICY "Admins delete orders" ON public.orders
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER orders_touch BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE INDEX orders_created_at_idx ON public.orders (created_at DESC);
CREATE INDEX orders_status_idx ON public.orders (status);
