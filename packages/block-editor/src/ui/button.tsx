import * as React from "react";

const variantClasses: Record<string, string> = {
  default: "block-editor-btn--primary",
  destructive: "block-editor-btn--danger",
  ghost: "block-editor-btn--ghost",
  outline: "block-editor-btn--outline",
  secondary: "block-editor-btn--secondary",
};

const sizeClasses: Record<string, string> = {
  default: "block-editor-btn--md",
  sm: "block-editor-btn--sm",
  lg: "block-editor-btn--lg",
  icon: "block-editor-btn--icon",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const cls = [
      "block-editor-btn",
      variantClasses[variant] || "",
      sizeClasses[size] || "",
      className,
    ].filter(Boolean).join(" ");

    return <button ref={ref} className={cls} {...props} />;
  }
);
Button.displayName = "Button";

export { Button };
