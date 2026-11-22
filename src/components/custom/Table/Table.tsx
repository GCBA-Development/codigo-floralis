import * as React from "react";
import { cn } from "../../../lib/utils";

// --- TIPADO ROBUSTO ---
interface TableContextType {
  data: any[];
  pagination?: { totalDocs: number; page: number; limit: number };
  onPageChange: (page: number) => void;
  onRowsChange: (limit: number) => void;
}

const TableContext = React.createContext<TableContextType | null>(null);

const useTableContext = () => {
  const context = React.useContext(TableContext);
  if (!context) throw new Error("Table components must be used within <Table />");
  return context;
};

// --- COMPONENTE PRINCIPAL ---
export const Table = ({ children, data, pagination, onPageChange, onRowsChange }: any) => {
  return (
    <TableContext.Provider value={{ data, pagination, onPageChange, onRowsChange }}>
      <div className="w-full flex flex-col gap-1 animate-in fade-in duration-500">
        {children}
      </div>
    </TableContext.Provider>
  );
};

// --- CONTENEDOR CON ESTILO MODERN ---
Table.Container = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn(
    "relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/50 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
    className
  )}>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">{children}</table>
    </div>
  </div>
);

// --- HEADER CON GRADIENTE SUTIL ---
Table.Header = ({ columns }: { columns: any[] }) => (
  <thead className="bg-slate-900 text-white border-b border-slate-800">
    <tr>
      {columns.map((col, i) => (
        <th key={i} className={cn(
          "px-6 py-5 text-[11px] font-black uppercase tracking-[0.15em] opacity-90",
          col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left"
        )}>
          {col.headerName}
        </th>
      ))}
    </tr>
  </thead>
);

// --- CELDA PERSONALIZADA (Atómica) ---
Table.Cell = ({ children, className, align = "left" }: any) => (
  <td className={cn(
    "px-6 py-4 text-sm transition-all duration-300",
    align === "center" && "text-center",
    align === "right" && "text-right",
    className
  )}>
    {children}
  </td>
);

// --- CUERPO CON HOVER DINÁMICO ---
Table.Body = ({ renderRow }: { renderRow: (row: any, index: number) => React.ReactNode }) => {
  const { data } = useTableContext();

  return (
    <tbody className="divide-y divide-slate-100/80">
      {data.length > 0 ? (
        data.map((row, index) => (
          <tr 
            key={row._id ?? index} 
            className="group hover:bg-primary/[0.04] transition-colors duration-200"
          >
            {renderRow(row, index)}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={100} className="p-20 text-center">
            <div className="flex flex-col items-center gap-2 opacity-40">
              <span className="text-3xl">📂</span>
              <p className="text-sm font-bold tracking-tight">No hay registros disponibles</p>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );
};

// --- PAGINACIÓN "FLOATING" STYLE ---
Table.Pagination = () => {
  const { pagination, onPageChange, onRowsChange } = useTableContext();
  if (!pagination) return null;

  const from = (pagination.page - 1) * pagination.limit + 1;
  const to = Math.min(pagination.page * pagination.limit, pagination.totalDocs);

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-slate-50/50 rounded-xl border border-slate-200/50 mt-2">
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Mostrar</span>
        <select 
          value={pagination.limit}
          onChange={(e) => onRowsChange(Number(e.target.value))}
          className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold shadow-sm focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
        >
          {[5, 10, 25, 50].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="flex items-center gap-8">
        <span className="text-[12px] font-medium text-slate-500 italic">
          Mostrando <b className="text-slate-900">{from}-{to}</b> de {pagination.totalDocs}
        </span>
        
        <div className="flex gap-1">
          <PaginationBtn disabled={pagination.page <= 1} onClick={() => onPageChange(pagination.page - 1)} icon="←" />
          <PaginationBtn disabled={to >= pagination.totalDocs} onClick={() => onPageChange(pagination.page + 1)} icon="→" />
        </div>
      </div>
    </div>
  );
};

// Componente interno para botones de paginación
const PaginationBtn = ({ disabled, onClick, icon }: any) => (
  <button 
    disabled={disabled}
    onClick={onClick}
    className="h-9 w-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-current transition-all duration-300 font-bold"
  >
    {icon}
  </button>
);