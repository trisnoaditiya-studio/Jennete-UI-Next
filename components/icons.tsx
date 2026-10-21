import type { ReactNode } from "react";

/* Ikon garis 24x24 (stroke). Path disalin dari situs HTML. */
const PATHS: Record<string, ReactNode> = {
  "bolt": <><path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" /></>,
  "building": <><path d="M3 20h18M5 20V9l7-5 7 5v11M9 20v-6h6v6" /></>,
  "cal": <><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  "cal2": <><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4M8 14h3" /></>,
  "car": <><path d="M3 16l2-6c.4-1.2 1.4-2 2.7-2h8.6c1.3 0 2.3.8 2.7 2l2 6" /><path d="M3 16h18v3H3zM6.5 19v1.5M17.5 19v1.5" /><circle cx="7.5" cy="13" r="1" /><circle cx="16.5" cy="13" r="1" /></>,
  "chat": <><path d="M4 5h16v11H8l-4 4z" /><path d="M8 9h8M8 12h5" /></>,
  "check": <><path d="M5 12l5 5 9-10" /></>,
  "clock": <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  "doc": <><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5M10 13h6M10 17h6" /></>,
  "doc2": <><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5M10 13h6M10 17h4" /></>,
  "grid": <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  "help": <><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14" /><path d="M12 17.5h.01" /></>,
  "mail": <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  "moto": <><circle cx="5.5" cy="17" r="3" /><circle cx="18.5" cy="17" r="3" /><path d="M8.5 17h6.5l-2.5-7H10M13 6h3l2.5 8" /></>,
  "people": <><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M2.5 19c.6-3 2.8-5 5.5-5s4.9 2 5.5 5M14 14.5c.9-.4 1.9-.6 3-.5 2.4.2 4 1.9 4.5 5" /></>,
  "person": <><circle cx="12" cy="7" r="3.5" /><path d="M5 20c.8-3.5 3.6-6 7-6s6.2 2.5 7 6" /></>,
  "phone": <><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></>,
  "pin": <><path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  "project": <><path d="M4 20h16M6 20V10l6-4 6 4v10" /><path d="M10 20v-4h4v4M3 10l9-6 9 6" /></>,
  "search": <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>,
  "shield": <><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></>,
  "steps": <><path d="M4 6h10M4 12h16M4 18h7" /><circle cx="18" cy="6" r="2" /><circle cx="15" cy="18" r="2" /></>,
  "tag": <><path d="M3 12V4h8l10 10-8 8z" /><circle cx="7.5" cy="8.5" r="1.5" /></>,
  "wrench": <><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" /></>,
  "leaf": <><path d="M12 21c-4-3-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-3 8-7 11z" /><path d="M9 11c1.5-2.5 4-3 6-3-1 3-2.5 5-6 5" /></>,
  "eye": <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  "flag": <path d="M5 21V4M5 4h11l-2 4 2 4H5" />,
  "scale": <><path d="M12 4v16M6 20h12M5 8h14" /><path d="M5 8l-2.5 6a3 3 0 0 0 5 0zM19 8l-2.5 6a3 3 0 0 0 5 0z" /></>,
  "article": <><rect x="3.5" y="4.5" width="17" height="15" rx="2" /><path d="M7 9h10M7 13h10M7 16.5h6" /></>,
  "office": <><path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 9h4a1 1 0 0 1 1 1v11M3 21h18" /><path d="M8 8h3M8 12h3M8 16h3" /></>,
};

export type IconName = keyof typeof PATHS;

export function Ic({ name, sw = 1.8, className }: { name: string; sw?: number; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}

/* Ikon dari sprite (lihat SvgSprite): panah, chevron, dan siluet kendaraan. */
export function Use({ id, className }: { id: string; className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`#${id}`} />
    </svg>
  );
}

export const Arrow = () => <Use id="i-arrow" />;
