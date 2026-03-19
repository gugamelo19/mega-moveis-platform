import Image from "next/image";
import { cn } from "@/lib/utils";

type MegaLogoProps = {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function MegaLogo({
  className,
  imageClassName,
  priority = false,
}: MegaLogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/brand/mega-moveis-logo.jpg"
        alt="Mega Moveis e Eletro"
        width={225}
        height={110}
        priority={priority}
        className={cn("h-auto w-[180px] object-contain sm:w-[205px]", imageClassName)}
      />
    </div>
  );
}
