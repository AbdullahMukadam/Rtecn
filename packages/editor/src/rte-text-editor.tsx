import { useMemo } from 'react';
import { cn } from "./ui/utils";
import { RichTextEditorContext } from './rte-context';
import { DEFAULT_LABELS } from './labels';
import { Toolbar } from './rte-toolbar';
import { ControlsGroup } from './rte-controls-group';
import { Content } from './rte-content';
import { RichTextEditorControl } from './controls/rte-control';
import { LinkControl } from './controls/rte-link-control';
import * as controls from './controls/rte-controls';
import type { RichTextEditorProps } from './types';

function RichTextEditorRoot({
  editor,
  children,
  className,
  labels,
  variant = "default",
}: RichTextEditorProps) {
  const mergedLabels = useMemo(
    () => ({ ...DEFAULT_LABELS, ...labels }),
    [labels]
  );

  return (
    <RichTextEditorContext.Provider value={{ editor, labels: mergedLabels, variant }}>
      <div
        className={cn(
          'rte-root',
          variant !== "default" && `rte-root--${variant}`,
          className
        )}
        data-variant={variant}
      >
        {children}
      </div>
    </RichTextEditorContext.Provider>
  );
}

export const RichTextEditor = Object.assign(RichTextEditorRoot, {
  Toolbar,
  ControlsGroup,
  Content,
  Control: RichTextEditorControl,
  Link: LinkControl,
  Bold: controls.BoldControl,
  Italic: controls.ItalicControl,
  Underline: controls.UnderlineControl,
  Strikethrough: controls.StrikethroughControl,
  ClearFormatting: controls.ClearFormattingControl,
  Code: controls.CodeControl,
  CodeBlock: controls.CodeBlockControl,
  H1: controls.H1Control,
  H2: controls.H2Control,
  H3: controls.H3Control,
  H4: controls.H4Control,
  H5: controls.H5Control,
  H6: controls.H6Control,
  BulletList: controls.BulletListControl,
  OrderedList: controls.OrderedListControl,
  Blockquote: controls.BlockquoteControl,
  Hr: controls.HrControl,
  Unlink: controls.UnlinkControl,
  Undo: controls.UndoControl,
  Redo: controls.RedoControl,
  AlignLeft: controls.AlignLeftControl,
  AlignCenter: controls.AlignCenterControl,
  AlignRight: controls.AlignRightControl,
  AlignJustify: controls.AlignJustifyControl,
  Highlight: controls.HighlightControl,
  Subscript: controls.SubscriptControl,
  Superscript: controls.SuperscriptControl,
});