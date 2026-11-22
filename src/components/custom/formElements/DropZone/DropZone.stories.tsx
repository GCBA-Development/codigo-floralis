import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import  { Dropzone } from "./DropZone";

const meta: Meta<typeof Dropzone> = {
  title: "GCBA/Form Elements/Dropzone",
  component: Dropzone,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "modern"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropzone>;

// Función auxiliar para simular la subida a un servidor
const mockUpload = async (body: FormData, filename: string): Promise<{ ruta: string }> => {
  console.log(`Simulando subida de archivo: ${filename}`, body.get("file"));
  
  // Simulamos un retraso de red de 1.5 segundos
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Retornamos una imagen de placeholder según el timestamp
  return {
    ruta: `https://picsum.photos/seed/${filename}/400/400`,
  };
};

export const Completo: Story = {
  render: (args) => {
    // Manejamos el estado localmente para que la historia sea interactiva
    const [images, setImages] = useState<string[]>([]);

    return (
      <div className="max-w-2xl mx-auto p-8 border rounded-3xl bg-slate-50/30">
        <Dropzone
          {...args}
          value={images}
          onChange={(newVal) => setImages(newVal)}
          onUpload={mockUpload}
        />
        
        {/* Debug del estado */}
        <div className="mt-8 p-4 rounded-2xl bg-slate-900 text-slate-400 font-mono text-[10px] overflow-auto shadow-2xl">
          <p className="text-slate-500 mb-2 border-b border-slate-800 pb-1 font-bold uppercase tracking-widest">
            Form state:
          </p>
          {JSON.stringify({ galeria: images }, null, 2)}
        </div>
      </div>
    );
  },
  args: {
    label: "Carga de Documentación Visual",
    maxFiles: 4,
    maxSize: 10000000, // 10MB
    variant: "modern",
    size: "md",
  },
};

export const SoloUnaFoto: Story = {
  render: (args) => {
    const [image, setImage] = useState<string[]>([]);
    return (
      <div className="max-w-sm mx-auto p-4">
        <Dropzone
          {...args}
          value={image}
          onChange={setImage}
          onUpload={mockUpload}
        />
      </div>
    );
  },
  args: {
    label: "Foto de Perfil",
    maxFiles: 1,
    variant: "default",
    size: "sm",
  },
};

export const ConError: Story = {
  args: {
    label: "Campo con Error",
    error: "La imagen es obligatoria para continuar",
    value: [],
    variant: "default",
    size: "md",
  },
};