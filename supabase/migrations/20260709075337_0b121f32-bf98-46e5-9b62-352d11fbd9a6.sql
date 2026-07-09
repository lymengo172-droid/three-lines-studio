DROP POLICY IF EXISTS "Anyone can submit a B2B request" ON public.b2b_requests;

CREATE POLICY "Anyone can submit a B2B request"
ON public.b2b_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(company)) BETWEEN 1 AND 200
  AND length(btrim(contact_name)) BETWEEN 1 AND 200
  AND length(btrim(phone)) BETWEEN 5 AND 40
  AND length(btrim(product)) BETWEEN 1 AND 200
  AND quantity >= 1
  AND quantity <= 1000000
  AND (email IS NULL OR length(btrim(email)) <= 200)
  AND (message IS NULL OR length(message) <= 5000)
  AND (artwork_path IS NULL OR length(artwork_path) <= 500)
);