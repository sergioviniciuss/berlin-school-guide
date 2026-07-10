"use client";

type SchoolSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SchoolSearch({ value, onChange }: SchoolSearchProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="school-search"
        className="block text-sm font-medium text-neutral-900"
      >
        Buscar escola pelo nome
      </label>
      <input
        id="school-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Digite o nome da escola"
        className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-base shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}
