import { useState, useRef, useCallback } from "react";
import { BubbleMenu as TiptapBubbleMenu, type Editor } from "@tiptap/react";
import { isTextSelection } from "@tiptap/core";

interface BubbleMenuProps {
  editor: Editor | null;
}

interface SelectorResult {
  isParagraph: boolean;
  isHeading1: boolean;
  isHeading2: boolean;
  isHeading3: boolean;
  isBulletList: boolean;
  isOrderedList: boolean;
  isTaskList: boolean;
  isBlockquote: boolean;
  isCodeBlock: boolean;
}

interface NodeItem {
  name: string;
  command: (editor: Editor) => void;
  isActive: (state: SelectorResult) => boolean;
}

const nodeItems: NodeItem[] = [
  {
    name: "Text",
    command: (e) => (e.chain().focus() as any).setParagraph().run(),
    isActive: (s) =>
      s.isParagraph &&
      !s.isBulletList &&
      !s.isOrderedList &&
      !s.isTaskList &&
      !s.isBlockquote &&
      !s.isCodeBlock,
  },
  {
    name: "Heading 1",
    command: (e) =>
      (e.chain().focus() as any).toggleHeading({ level: 1 }).run(),
    isActive: (s) => s.isHeading1,
  },
  {
    name: "Heading 2",
    command: (e) =>
      (e.chain().focus() as any).toggleHeading({ level: 2 }).run(),
    isActive: (s) => s.isHeading2,
  },
  {
    name: "Heading 3",
    command: (e) =>
      (e.chain().focus() as any).toggleHeading({ level: 3 }).run(),
    isActive: (s) => s.isHeading3,
  },
  {
    name: "Bullet List",
    command: (e) => (e.chain().focus() as any).toggleBulletList().run(),
    isActive: (s) => s.isBulletList,
  },
  {
    name: "Numbered List",
    command: (e) => (e.chain().focus() as any).toggleOrderedList().run(),
    isActive: (s) => s.isOrderedList,
  },
  {
    name: "To-do List",
    command: (e) => (e.chain().focus() as any).toggleTaskList().run(),
    isActive: (s) => s.isTaskList,
  },
  {
    name: "Quote",
    command: (e) => (e.chain().focus() as any).toggleBlockquote().run(),
    isActive: (s) => s.isBlockquote,
  },
  {
    name: "Code Block",
    command: (e) => (e.chain().focus() as any).toggleCodeBlock().run(),
    isActive: (s) => s.isCodeBlock,
  },
];

function useEditorState(
  editor: Editor,
  selector: (e: Editor) => SelectorResult
): SelectorResult {
  const [state, setState] = useState<SelectorResult>(() => selector(editor));
  useState(() => {
    const update = () => setState(selector(editor));
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);
    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  });
  return state;
}

