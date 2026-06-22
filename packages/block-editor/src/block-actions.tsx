import { useState, useCallback } from "react";
import type { Editor } from "@tiptap/react";

interface BlockActionsProps {
  editor: Editor | null;
}

export function BlockActions({ editor }: BlockActionsProps) {
  const [open, setOpen] = useState(false);

  if (!editor) return null;

  const handleDuplicate = useCallback(() => {
    const { from } = editor.state.selection;
    const $from = editor.state.doc.resolve(from);
    const start = $from.before($from.depth);
    const end = $from.after($from.depth);
    if (start < 0 || end <= start) return;
    const node = editor.state.doc.slice(start, end);
    const pos = editor.state.doc.resolve(end);
    const insertPos = pos.after(pos.depth);
    editor.chain().focus().insertContentAt(insertPos, node.content).run();
    setOpen(false);
  }, [editor]);

  const handleDelete = useCallback(() => {
    const { from } = editor.state.selection;
    const $from = editor.state.doc.resolve(from);
    const depth = $from.depth;
    const start = $from.before(depth);
    const end = $from.after(depth);
    if (start < 0 || end <= start) return;
    editor.chain().focus().deleteRange({ from: start, to: end }).run();
    setOpen(false);
  }, [editor]);

  return (
    <div className="block-editor-block-actions" onClick={(e) => e.stopPropagation()}>
      {open && (
        <>
          <div className="block-editor-bubble-overlay" onClick={() => setOpen(false)} />
          <div className="block-editor-block-actions-dropdown">
            <button
              type="button"
              className="block-editor-block-actions-item"
              onClick={handleDuplicate}
            >
              <DuplicateIcon />
              <span>Duplicate</span>
            </button>
            <button
              type="button"
              className="block-editor-block-actions-item block-editor-block-actions-item--danger"
              onClick={handleDelete}
            >
              <DeleteIcon />
              <span>Delete</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function DuplicateIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}
