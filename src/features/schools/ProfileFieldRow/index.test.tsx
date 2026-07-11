import { render, screen } from "@testing-library/react";

import { ProfileFieldRow } from ".";
import { StatusBadge } from "@/features/schools/StatusBadge";
import { getSchoolFieldByPath } from "@/features/schools/getSchoolFieldByPath";
import {
  field,
  validConflictingDataSchool,
  validDetailedPublicSchool,
  validDirectoryOnlySchool,
  validNotApplicableInspectionSchool,
} from "@/features/schools/school/fixtures";

describe("StatusBadge", () => {
  it('renders "Verificado" for verified status', () => {
    render(<StatusBadge status="verified" />);

    expect(screen.getByText("Verificado")).toBeVisible();
  });

  it('renders "Informação inferida, não confirmada" with amber classes for not_confirmed', () => {
    render(<StatusBadge status="not_confirmed" />);

    const badge = screen.getByText("Informação inferida, não confirmada");
    expect(badge).toBeVisible();
    expect(badge).toHaveClass("bg-amber-50", "text-amber-900");
  });
});

describe("ProfileFieldRow", () => {
  it("renders verified field value, badge, Ver fonte, and Abrir original links", () => {
    const fieldValue = getSchoolFieldByPath(validDetailedPublicSchool, "ganztag");

    render(
      <ProfileFieldRow
        label="Ganztag"
        fieldPath="ganztag"
        field={fieldValue!}
        school={validDetailedPublicSchool}
      />,
    );

    expect(screen.getByText("Open all-day model")).toBeVisible();
    expect(screen.getByText("Verificado")).toBeVisible();
    expect(screen.getByRole("link", { name: "Ver fonte" })).toHaveAttribute(
      "href",
      "#source-school-website",
    );
    expect(screen.getByRole("link", { name: /Abrir original/ })).toHaveAttribute(
      "href",
      "https://example.test/school",
    );
  });

  it("renders missing field with status text as value and badge", () => {
    const fieldValue = getSchoolFieldByPath(validDirectoryOnlySchool, "ganztag");

    render(
      <ProfileFieldRow
        label="Ganztag"
        fieldPath="ganztag"
        field={fieldValue!}
        school={validDirectoryOnlySchool}
      />,
    );

    expect(screen.getAllByText("Informação não encontrada")).toHaveLength(2);
  });

  it("renders not_confirmed field with formatted value, badge, and evidence note", () => {
    const notConfirmedSchool = {
      ...validDetailedPublicSchool,
      afterSchoolCare: field("Hort inferido do Ganztag", {
        status: "not_confirmed",
        citations: [{ sourceId: "school-website" }],
        note: "Inferido a partir do modelo Ganztag publicado no site.",
        lastChecked: "2026-07-10",
      }),
    };
    const fieldValue = getSchoolFieldByPath(
      notConfirmedSchool,
      "afterSchoolCare",
    );

    render(
      <ProfileFieldRow
        label="Cuidado no contraturno (Hort/eFöB)"
        fieldPath="afterSchoolCare"
        field={fieldValue!}
        school={notConfirmedSchool}
      />,
    );

    expect(screen.getByText("Hort inferido do Ganztag")).toBeVisible();
    expect(
      screen.getByText("Informação inferida, não confirmada"),
    ).toBeVisible();
    expect(
      screen.getByText("Inferido a partir do modelo Ganztag publicado no site."),
    ).toBeVisible();
  });

  it("renders conflicting field with mandatory evidence note", () => {
    const fieldValue = getSchoolFieldByPath(
      validConflictingDataSchool,
      "ganztag",
    );

    render(
      <ProfileFieldRow
        label="Ganztag"
        fieldPath="ganztag"
        field={fieldValue!}
        school={validConflictingDataSchool}
      />,
    );

    expect(
      screen.getByText("Synthetic sources disagree about the Ganztag model."),
    ).toBeVisible();
    expect(screen.getByText("Informação conflitante")).toBeVisible();
  });

  it('renders not_applicable field with "Não se aplica" and badge', () => {
    const fieldValue = getSchoolFieldByPath(
      validNotApplicableInspectionSchool,
      "inspectionData",
    );

    render(
      <ProfileFieldRow
        label="Dados de inspeção"
        fieldPath="inspectionData"
        field={fieldValue!}
        school={validNotApplicableInspectionSchool}
      />,
    );

    expect(screen.getAllByText("Não se aplica")).toHaveLength(2);
  });

  it('sets rel="noopener noreferrer" and target="_blank" on Abrir original links', () => {
    const fieldValue = getSchoolFieldByPath(validDetailedPublicSchool, "website");

    render(
      <ProfileFieldRow
        label="Site da escola"
        fieldPath="website"
        field={fieldValue!}
        school={validDetailedPublicSchool}
      />,
    );

    const externalLink = screen.getByRole("link", { name: /Abrir original/ });
    expect(externalLink).toHaveAttribute("target", "_blank");
    expect(externalLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
