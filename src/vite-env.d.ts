/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  /** Preferred; same value as the anon key in older Supabase docs. */
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string;
  /** Fallback if you still use the old env name. */
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
