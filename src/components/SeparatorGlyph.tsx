type Props = {
  className?: string;
};

// A small mark used between nav items, in the spirit of Leclerc's separatore.svg —
// a triangular flange paired with a stub. Pure SVG, scales with currentColor.
export default function SeparatorGlyph({ className }: Props) {
  return (
    <svg
      viewBox="0 0 32 16"
      width="22"
      height="11"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <path d="M1 8 L11 8" />
      <path d="M11 2 L21 8 L11 14 Z" fill="currentColor" stroke="none" />
      <path d="M22 8 L31 8" />
    </svg>
  );
}
