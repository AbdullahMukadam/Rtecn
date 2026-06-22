import type { Editor } from '@tiptap/core';
import type { ReactNode } from 'react';

export type BlockEditorVariant = "default" | "minimal";

export interface BlockEditorLabels {
  paragraphLabel?: string;
  headingLabel?: string;
  bulletListLabel?: string;
  orderedListLabel?: string;
  taskListLabel?: string;
  blockquoteLabel?: string;
  codeBlockLabel?: string;
  dividerLabel?: string;
}

export interface BlockEditorProps {
  editor: Editor | null;
  children?: ReactNode;
  className?: string;
  labels?: Partial<BlockEditorLabels>;
  variant?: BlockEditorVariant;
}

export interface BlockEditorContextValue {
  editor: Editor | null;
  labels: BlockEditorLabels;
  variant: BlockEditorVariant;
}
