/// <reference types="@builder.io/qwik" />

interface ImportMetaEnv {
  readonly PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
  // Add other environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
