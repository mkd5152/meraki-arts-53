import Image from "next/image";
import { getContent } from "@/lib/getData";

export default function Loading() {
  const content = getContent();

  return (
    <div className="grid min-h-svh place-items-center bg-paper">
      <div className="grid justify-items-center gap-4">
        <Image
          src={content.brand.logo.assets.loading}
          alt={content.artist.brandName}
          width={92}
          height={92}
          className="animate-spin [animation-duration:1.8s]"
          priority
        />
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
          {content.artist.brandName}
        </p>
      </div>
    </div>
  );
}
