import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";

/** Portrait photo card: slow zoom on hover, title over a deep black gradient, arrow slides in. */
export function PhotoCard({
  href,
  image,
  index,
  title,
  description,
  sizes,
}: {
  href: string;
  image: string;
  index: string;
  title: string;
  description?: string;
  sizes: string;
}) {
  return (
    <Link href={href} className="group block focus-visible:outline-offset-4">
      <div className="relative aspect-[3/4] overflow-hidden bg-ink">
        <div className="h-full w-full transition-transform duration-1200 ease-editorial group-hover:scale-[1.05]">
          <Image src={image} alt="" fill sizes={sizes} className="object-cover" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 from-0% via-black/60 via-40% to-black/0 to-75%" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
          <div>
            <span aria-hidden className="tabular text-sm font-semibold text-white">
              {index}
            </span>
            <h3 className="mt-1.5 text-xl font-semibold text-white">{title}</h3>
            {description ? <p className="mt-2 max-w-xs text-sm text-white/75">{description}</p> : null}
          </div>
          <ArrowRight
            size={20}
            className="mb-1 shrink-0 -translate-x-1 text-white opacity-0 transition-all duration-500 ease-editorial group-hover:translate-x-0 group-hover:opacity-100"
          />
        </div>
      </div>
    </Link>
  );
}
