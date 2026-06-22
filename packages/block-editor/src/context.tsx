import { createContext, useContext, type ReactNode } from 'react';
import type { Editor } from '@tiptap/core';
import type { BlockEditorContextValue, BlockEditorLabels, BlockEditorVariant } from './types';
import { DEFAULT_BLOCK_EDITOR_LABELS } from './labels';

const BlockEditorContext = createContext<BlockEditorContextValue | null>(null);

export function useBlockEditorContext() {
  const ctx = useContext(BlockEditorContext);
  if (!ctx) throw new Error('BlockEditor components must be used within <BlockEditor>');
  return ctx;
}

export interface BlockEditorProviderProps {
  editor: Editor | null;
  children: ReactNode;
  labels?: Partial<BlockEditorLabels>;
  variant?: BlockEditorVariant;
}

export function BlockEditorProvider({
  editor,
  children,
  labels,
  variant = "default",
}: BlockEditorProviderProps) {
  const mergedLabels = { ...DEFAULT_BLOCK_EDITOR_LABELS, ...labels };

  return (
    <BlockEditorContext.Provider
      value={{
        editor,
        labels: mergedLabels,
        variant,
      }}
    >
      {children}
    </BlockEditorContext.Provider>
  );
}
