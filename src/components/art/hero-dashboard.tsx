import Image from "next/image";
import { cn } from "@/lib/utils";

type HeroDashboardProps = {
  className?: string;
};

/**
 * Hero dashboard visual.
 * Static screenshot of the Ordron OCR Intelligence workspace, with a linear
 * mask fading the right edge so the UI appears to continue off-screen rather
 * than terminating in a hard rectangle.
 */
export function HeroDashboard({ className }: HeroDashboardProps) {
  const horizontalFade =
    "linear-gradient(to right, #000 0%, #000 58%, rgba(0,0,0,0.55) 82%, transparent 100%)";
  const verticalFade =
    "linear-gradient(to bottom, transparent 0%, #000 7%, #000 93%, transparent 100%)";
  const maskImage = `${horizontalFade}, ${verticalFade}`;

  return (
    <div
      className={cn("relative w-full", className)}
      style={{
        maskImage,
        WebkitMaskImage: maskImage,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
      }}
    >
      <Image
        src="/hero-dashboard.png"
        alt="Ordron OCR Intelligence dashboard showing hours returned, time reduction and live invoice feed"
        width={1024}
        height={967}
        priority
        sizes="(min-width: 1280px) 660px, (min-width: 1024px) 460px, 100vw"
        className="block h-auto w-full select-none"
      />
    </div>
  );
}
