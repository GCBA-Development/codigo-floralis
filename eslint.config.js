// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

const RAW_COLOR_PATTERN =
  '/(--fl-|(bg|text|border|ring|from|via|to|fill|stroke|outline|divide|shadow|decoration|accent|caret|placeholder)-(white|(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|navy)-[0-9]))/'

export default defineConfig([
  globalIgnores(['dist', 'storybook-static']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    // Los componentes consumen solo tokens semánticos (bg-primary...), nunca la paleta cruda ni colores fijos.
    files: ['src/components/**/*.{ts,tsx}'],
    ignores: ['**/*.stories.tsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        ...[
          ['Literal', 'value'],
          ['TemplateElement', 'value.raw'],
        ].map(([node, field]) => ({
          selector: `${node}[${field}=${RAW_COLOR_PATTERN}]`,
          message: 'Usá tokens semánticos (bg-primary, text-muted-foreground...), no la paleta cruda ni colores fijos. Ver docs/adr/0003-tokens-de-diseno-en-dos-niveles.md.',
        })),
      ],
    },
  },
])
