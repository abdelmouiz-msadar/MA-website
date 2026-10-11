import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/** Photo card with a navy bottom gradient, centered white title and arrow (ENGIE activity-card pattern). */
export function ImageCard({
  href,
  image,
  title,
  label,
  sizes,
  className,
  imageClassName,
}: {
  href: string;
  image: string;
  title: string;
  label?: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <Link href={href} className={cn("group relative block overflow-hidden bg-navy-deep", className)}>
      <Image
        src={image}
        alt=""
        fill
        sizes={sizes}
        className={cn("object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]", imageClassName)}
      />
      <div className="card-overlay absolute inset-0 transition-opacity duration-300 group-hover:opacity-95" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-5 pb-6 text-center text-white">
        {label ? <span className="text-[13px] font-bold uppercase tracking-[0.12em] text-brand-light">{label}</span> : null}
        <span className="text-[21px] font-bold leading-snug text-balance sm:text-[23px]">{title}</span>
        <ArrowRight size={20} className="transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