function NodeSelector({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const editorState = useEditorState(editor, (ed) => ({
    isParagraph: ed.isActive("paragraph"),
    isHeading1: ed.isActive("heading", { level: 1 }),
    isHeading2: ed.isActive("heading", { level: 2 }),
    isHeading3: ed.isActive("heading", { level: 3 }),
    isBulletList: ed.isActive("bulletList"),
    isOrderedList: ed.isActive("orderedList"),
    isTaskList: ed.isActive("taskList"),
    isBlockquote: ed.isActive("blockquote"),
    isCodeBlock: ed.isActive("codeBlock"),
  }));

  const activeItems = nodeItems.filter((i) => i.isActive(editorState));
  const activeName =
    activeItems.length > 1 ? "Multiple" : (activeItems[0]?.name ?? "Text");

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        className="block-editor-bubble-btn"
        onClick={() => setOpen(!open)}
      >
        <span className="block-editor-bubble-btn-text">{activeName}</span>
        <DropdownArrowIcon />
      </button>
      {open && (
        <>
          <div
            className="block-editor-bubble-overlay"
            onClick={() => setOpen(false)}
          />
          <div className="block-editor-bubble-dropdown">
            {nodeItems.map((item, i) => (
              <button
                key={i}
                type="button"
                className={`block-editor-bubble-dropdown-item${item.isActive(editorState) ? " block-editor-bubble-dropdown-item--active" : ""}`}
                onClick={() => {
                  item.command(editor);
                  setOpen(false);
                }}
              >
                <span>{item.name}</span>
                {item.isActive(editorState) && <CheckIcon />}
              </button>
            ))}
            <div className="block-editor-bubble-dropdown-divider" />
            <button
              type="button"
              className="block-editor-bubble-dropdown-item"
              onClick={() => {
                duplicateBlock(editor);
                setOpen(false);
              }}
            >
              <DuplicateIcon />
              <span>Duplicate</span>
            </button>
            <button
              type="button"
              className="block-editor-bubble-dropdown-item block-editor-bubble-dropdown-item--danger"
              onClick={() => {
                deleteBlock(editor);
                setOpen(false);
              }}
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

interface TextSelectorResult {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrike: boolean;
  isCode: boolean;
}

function useTextEditorState(
  editor: Editor,
  selector: (e: Editor) => TextSelectorResult
): TextSelectorResult {
  const [state, setState] = useState<TextSelectorResult>(() =>
    selector(editor)
  );
  useState(() => {
    const update = () => setState(selector(editor));
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);
    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  });
  return state;
}

const textItems = [
  {
    icon: <BoldIcon />,
    command: (e: Editor) => (e.chain().focus() as any).toggleBold().run(),
    isActive: (s: TextSelectorResult) => s.isBold,
  },
  {
    icon: <ItalicIcon />,
    command: (e: Editor) => (e.chain().focus() as any).toggleItalic().run(),
    isActive: (s: TextSelectorResult) => s.isItalic,
  },
  {
    icon: <UnderlineIcon />,
    command: (e: Editor) => (e.chain().focus() as any).toggleUnderline().run(),
    isActive: (s: TextSelectorResult) => s.isUnderline,
  },
  {
    icon: <StrikethroughIcon />,
    command: (e: Editor) => (e.chain().focus() as any).toggleStrike().run(),
    isActive: (s: TextSelectorResult) => s.isStrike,
  },
  {
    icon: <CodeIcon />,
    command: (e: Editor) => (e.chain().focus() as any).toggleCode().run(),
    isActive: (s: TextSelectorResult) => s.isCode,
  },
];

function TextButtons({ editor }: { editor: Editor }) {
  const editorState = useTextEditorState(editor, (ed) => ({
    isBold: ed.isActive("bold"),
    isItalic: ed.isActive("italic"),
    isUnderline: ed.isActive("underline"),
    isStrike: ed.isActive("strike"),
    isCode: ed.isActive("code"),
  }));

  return (
    <div className="block-editor-bubble-group">
      {textItems.map((item, i) => (
        <button
          key={i}
          type="button"
          className={`block-editor-bubble-btn${item.isActive(editorState) ? " block-editor-bubble-btn--active" : ""}`}
          onClick={() => item.command(editor)}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}

interface AlignSelectorResult {
  isAlignLeft: boolean;
  isAlignCenter: boolean;
  isAlignRight: boolean;
}

function useAlignEditorState(
  editor: Editor,
  selector: (e: Editor) => AlignSelectorResult
): AlignSelectorResult {
  const [state, setState] = useState<AlignSelectorResult>(() =>
    selector(editor)
  );
  useState(() => {
    const update = () => setState(selector(editor));
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);
    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  });
  return state;
}

const alignItems = [
  {
    label: "Left",
    icon: <AlignLeftIcon />,
    command: (e: Editor) =>
      (e.chain().focus() as any).setTextAlign("left").run(),
    isActive: (s: AlignSelectorResult) => s.isAlignLeft,
  },
  {
    label: "Center",
    icon: <AlignCenterIcon />,
    command: (e: Editor) =>
      (e.chain().focus() as any).setTextAlign("center").run(),
    isActive: (s: AlignSelectorResult) => s.isAlignCenter,
  },
  {
    label: "Right",
    icon: <AlignRightIcon />,
    command: (e: Editor) =>
      (e.chain().focus() as any).setTextAlign("right").run(),
    isActive: (s: AlignSelectorResult) => s.isAlignRight,
  },
];

function TextAlignSelector({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const editorState = useAlignEditorState(editor, (ed) => ({
    isAlignLeft:
      !ed.isActive({ textAlign: "center" } as any) &&
      !ed.isActive({ textAlign: "right" } as any),
    isAlignCenter: ed.isActive({ textAlign: "center" } as any),
    isAlignRight: ed.isActive({ textAlign: "right" } as any),
  }));

  const activeItem = alignItems.find((i) => i.isActive(editorState));

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        className="block-editor-bubble-btn"
        onClick={() => setOpen(!open)}
      >
        {activeItem ? activeItem.icon : <AlignLeftIcon />}
        <DropdownArrowIcon />
      </button>
      {open && (
        <>
          <div
            className="block-editor-bubble-overlay"
            onClick={() => setOpen(false)}
          />
          <div
            className="block-editor-bubble-dropdown block-editor-bubble-dropdown--align"
            style={{ right: 0, left: "auto" }}
          >
            {alignItems.map((item, i) => (
              <button
                key={i}
                type="button"
                className={`block-editor-bubble-dropdown-item${item.isActive(editorState) ? " block-editor-bubble-dropdown-item--active" : ""}`}
                onClick={() => {
                  item.command(editor);
                  setOpen(false);
                }}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.isActive(editorState) && <CheckIcon />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function LinkSelector({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isLink = editor.isActive("link");
  const linkUrl = editor.getAttributes("link").href || "";

  const handleSubmit = useCallback(
    (evt: React.FormEvent) => {
      evt.preventDefault();
      let url = inputRef.current?.value?.trim();
      if (!url) return;
      if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
      (editor.chain().focus() as any)
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
      setOpen(false);
    },
    [editor]
  );

  const handleUnlink = useCallback(() => {
    (editor.chain().focus() as any).unsetLink().run();
    setOpen(false);
  }, [editor]);

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        className={`block-editor-bubble-btn${isLink ? " block-editor-bubble-btn--active" : ""}`}
        onClick={() => setOpen(!open)}
        title="Link"
      >
        <LinkIcon />
      </button>
      {open && (
        <>
          <div
            className="block-editor-bubble-overlay"
            onClick={() => setOpen(false)}
          />
          <div
            className="block-editor-bubble-dropdown"
            style={{ right: 0, left: "auto", minWidth: "220px" }}
          >
            <form className="block-editor-link-form" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                className="block-editor-link-input"
                placeholder="Paste a link..."
                defaultValue={linkUrl}
                autoFocus
              />
              <div className="block-editor-link-actions">
                {isLink && (
                  <button
                    type="button"
                    className="block-editor-bubble-dropdown-item block-editor-bubble-dropdown-item--danger"
                    onClick={handleUnlink}
                    style={{ justifyContent: "center" }}
                  >
                    <UnlinkIcon />
                    <span>Remove</span>
                  </button>
                )}
                <button
                  type="submit"
                  className="block-editor-bubble-dropdown-item"
                  style={{ justifyContent: "center" }}
                >
                  <CheckIcon />
                  <span>{isLink ? "Update" : "Add"}</span>
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

function duplicateBlock(editor: Editor) {
  const { from } = editor.state.selection;
  const $from = editor.state.doc.resolve(from);
  const start = $from.before($from.depth);
  const end = $from.after($from.depth);
  if (start < 0 || end <= start) return;
  const node = editor.state.doc.slice(start, end);
  const pos = editor.state.doc.resolve(end);
  const insertPos = pos.after(pos.depth);
  editor.chain().focus().insertContentAt(insertPos, node.content).run();
}

function deleteBlock(editor: Editor) {
  const { from } = editor.state.selection;
  const $from = editor.state.doc.resolve(from);
  const depth = $from.depth;
  const start = $from.before(depth);
  const end = $from.after(depth);
  if (start < 0 || end <= start) return;
  editor.chain().focus().deleteRange({ from: start, to: end }).run();
}

export function BubbleMenu({ editor }: BubbleMenuProps) {
  if (!editor) return null;

  const hasTextAlign = editor.extensionManager.extensions.some(
    (ext) => (ext as any).name === "textAlign"
  );

  return (
    <TiptapBubbleMenu
      editor={editor as any}
      tippyOptions={{ placement: "top", offset: [0, 8] }}
      shouldShow={({ editor: ed, state }) => {
        const { selection } = state;
        if (!ed.isEditable) return false;
        if (selection.empty) return false;
        if (!isTextSelection(selection)) return false;
        return true;
      }}
    >
      <div className="block-editor-bubble-menu">
        <NodeSelector editor={editor} />
        <div className="block-editor-bubble-separator" />
        <TextButtons editor={editor} />
        <div className="block-editor-bubble-separator" />
        <LinkSelector editor={editor} />
        {hasTextAlign && (
          <>
            <div className="block-editor-bubble-separator" />
            <TextAlignSelector editor={editor} />
          </>
        )}
      </div>
    </TiptapBubbleMenu>
  );
}

/* SVG icons */
function BoldIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    </svg>
  );
}
function ItalicIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" x2="10" y1="4" y2="4" />
      <line x1="14" x2="5" y1="20" y2="20" />
      <line x1="15" x2="9" y1="4" y2="20" />
    </svg>
  );
}
function UnderlineIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 4v6a6 6 0 0 0 12 0V4" />
      <line x1="4" x2="20" y1="20" y2="20" />
    </svg>
  );
}
function StrikethroughIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 4H9a3 3 0 0 0-2.83 4" />
      <path d="M14 12a4 4 0 0 1 0 8H6" />
      <line x1="4" x2="20" y1="12" y2="12" />
    </svg>
  );
}
function CodeIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
function AlignLeftIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="21" x2="3" y1="6" y2="6" />
      <line x1="15" x2="3" y1="12" y2="12" />
      <line x1="17" x2="3" y1="18" y2="18" />
    </svg>
  );
}
function AlignCenterIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="21" x2="3" y1="6" y2="6" />
      <line x1="17" x2="7" y1="12" y2="12" />
      <line x1="19" x2="5" y1="18" y2="18" />
    </svg>
  );
}
function AlignRightIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="21" x2="3" y1="6" y2="6" />
      <line x1="21" x2="9" y1="12" y2="12" />
      <line x1="21" x2="7" y1="18" y2="18" />
    </svg>
  );
}
function DropdownArrowIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function DuplicateIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}
function DeleteIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
function UnlinkIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="22" y1="2" y2="22" />
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
