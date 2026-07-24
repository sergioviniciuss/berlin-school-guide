import {
  DEMO_OUTCOMES,
  DEMO_SECONDARY_DECISION,
  DEMO_TRUNK,
} from "./constants";
import type { TimelineStage } from "./types";

function collectStages(): TimelineStage[] {
  return [
    ...DEMO_TRUNK,
    ...DEMO_SECONDARY_DECISION.primaryBranches,
    ...DEMO_OUTCOMES,
  ];
}

function stageById(id: string): TimelineStage {
  const stage = collectStages().find((s) => s.id === id);
  if (!stage) {
    throw new Error(`Expected timeline stage with id "${id}"`);
  }
  return stage;
}

describe("EducationTimeline DEMO constants anchor contract", () => {
  it("maps locked H2 anchors for trunk, secondary, and outcome nodes", () => {
    expect(stageById("kita").anchorHref).toBe("#antes-da-escola");
    expect(stageById("grundschule").anchorHref).toBe("#ensino-primario");
    expect(stageById("gymnasium").anchorHref).toBe("#os-caminhos-possiveis");
    expect(stageById("iss").anchorHref).toBe("#os-caminhos-possiveis");
    expect(stageById("gemeinschaftsschule").anchorHref).toBe(
      "#os-caminhos-possiveis",
    );
    expect(stageById("ausbildung").anchorHref).toBe("#formacao-profissional");
    expect(stageById("ensino-superior").anchorHref).toBe("#ensino-superior");
  });

  it("frames Grundschule Germany-first with Berlin as the exception", () => {
    const grundschule = stageById("grundschule");
    expect(grundschule.grades).toBe("1ª à 4ª série");
    expect(grundschule.ageRange).toBe("Idade aproximada: 6–10 anos");
    expect(grundschule.berlinNote).toBe("6 anos (até a 6ª série)");
  });

  it("bans Phase 10 placeholders and the stub hash", () => {
    const stages = collectStages();
    for (const stage of stages) {
      expect(stage.summary).not.toContain("Fase 10");
      expect(stage.summary).not.toContain("Conteúdo completo chega");
      expect(stage.anchorHref ?? "").not.toContain(
        "o-caminho-da-kita-a-universidade",
      );
    }
  });
});
