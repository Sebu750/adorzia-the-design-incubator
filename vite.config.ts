// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// For Vercel deployment, Nitro auto-detects the platform and builds accordingly.
// The cloudflare plugin is only used during build for Cloudflare Workers deployment.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    // Configure Nitro preset for Vercel
    nitro: {
      preset: process.env.VERCEL ? "vercel" : undefined,
    },
  },
  vite: {
    // Vercel-specific configuration
    ssr: {
      // Ensure proper externalization for Vercel's serverless environment
      noExternal: [],
    },
  },
});
