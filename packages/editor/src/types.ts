import type { Editor } from '@tiptap/react';
import type { RichTextEditorLabels } from './labels';

export type RichTextEditorVariant = "default" | "subtle" | "compact";

export interface RichTextEditorProps {
  editor: Editor | null;
  children: React.ReactNode;
  className?: string;
  labels?: Partial<RichTextEditorLabels>;
  variant?: RichTextEditorVariant;
}

export interface RichTextEditorToolbarProps {
  children: React.ReactNode;
  className?: string;
  sticky?: boolean;
  stickyOffset?: number | string;
}

export interface RichTextEditorContentProps {
  className?: string;
}

export interface RichTextEditorControlsGroupProps {
  children: React.ReactNode;
  className?: string;
}

export interface RichTextEditorControlProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  interactive?: boolean;
}