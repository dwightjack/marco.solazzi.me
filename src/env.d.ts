/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly PUBLIC_TEST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
