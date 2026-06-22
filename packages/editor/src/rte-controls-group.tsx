import { cn } from "./ui/utils";
import type { RichTextEditorControlsGroupProps } from './types';

export function ControlsGroup({
  children,
  className,
}: RichTextEditorControlsGroupProps) {
  return (
    <div
      className={cn('rte-controls-group', className)}
    >
      {children}
    </div>
  );
}