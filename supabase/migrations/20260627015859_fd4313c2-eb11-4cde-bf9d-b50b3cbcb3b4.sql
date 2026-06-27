
CREATE TABLE public.b2b_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  contact_name text NOT NULL,
  phone text NOT NULL,
  email text,
  product text NOT NULL,
  quantity integer NOT NULL,
  deadline date,
  artwork_path text,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT b2b_company_len CHECK (char_length(company) BETWEEN 1 AND 120),
  CONSTRAINT b2b_contact_len CHECK (char_length(contact_name) BETWEEN 1 AND 120),
  CONSTRAINT b2b_phone_len CHECK (char_length(phone) BETWEEN 3 AND 40),
  CONSTRAINT b2b_product_len CHECK (char_length(product) BETWEEN 1 AND 120),
  CONSTRAINT b2b_qty_range CHECK (quantity BETWEEN 1 AND 1000000),
  CONSTRAINT b2b_message_len CHECK (message IS NULL OR char_length(message) <= 4000)
);

GRANT INSERT ON public.b2b_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.b2b_requests TO authenticated;
GRANT ALL ON public.b2b_requests TO service_role;

ALTER TABLE public.b2b_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a B2B request"
  ON public.b2b_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins and staff can view B2B requests"
  ON public.b2b_requests FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins and staff can update B2B requests"
  ON public.b2b_requests FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can delete B2B requests"
  ON public.b2b_requests FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER b2b_requests_updated_at
  BEFORE UPDATE ON public.b2b_requests
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Storage policies for the b2b-artwork bucket (bucket created via storage tool)
CREATE POLICY "Anyone can upload B2B artwork"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'b2b-artwork');

CREATE POLICY "Admins and staff can read B2B artwork"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'b2b-artwork'
    AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
  );
