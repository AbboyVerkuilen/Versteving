type P = { size?: number };
const base = (size = 20) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const Back = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
export const Plus = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const Send = ({ size }: P) => (
  <svg {...base(size)} strokeWidth={2.4}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const Doc = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M4 4h12l4 4v12H4z" />
    <path d="M8 12h8M8 16h6" />
  </svg>
);
export const Globe = ({ size }: P) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </svg>
);
export const ThumbUp = ({ size }: P) => (
  <svg {...base(size)} strokeWidth={1.8}>
    <path d="M7 10v11H3V10z" />
    <path d="M7 10l4-7a2 2 0 0 1 3 2l-1 5h6a2 2 0 0 1 2 2.3l-1.4 7A2 2 0 0 1 17.6 21H7" />
  </svg>
);
export const ThumbDown = ({ size }: P) => (
  <svg {...base(size)} strokeWidth={1.8}>
    <path d="M17 14V3h4v11z" />
    <path d="M17 14l-4 7a2 2 0 0 1-3-2l1-5H5a2 2 0 0 1-2-2.3l1.4-7A2 2 0 0 1 6.4 3H17" />
  </svg>
);
export const Pencil = ({ size }: P) => (
  <svg {...base(size)} strokeWidth={1.8}>
    <path d="M4 20h4L19 9l-4-4L4 16z" />
  </svg>
);
export const Trash = ({ size }: P) => (
  <svg {...base(size)} strokeWidth={1.8}>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
  </svg>
);
export const Menu = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export function Logo({ size = 34, inverted = false }: { size?: number; inverted?: boolean }) {
  const panel = inverted ? "#FFFFFF" : "var(--green)";
  const bubble = inverted ? "var(--green)" : "#FFFFFF";
  return (
    <svg width={size} height={(size * 40) / 34} viewBox="0 0 34 40" role="img" aria-label="Study Buddy">
      <path d="M2 6 L22 1 L22 39 L2 34 Z" fill={panel} />
      <path d="M24 7 H32 V33 H24" fill="none" stroke={panel} strokeWidth="2.2" />
      <path
        d="M7 13 H17 a2 2 0 0 1 2 2 V22 a2 2 0 0 1 -2 2 H12 L9 27 V24 H7 a2 2 0 0 1 -2 -2 V15 a2 2 0 0 1 2 -2 Z"
        fill={bubble}
      />
    </svg>
  );
}
