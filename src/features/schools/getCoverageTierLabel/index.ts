export function getCoverageTierLabel(
  coverageLevel: "directory" | "detailed",
): "Pesquisa básica" | "Pesquisa detalhada" {
  return coverageLevel === "directory"
    ? "Pesquisa básica"
    : "Pesquisa detalhada";
}
