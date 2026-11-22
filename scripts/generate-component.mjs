import fs from 'fs';
import path from 'path';

const componentName = process.argv[2];

if (!componentName) {
  console.error("❌ Por favor, indica el nombre del componente (ej: MyButton)");
  process.exit(1);
}

const baseDir = path.join(process.cwd(), 'src', 'components', 'custom', componentName);

// Templates de los archivos
const templates = {
  component: `import * as React from "react";
import { cn } from "@/lib/utils";
import { ${componentName.toLowerCase()}Variants } from "./${componentName}.variants";
import { VariantProps } from "class-variance-authority";

export interface ${componentName}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ${componentName.toLowerCase()}Variants> {}

const ${componentName} = React.forwardRef<HTMLDivElement, ${componentName}Props>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(${componentName.toLowerCase()}Variants({ variant }), className)}
        {...props}
      >
        ${componentName} Component
      </div>
    );
  }
);

${componentName}.displayName = "${componentName}";
export { ${componentName} };`,

  variants: `import { cva } from "class-variance-authority";

export const ${componentName.toLowerCase()}Variants = cva(
  "transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        modern: "rounded-xl border border-slate-200 bg-white/50 backdrop-blur-md shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);`,

  stories: `import type { Meta, StoryObj } from "@storybook/react";
import { ${componentName} } from "./${componentName}";

const meta: Meta<typeof ${componentName}> = {
  title: "GCBA/Custom/${componentName}",
  component: ${componentName},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};

export const Modern: Story = {
  args: {
    variant: "modern",
  },
};`
};

// Crear carpeta y archivos
try {
  if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

  fs.writeFileSync(path.join(baseDir, \`\${componentName}.tsx\`), templates.component);
  fs.writeFileSync(path.join(baseDir, \`\${componentName}.variants.ts\`), templates.variants);
  fs.writeFileSync(path.join(baseDir, \`\${componentName}.stories.tsx\`), templates.stories);

  console.log(\`✅ Componente \${componentName} creado con éxito en \${baseDir}\`);
} catch (error) {
  console.error("❌ Error creando los archivos:", error);
}