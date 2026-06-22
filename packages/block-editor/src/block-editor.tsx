import { EditorContent } from '@tiptap/react';
import DragHandle from '@tiptap/extension-drag-handle-react';
import { GripVertical } from 'lucide-react';
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
          <GripVertical className="block-editor-drag-handle-icon" />
        </DragHandle>
      )}
      {editor && <BlockActions editor={editor} />}
      {editor && <BubbleMenu editor={editor} />}
      <EditorContent editor={editor} className="block-editor-content" />
    </div>
  );
}

function BlockEditorRoot({ editor, children, className, labels, variant = "default" }: BlockEditorProps) {
  return (
    <BlockEditorProvider editor={editor} labels={labels} variant={variant}>
      <div className={cn(className)} data-variant={variant}>
        {children ?? <BlockEditorContent />}
      </div>
    </BlockEditorProvider>
  );
}

export const BlockEditor = Object.assign(BlockEditorRoot, {
  Content: BlockEditorContent,
  BubbleMenu,
});
