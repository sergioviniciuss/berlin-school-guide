"use client";

import { useId, useState } from "react";

type ComparisonEvidenceNoteProps = {
  note: string;
};

export function ComparisonEvidenceNote({ note }: ComparisonEvidenceNoteProps) {
  const [expanded, setExpanded] = useState(false);
  const noteId = useId();

  return (
    <div className="mt-1 text-sm text-neutral-600">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={noteId}
        onClick={() => setExpanded((current) => !current)}
        className="text-blue-700 hover:underline"
      >
        {expanded ? "Ocultar nota de evidência" : "Ver nota de evidência"}
      </button>
      {expanded ? (
        <p id={noteId} className="mt-1">
          {note}
        </p>
      ) : null}
    </div>
  );
}
