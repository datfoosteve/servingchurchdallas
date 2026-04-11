import Image from "next/image";
import { cn } from "@/lib/utils";

export const SITE_LOGO_URL =
  "https://nftofcjmsuwrzzrahozd.supabase.co/storage/v1/object/public/church-images/logowordhome.svg";

type SiteLogoProps = {
  className?: string;
  imgClassName?: string;
  alt?: string;
};

export function SiteLogo({
  className,
  imgClassName,
  alt = "The Serving Church",
}: SiteLogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src={SITE_LOGO_URL}
        alt={alt}
        width={320}
        height={96}
        priority
        className={cn(
          "block h-12 w-auto brightness-105 contrast-105 saturate-[1.05] [filter:drop-shadow(0_1px_0_rgba(255,255,255,0.10))_drop-shadow(0_10px_18px_rgba(0,0,0,0.42))_drop-shadow(0_0_16px_rgba(200,169,107,0.16))]",
          imgClassName,
        )}
      />
    </div>
  );
}
