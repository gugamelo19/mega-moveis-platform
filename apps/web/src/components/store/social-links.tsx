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
    <div className="flex flex-col gap-3 text-sm text-(--mm-text-soft)">
      {instagramUrl ? (
        <Link
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-(--mm-primary)"
        >
          Instagram
        </Link>
      ) : null}

      {facebookUrl ? (
        <Link
          href={facebookUrl}
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-(--mm-primary)"
        >
          Facebook
        </Link>
      ) : null}
    </div>
  );
}