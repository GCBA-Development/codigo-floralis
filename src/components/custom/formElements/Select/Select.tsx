import { Check, ChevronDown, Circle } from "lucide-react";
import { cn } from "../../../../lib/utils";
import { Command, CommandGroup, CommandItem, CommandList, CommandSeparator } from "../../../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { selectVariants } from "./Select.variants";
import { forwardRef, useState } from "react";

export interface SelectOption {
  label: string;
  key: string | number;
}

export interface SelectProps {
  /** Las opciones del selector */
  options?: { label: string; key: string | number }[];
  /** Valor seleccionado */
  value: any;
  /** Callback de cambio */
  onChange: (value: any) => void;
  /** Etiqueta del campo */
  label?: string;
  /** Tamaño del selector */
  size?: "sm" | "md" | "lg";
  /** Texto placeholder */
  placeholder?: string;
  /** Estilo visual */
  variant?: "default" | "modern" | "glass";
  /** Selección múltiple */
  multiple?: boolean;
  /** Mensaje de error */
  error?: string;
}

 const Select = forwardRef<HTMLButtonElement, SelectProps>((
  { 
    options = [], 
    value, 
    onChange, 
    label, 
    size = "md", 
    variant = "modern", 
    placeholder = "Seleccionar...",
    multiple = false, 
    error
  }, 
  ref
) => {
  const [open, setOpen] = useState(false);

  const currentValues = Array.isArray(value) ? value : [];
  const isAllSelected = options.length > 0 && currentValues.length === options.length;

  const handleSelect = (val: any) => {
    if (multiple) {
      const newValue = currentValues.includes(val)
        ? currentValues.filter((v: any) => v !== val)
        : [...currentValues, val];
      onChange(newValue);
    } else {
      onChange(val);
      setOpen(false);
    }
  };

  const handleSelectAll = () => {
    onChange(isAllSelected ? [] : options.map((o: any) => o.key));
  };

  return (
    <div className="w-full space-y-2 group/field">
      {label && (
        <label className={cn(
          "font-black uppercase tracking-[0.15em] text-muted-foreground ml-1 block transition-colors group-hover/field:text-foreground",
          size === "sm" ? "text-[8px]" : "text-[10px]"
        )}>
          {label}
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={<button
            ref={ref}
            type="button"
            className={cn(selectVariants({ variant, size, hasError: !!error }), open && "ring-4 ring-border/50")}
          />}
        >
            <div className="flex flex-col items-start truncate overflow-hidden">
               <span className={cn(
                 "truncate",
                 !value || (multiple && value.length === 0) ? "text-muted-foreground" : "text-foreground font-bold"
               )}>
                {multiple 
                  ? (currentValues.length > 0 ? `${currentValues.length} seleccionados` : placeholder)
                  : (options.find((opt: any) => opt.key === value)?.label || placeholder)
                }
              </span>
            </div>
            <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform duration-500", open && "rotate-180")} />
        </PopoverTrigger>

        <PopoverContent 
          className="w-(--anchor-width) p-1.5 shadow-(--shadow-float) border-border/60 bg-card/80 backdrop-blur-2xl rounded-2xl animate-in zoom-in-95 duration-200"
          align="start"
          sideOffset={8}
          showBackdrop={false}
        >
          <Command className="bg-transparent">
            <CommandList className="max-h-[300px] scrollbar-thin scrollbar-thumb-border">
              {multiple && (
                <>
                  <CommandItem
                    onSelect={handleSelectAll}
                    className="flex items-center gap-2 px-3 py-3 rounded-xl cursor-pointer hover:bg-muted/80 transition-all group"
                  >
                    <div className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all",
                      isAllSelected ? "bg-primary border-primary text-primary-foreground" : "border-field-border-disabled text-transparent group-hover:border-field-border"
                    )}>
                      <Check size={12} strokeWidth={4} />
                    </div>
                    <span className="text-xs font-black uppercase text-muted-foreground">Seleccionar Todo</span>
                  </CommandItem>
                  <CommandSeparator className="my-1.5 opacity-50" />
                </>
              )}
              
              <CommandGroup>
                {options.map((option: any) => {
                  const isSelected = multiple ? currentValues.includes(option.key) : value === option.key;
                  return (
                    <CommandItem
                      key={option.key}
                      onSelect={() => handleSelect(option.key)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all mb-0.5",
                        isSelected ? "bg-primary text-primary-foreground" : "hover:bg-muted/80 text-muted-foreground"
                      )}
                    >
                      <div className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-lg border-2",
                        isSelected ? "border-transparent bg-card/20" : "border-border"
                      )}>
                        {isSelected && <Check size={12} strokeWidth={4} className="text-primary-foreground" />}
                      </div>
                      <span className={cn("text-sm", isSelected ? "font-bold" : "font-medium")}>
                        {option.label}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      
      {error && (
        <div className="flex items-center gap-1.5 text-destructive font-bold ml-1 animate-in slide-in-from-left-2">
          <Circle size={4} className="fill-current" />
          <p className="text-[10px] uppercase tracking-widest">{error}</p>
        </div>
      )}
    </div>
  );
});

Select.displayName = "Select";
export { Select };