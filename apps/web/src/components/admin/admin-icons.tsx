import { cn } from "@/lib/utils";

export type AdminIconName =
  | "dashboard"
  | "package"
  | "tag"
  | "image"
  | "layers"
  | "logout"
  | "panel"
  | "plus"
  | "search"
  | "pencil"
  | "trash"
  | "trend"
  | "cart"
  | "eye"
  | "eye-off"
  | "arrow-right";

type AdminIconProps = {
  name: AdminIconName;
  className?: string;
};

export function AdminIcon({ name, className }: AdminIconProps) {
  const commonProps = {
    className: cn("h-5 w-5", className),
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
  };

  switch (name) {
    case "dashboard":
      return (
        <svg {...commonProps}>
          <rect x="4" y="4" width="6.5" height="6.5" rx="1.2" />
          <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2" />
          <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2" />
          <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2" />
        </svg>
      );
    case "package":
      return (
        <svg {...commonProps}>
          <path d="m12 3.8 7 3.8v8.8l-7 3.8-7-3.8V7.6z" />
          <path d="m12 12 7-4.4" />
          <path d="m12 12-7-4.4" />
          <path d="M12 12v8" />
        </svg>
      );
    case "tag":
      return (
        <svg {...commonProps}>
          <path d="M10.5 4H5.2A1.2 1.2 0 0 0 4 5.2v5.3a2 2 0 0 0 .6 1.4l7.5 7.5a1.8 1.8 0 0 0 2.5 0l4.8-4.8a1.8 1.8 0 0 0 0-2.5l-7.5-7.5a2 2 0 0 0-1.4-.6Z" />
          <circle cx="7.5" cy="7.5" r="1.1" />
        </svg>
      );
    case "image":
      return (
        <svg {...commonProps}>
          <rect x="4" y="4.5" width="16" height="15" rx="2" />
          <circle cx="9" cy="9.2" r="1.5" />
          <path d="m6.5 16 4.2-4.2a1.2 1.2 0 0 1 1.7 0L17.5 17" />
        </svg>
      );
    case "layers":
      return (
        <svg {...commonProps}>
          <path d="m12 4 8 4.5-8 4.5-8-4.5z" />
          <path d="m4 12.5 8 4.5 8-4.5" />
          <path d="m4 16.5 8 4.5 8-4.5" />
        </svg>
      );
    case "logout":
      return (
        <svg {...commonProps}>
          <path d="M10 6H6.5A2.5 2.5 0 0 0 4 8.5v7A2.5 2.5 0 0 0 6.5 18H10" />
          <path d="M14 8.5 18.5 12 14 15.5" />
          <path d="M10 12h8.5" />
        </svg>
      );
    case "panel":
      return (
        <svg {...commonProps}>
          <rect x="5" y="4.5" width="14" height="15" rx="2" />
          <path d="M10 4.5v15" />
        </svg>
      );
    case "plus":
      return (
        <svg {...commonProps}>
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      );
    case "search":
      return (
        <svg {...commonProps}>
          <circle cx="11" cy="11" r="5.8" />
          <path d="m19 19-3.3-3.3" />
        </svg>
      );
    case "pencil":
      return (
        <svg {...commonProps}>
          <path d="m4 20 4.2-1 9-9a2 2 0 1 0-2.8-2.8l-9 9z" />
          <path d="m13 6 5 5" />
        </svg>
      );
    case "trash":
      return (
        <svg {...commonProps}>
          <path d="M5.5 7.5h13" />
          <path d="M9 4.5h6" />
          <path d="M8 7.5V18a1.5 1.5 0 0 0 1.5 1.5h5A1.5 1.5 0 0 0 16 18V7.5" />
          <path d="M10.5 10.5v5" />
          <path d="M13.5 10.5v5" />
        </svg>
      );
    case "trend":
      return (
        <svg {...commonProps}>
          <path d="m4.5 15.5 5.2-5.2 3.2 3.2 6.6-6.6" />
          <path d="M14.5 6.9H19v4.5" />
        </svg>
      );
    case "cart":
      return (
        <svg {...commonProps}>
          <path d="M4 5.5h2l1.6 8.2a1.6 1.6 0 0 0 1.6 1.3h6.8a1.6 1.6 0 0 0 1.6-1.2l1.1-5.8H7.2" />
          <circle cx="10" cy="18.5" r="1.2" />
          <circle cx="16" cy="18.5" r="1.2" />
        </svg>
      );
    case "eye":
      return (
        <svg {...commonProps}>
          <path d="M2.8 12s3.2-5.5 9.2-5.5 9.2 5.5 9.2 5.5-3.2 5.5-9.2 5.5S2.8 12 2.8 12Z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case "eye-off":
      return (
        <svg {...commonProps}>
          <path d="M3 3 21 21" />
          <path d="M10.7 6.7A11 11 0 0 1 12 6.5c6 0 9.2 5.5 9.2 5.5a15 15 0 0 1-3 3.6" />
          <path d="M6.4 6.4A15.7 15.7 0 0 0 2.8 12s3.2 5.5 9.2 5.5a10.8 10.8 0 0 0 5.3-1.4" />
          <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...commonProps}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    default:
      return null;
  }
}
