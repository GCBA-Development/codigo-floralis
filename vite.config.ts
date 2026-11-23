/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import dts from 'vite-plugin-dts';
import preserveDirectives from 'rollup-preserve-directives';
import { readFileSync } from 'node:fs';
import pkg from './package.json' with { type: 'json' };

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

const externalPackages = [
  ...new Set([
    'react',
    'react-dom',
    'react/jsx-runtime',
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
  ]),
];

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [tailwindcss(),react(),preserveDirectives(),dts({ tsconfigPath: "./tsconfig.app.json", include: ["src"], exclude: ["src/**/*.stories.*", "src/stories/**", "src/styles.ts"], rollupTypes: true }),{
    // Publica tokens.css sin compilar: las apps con Tailwind lo procesan una sola vez.
    name: 'emit-tokens-css',
    apply: 'build',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'tokens.css', source: readFileSync(path.resolve(dirname, 'src/tokens.css'), 'utf8') });
    },
  }],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    projects: [{
      extends: true,
      test: { name: 'unit', environment: 'node', include: ['src/**/*.test.ts'] }
    }, {
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }]
  },build: {
    copyPublicDir: false,
    lib: {
      entry: {
        index: path.resolve(dirname, "src/index.ts"),
        styles: path.resolve(dirname, "src/styles.ts"),
        charts: path.resolve(dirname, "src/charts.ts"),
        theme: path.resolve(dirname, "src/theme.ts"),
      },
      name: "CodigoFloralis",
      formats: ["es"],
      fileName: "index",
      cssFileName: "styles",
    },
    rollupOptions: {
      external: (id) => externalPackages.some((name) => id === name || id.startsWith(name + "/")),
      // Un archivo por módulo: lo que no se importa no entra al bundle del consumidor.
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
      },
    },
  },
});
