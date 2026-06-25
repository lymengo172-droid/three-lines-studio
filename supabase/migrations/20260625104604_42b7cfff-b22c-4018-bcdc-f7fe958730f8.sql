
-- Restrict SECURITY DEFINER function execution
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.touch_updated_at() TO service_role;

-- Replace permissive orders insert with a validated version
DROP POLICY IF EXISTS "Anyone creates orders" ON public.orders;
CREATE POLICY "Anyone creates valid orders" ON public.orders
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(btrim(customer_name)) BETWEEN 1 AND 120
    AND length(btrim(phone)) BETWEEN 5 AND 40
    AND subtotal >= 0
    AND jsonb_typeof(line_items) = 'array'
    AND jsonb_array_length(line_items) > 0
    AND jsonb_array_length(line_items) <= 200
  );
