import { cn } from "./ui/utils";
import { useRichTextEditorContext } from './rte-context';
import type { RichTextEditorToolbarProps } from './types';

export function Toolbar({
  children,
  className,
  sticky,
  stickyOffset = 0,
}: RichTextEditorToolbarProps) {
  const { variant } = useRichTextEditorContext();

  return (
    <div
      className={cn(
        'rte-toolbar',
        variant !== "default" && `rte-toolbar--${variant}`,
        sticky && 'sticky z-10',
        className
      )}
      data-sticky={sticky ? '' : undefined}
      style={sticky ? { top: stickyOffset } : undefined}
    >
      {children}
    </div>
  );
}