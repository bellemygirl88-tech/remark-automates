import { Link } from "@tanstack/react-router";

interface Props {
  size?: "sm" | "md" | "lg" | "xl";
  asLink?: boolean;
}

const sizeMap = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-3xl",
  xl: "text-5xl md:text-7xl",
};

export function GradientLogo({ size = "md", asLink = true }: Props) {
  const content = (
    <span className={`font-display font-bold tracking-tight ${sizeMap[size]}`}>
      <span className="text-gradient-brand">Remark</span>
      <span className="text-foreground"> Antipala</span>
    </span>
  );
  if (!asLink) return content;
  return (
    <Link to="/" aria-label="Remark Antipala — Home" className="inline-flex items-center">
      {content}
    </Link>
  );
}
