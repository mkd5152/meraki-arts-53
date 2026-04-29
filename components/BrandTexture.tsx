type BrandTextureProps = {
  className?: string;
};

export function BrandTexture({ className = "" }: BrandTextureProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="brand-texture absolute inset-0 opacity-55" />
      <svg
        className="absolute -right-12 top-10 h-48 w-48 text-teal/45 sm:h-72 sm:w-72"
        viewBox="0 0 220 220"
        fill="none"
      >
        <path
          d="M36 142c32-79 88-107 152-86"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M67 128c22 18 54 17 74-3"
          stroke="rgb(var(--color-clay) / .52)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M95 84c4 23 16 40 36 51"
          stroke="rgb(var(--color-gold) / .48)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="absolute -left-10 bottom-4 h-44 w-44 text-clay/45 sm:h-64 sm:w-64"
        viewBox="0 0 220 220"
        fill="none"
      >
        <path
          d="M40 126c43 30 92 33 148 5"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M68 87c31 21 64 21 99-1"
          stroke="rgb(var(--color-sage) / .45)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="77" cy="154" r="5" fill="rgb(var(--color-gold) / .65)" />
        <circle cx="117" cy="165" r="4" fill="rgb(var(--color-teal) / .6)" />
        <circle cx="148" cy="151" r="5" fill="rgb(var(--color-clay) / .55)" />
      </svg>
    </div>
  );
}
