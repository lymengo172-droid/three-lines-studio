
-- 1) Allow anyone (guest checkout) to upload preview images into order-previews bucket
CREATE POLICY "Anyone can upload order preview images"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'order-previews');

-- 2) Admins & staff can read preview images
CREATE POLICY "Admins and staff can read order previews"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'order-previews'
  AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
);

-- 3) Admins can delete preview images (housekeeping)
CREATE POLICY "Admins can delete order previews"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'order-previews'
  AND public.has_role(auth.uid(), 'admin')
);
