import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 px-6 py-8">
      <div className="flex flex-col items-center justify-center gap-2 text-center text-sm text-neutral-600 sm:flex-row">
        <p>© {year} Berlin School Guide</p>
        <span aria-hidden="true" className="hidden sm:inline">
          ·
        </span>
        <Link
          href="/methodology"
          className="text-blue-700 underline hover:opacity-90"
        >
          Metodologia
        </Link>
      </div>
    </footer>
  );
}
