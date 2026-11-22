import type { Meta, StoryObj } from "@storybook/react"; 
import { useState } from "react";
import { Table } from "./Table";
import { cn } from "../../../lib/utils";

const meta: Meta<typeof Table> = {
  title: "GCBA/Layout/Table",
  component: Table,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;

export const MOCK_DATA = [
  { _id: "65a1b2c3d4e5f6a1", nombre: "Julieta Rodriguez", email: "jrodriguez@buenosaires.gob.ar", area: "Modernización", estado: "Activo", fechaAlta: "2023-10-15", prioridad: "Alta" },
  { _id: "65a1b2c3d4e5f6a2", nombre: "Marcos Galperin", email: "mgalperin@buenosaires.gob.ar", area: "Hacienda", estado: "Pendiente", fechaAlta: "2023-11-02", prioridad: "Media" },
  { _id: "65a1b2c3d4e5f6a3", nombre: "Sofía Martínez", email: "smartinez@buenosaires.gob.ar", area: "Salud", estado: "Inactivo", fechaAlta: "2023-09-20", prioridad: "Baja" },
  { _id: "65a1b2c3d4e5f6a4", nombre: "Federico Pinedo", email: "fpinedo@buenosaires.gob.ar", area: "Sistemas", estado: "Activo", fechaAlta: "2024-01-05", prioridad: "Alta" },
  { _id: "65a1b2c3d4e5f6a5", nombre: "Lucía Celasco", email: "lcelasco@buenosaires.gob.ar", area: "Cultura", estado: "Activo", fechaAlta: "2023-12-12", prioridad: "Media" }
];

export const ModernView: StoryObj<typeof Table> = {
  render: () => {
    const [page, setPage] = useState(1);
    const pagination = { totalDocs: 48, page: page, limit: 5 };

    return (
      <div className="bg-muted p-10 min-h-screen">
        <Table data={MOCK_DATA} pagination={pagination} onPageChange={setPage} onRowsChange={() => {}}>
          <Table.Container>
            <Table.Header columns={[
              { headerName: "Usuario", field: "user" },
              { headerName: "Estado", field: "status", align: "center" },
              { headerName: "Acciones", field: "actions", align: "right" }
            ]} />
            <Table.Body renderRow={(row) => (
              <>
                <Table.Cell>
                  <div className="flex flex-col">
                    <span className="font-bold text-foreground">{row.nombre}</span>
                    <span className="text-xs text-muted-foreground font-medium">ID: {row._id}</span>
                  </div>
                </Table.Cell>
                
                <Table.Cell align="center">
                  <div className={cn(
                    "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                    row.estado === "Activo" ? "bg-success/10 text-success border border-success/20" : "bg-muted text-muted-foreground"
                  )}>
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                    {row.estado}
                  </div>
                </Table.Cell>

                <Table.Cell align="right">
                  <button className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors px-3 py-1 border border-transparent hover:border-primary/20 rounded-lg bg-muted group-hover:bg-card">
                    Gestionar
                  </button>
                </Table.Cell>
              </>
            )} />
          </Table.Container>
          <Table.Pagination />
        </Table>
      </div>
    );
  }
};