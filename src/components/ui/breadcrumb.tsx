import Link from "next/link";
import { HomeIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({
  crumbs,
  tone = "light",
  center = false,
}: {
  crumbs: Crumb[];
  tone?: "light" | "dark";
  center?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <nav aria-label="Fil d'Ariane">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px]",
          center && "justify-center",
          dark ? "text-white/80" : "text-ink",
        )}
      >
        <li>
          <Link
            href="/"
            className={cn("flex items-center", dark ? "text-white hover:text-brand-light" : "text-navy hover:text-brand")}
            aria-label="Accueil"
          >
            <HomeIcon size={16} />
          </Link>
        </li>
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-2">
              <span aria-hidden className={dark ? "text-white/50" : "text-muted"}>
                /
              </span>
              {crumb.href && !last ? (
                <Link href={crumb.href} className={dark ? "hover:text-white" : "hover:text-brand"}>
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={cn(last && "font-bold", last && (dark ? "text-white" : "text-navy"))}>
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
