interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "accent" | "danger" | "muted";
  className?: string;
}

const variantClasses = {
  primary: "bg-primary text-white",
  accent: "bg-accent text-white",
  danger: "bg-red-600 text-white",
  muted: "bg-gray-200 text-gray-700",
};

export default function Badge({
  children,
  variant = "primary",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-semibold ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
