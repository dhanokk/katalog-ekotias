import { createClient } from "@supabase/supabase-js";

// Fetch dengan otomatis retry jika terjadi gangguan jaringan sementara (cold start / timeout)
async function fetchDenganRetry(url, options, retries = 3, delay = 500) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fetch(url, options);
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
    }
  }
}

export function createServerClient() {
  const rawUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!rawUrl || !supabaseSecretKey) {
    throw new Error(
      "SUPABASE_URL atau SUPABASE_SECRET_KEY belum diisi di environment variable."
    );
  }

  // Normalisasi URL jika memiliki akhiran /rest/v1 atau trailing slash
  const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");

  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      fetch: fetchDenganRetry,
    },
  });
}

export { createServerClient as createClient };
export default createServerClient;
