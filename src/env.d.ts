/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly PUBLIC_PREVIEW: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace astroHTML.JSX {

  // Add a CSS custom property to the style object
  interface CSSProperties {
    [key: `--${string}`]: string | number | null | undefined;
  }
}
