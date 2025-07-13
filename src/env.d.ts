/// <reference types="@builder.io/qwik" />

// SVG module declaration
declare module '*.svg' {
  const content: string;
  export default content;
}

// Environment variables type
declare global {
  interface ImportMetaEnv {
    readonly PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
    readonly PUBLIC_SUPABASE_URL: string;
    readonly PUBLIC_SUPABASE_ANON_KEY: string;
    // Add other environment variables as needed
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
