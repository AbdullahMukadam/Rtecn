import * as React from "react";

const variantClasses: Record<string, string> = {
  default: "block-editor-alert",
  destructive: "block-editor-alert--danger",
};

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variantClasses;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const cls = [
      "block-editor-alert",
      variantClasses[variant] || "",
      className,
    ].filter(Boolean).join(" ");

    return <div ref={ref} role="alert" className={cls} {...props} />;
  }
);
Alert.displayName = "Alert";

export { Alert };
