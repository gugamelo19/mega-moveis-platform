import Link from "next/link";

type SocialLinksProps = {
  instagramUrl?: string | null;
  facebookUrl?: string | null;
};

export function SocialLinks({
  instagramUrl,
  facebookUrl,
}: SocialLinksProps) {
  if (!instagramUrl && !facebookUrl) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 text-sm text-slate-600">
      {instagramUrl ? (
        <Link
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-slate-900"
        >
          Instagram
        </Link>
      ) : null}

      {facebookUrl ? (
        <Link
          href={facebookUrl}
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-slate-900"
        >
          Facebook
        </Link>
      ) : null}
    </div>
  );
}