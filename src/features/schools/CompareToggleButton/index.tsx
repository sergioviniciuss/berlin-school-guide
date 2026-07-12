type CompareToggleButtonProps = {
  isSelected: boolean;
  disabled?: boolean;
  onToggle: () => void;
};

export function CompareToggleButton({
  isSelected,
  disabled = false,
  onToggle,
}: CompareToggleButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      title={disabled ? "Máximo de 3 escolas" : undefined}
      aria-pressed={isSelected}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onToggle();
      }}
      className="min-h-11 rounded-md border border-neutral-300 px-4 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {isSelected ? "Na comparação" : "Adicionar à comparação"}
    </button>
  );
}
