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
        width={240}
        height={72}
        priority
        className={cn("block h-12 w-auto", imgClassName)}
      />
    </div>
  );
}
