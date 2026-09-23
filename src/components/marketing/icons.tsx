interface IconProps {
  className?: string;
}

export const LeafIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <path
      d="M12 36C8 26 12 12 34 10c2 22-12 28-22 26Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M14 34C20 26 26 18 33 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const CupIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <path d="M12 16h20l-2 20a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4l-2-20Z" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M32 19h3a4 4 0 0 1 0 8h-3.6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path d="M16 10c1 2-1 3 0 5M22 10c1 2-1 3 0 5M28 10c1 2-1 3 0 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const TimerIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <circle cx="24" cy="26" r="14" stroke="currentColor" strokeWidth="1.6" />
    <path d="M24 18v8l6 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 8h10M24 8v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const ThermometerIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <path
      d="M22 8a3 3 0 0 1 6 0v18.6a8 8 0 1 1-6 0V8Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="25" cy="34" r="3" fill="currentColor" />
  </svg>
);

export const ShieldCheckIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <path d="M24 8 38 13v11c0 10-6 16-14 17-8-1-14-7-14-17V13l14-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M18 24l4 4 8-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BranchIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <circle cx="14" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="14" cy="36" r="4" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="34" cy="24" r="4" stroke="currentColor" strokeWidth="1.6" />
    <path d="M14 16v16M17 13l14 9M17 35l14-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
