import * as React from "react";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={["block-editor-label", className].filter(Boolean).join(" ")}
        {...props}
      />
    );
  }
);
Label.displayName = "Label";

export { Label };
