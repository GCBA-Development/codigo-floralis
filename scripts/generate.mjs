import fs from 'fs';
import path from 'path';

const GROUPS = ['ui', 'data', 'layout', 'media'];
const [, , rawName, group = 'ui'] = process.argv;

const toKebab = (value) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
const toPascal = (kebab) =>
  kebab.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join('');
const toCamel = (kebab) => {
  const pascal = toPascal(kebab);
  return pascal[0].toLowerCase() + pascal.slice(1);
};

if (!rawName || !GROUPS.includes(group)) {
  console.error(`Uso: npm run gc <nombre> [${GROUPS.join('|')}]  (ej: npm run gc status-pill ui)`);
  process.exit(1);
}

const kebab = toKebab(rawName);
const Name = toPascal(kebab);
const variants = `${toCamel(kebab)}Variants`;
const baseDir = path.join(process.cwd(), 'src', 'components', group, kebab);

if (fs.existsSync(baseDir)) {
  console.error(`El componente ya existe: src/components/${group}/${kebab}`);
  process.exit(1);
}

const groupTitle = group[0].toUpperCase() + group.slice(1);

const files = {
  [`${kebab}.tsx`]: `import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ${variants} } from "./${kebab}.variants";

export interface ${Name}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ${variants}> {}

export function ${Name}({ className, variant, ...props }: ${Name}Props) {
  return <div className={cn(${variants}({ variant }), className)} {...props} />;
}
`,
  [`${kebab}.variants.ts`]: `import { cva } from "class-variance-authority";

export const ${variants} = cva("transition-all duration-300", {
  variants: {
    variant: {
      default: "bg-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
`,
  [`${kebab}.stories.tsx`]: `import type { Meta, StoryObj } from "@storybook/react-vite";
import { ${Name} } from "./${kebab}";

const meta: Meta<typeof ${Name}> = {
  title: "GCBA/${groupTitle}/${Name}",
  component: ${Name},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ${Name}>;

export const Default: Story = {
  args: { children: "${Name}" },
};
`,
  'index.ts': `export * from "./${kebab}";
export * from "./${kebab}.variants";
`,
};

fs.mkdirSync(baseDir, { recursive: true });
for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(baseDir, file), content);
}

console.log(`Componente creado en src/components/${group}/${kebab}`);
console.log(`Falta exportarlo en src/index.ts: export * from "./components/${group}/${kebab}";`);
