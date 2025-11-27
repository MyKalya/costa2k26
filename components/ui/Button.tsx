import clsx from "clsx";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps<T extends ElementType> = {
  as?: T;
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "className" | "children">;

const base =
  "inline-flex items-center justify-center rounded-pill font-sans font-medium transition-transform duration-200 ease-natural focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]";

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-12 px-6 text-base",
};

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white shadow-card hover:scale-[1.03] hover:bg-primary-hover hover:shadow-hover focus-visible:shadow-focus",
  secondary: "border border-primary text-primary bg-transparent hover:scale-[1.03] hover:bg-primary/10",
  outline: "border border-border text-foreground bg-transparent hover:scale-[1.03] hover:bg-black/5",
  ghost: "text-foreground bg-transparent hover:scale-[1.03] hover:bg-black/5",
};

export function Button<T extends ElementType = "button">({
  as,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps<T>) {
  const Tag = (as ?? "button") as ElementType;
  return (
    <Tag className={clsx(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </Tag>
  );
}
