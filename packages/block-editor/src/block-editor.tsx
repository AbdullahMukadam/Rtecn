import { EditorContent } from '@tiptap/react';
import DragHandle from '@tiptap/extension-drag-handle-react';
import { cn } from './lib/utils';
import { BlockEditorProvider, useBlockEditorContext } from './context';
import { BubbleMenu } from './bubble-menu';
import { BlockActions } from './block-actions';
import type { BlockEditorProps } from './types';

function BlockEditorContent() {
  const { editor } = useBlockEditorContext();

  return (
    <div className="block-editor">
      {editor && (
        <DragHandle editor={editor}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="block-editor-drag-handle-icon">
            <circle cx="9" cy="5" r="1" />
            <circle cx="15" cy="5" r="1" />
            <circle cx="9" cy="12" r="1" />
            <circle cx="15" cy="12" r="1" />
            <circle cx="9" cy="19" r="1" />
            <circle cx="15" cy="19" r="1" />
          </svg>
        </DragHandle>
      )}
      {editor && <BlockActions editor={editor} />}
      {editor && <BubbleMenu editor={editor} />}
      <EditorContent editor={editor} className="block-editor-content" />
    </div>
  );
}

function BlockEditorRoot({ editor, children, className, labels }: BlockEditorProps) {
  return (
    <BlockEditorProvider editor={editor} labels={labels}>
      <div className={cn("block-editor", className)}>
        {children ?? <BlockEditorContent />}
      </div>
    </BlockEditorProvider>
  );
}

export const BlockEditor = Object.assign(BlockEditorRoot, {
  Content: BlockEditorContent,
  BubbleMenu,
});
