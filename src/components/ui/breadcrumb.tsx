import Link from "next/link";
import { Fragment } from "react";
import { ui } from "@/lib/content/ui";

export type Crumb = { label: string; href?: string };

/** Breadcrumb set in eyebrow type, always over a dark hero. */
export function Breadcrumb({ crumbs, className }: { crumbs: Crumb[]; className?: string }) {
  return (
    <nav aria-label={ui.breadcrumb} className={className}>
      <ol className="eyebrow flex flex-wrap items-center gap-x-2 text-white/80">
        <li>
          <Link href="/" className="transition-colors hover:text-white">
            {ui.home}
          </Link>
        </li>
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <Fragment key={crumb.label}>
              <li aria-hidden className="text-white/40">
                /
              </li>
              <li>
                {crumb.href && !last ? (
                  <Link href={crumb.href} className="transition-colors hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined} className="text-white">
                    {crumb.label}
                  </span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
