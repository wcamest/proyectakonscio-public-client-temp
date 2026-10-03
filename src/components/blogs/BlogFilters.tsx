import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import type { PublicBlogPostSort } from "@/types/blogs";

export type BlogFilterState = Readonly<{
  search: string;
  sort: PublicBlogPostSort;
  perPage: number;
}>;

type Props = Readonly<{
  action: string;
  value: BlogFilterState;
}>;

const SORT_OPTIONS: readonly Readonly<{ value: PublicBlogPostSort; label: string }>[] = [
  { value: "newest", label: "Más recientes" },
  { value: "oldest", label: "Más antiguos" },
  { value: "title_asc", label: "Título A–Z" },
  { value: "title_desc", label: "Título Z–A" },
];

export default function BlogFilters({ action, value }: Props) {
  const hasFilters = value.search.length > 0 || value.sort !== "newest" || value.perPage !== 9;

  return (
    <form
      action={action}
      method="get"
      className="flex w-full flex-col gap-3 rounded border border-neutral-200 bg-neutral-50 p-3 lg:flex-row lg:items-end"
      aria-label="Filtrar publicaciones"
    >
      <label className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-neutral-600">Buscar</span>
        <Input
          name="q"
          type="search"
          defaultValue={value.search}
          maxLength={200}
          placeholder="Título o extracto"
          className="bg-white"
        />
      </label>

      <label className="flex min-w-44 flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-neutral-600">Orden</span>
        <Select name="sort" defaultValue={value.sort} className="bg-white">
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </label>

      <label className="flex min-w-36 flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-neutral-600">Por página</span>
        <Select name="perPage" defaultValue={String(value.perPage)} className="bg-white">
          {[6, 9, 12].map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </Select>
      </label>

      <div className="flex gap-2">
        <Button type="submit" className="whitespace-nowrap">Aplicar</Button>
        {hasFilters ? (
          <Button href={action} color="neutral" className="whitespace-nowrap">Limpiar</Button>
        ) : null}
      </div>
    </form>
  );
}
