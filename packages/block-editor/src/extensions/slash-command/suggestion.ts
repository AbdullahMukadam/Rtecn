import { computePosition, flip, shift } from "@floating-ui/dom";
import { Editor, posToDOMRect, ReactRenderer } from "@tiptap/react";
import type { SuggestionOptions } from "@tiptap/suggestion";
import type { SlashCommandSuggestionItem } from "./slash-command";
import SuggestionList, {
  type SuggestionListHandle,
  type SuggestionListProps,
} from "./suggestion-list";

type SuggestionType = Omit<
  SuggestionOptions<SlashCommandSuggestionItem, any>,
  "editor"
>;

export const defaultSlashCommandItems: SlashCommandSuggestionItem[] = [
  {
    id: "text",
    title: "Text",
    description: "Just start typing with plain text.",
    keywords: ["p", "paragraph"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .run();
    },
  },
  {
    id: "h1",
    title: "Heading 1",
    description: "Big section heading.",
    keywords: ["title", "big", "large", "heading"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
  },
  {
    id: "h2",
    title: "Heading 2",
    description: "Medium section heading.",
    keywords: ["subtitle", "medium", "heading"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
  },
  {
    id: "h3",
    title: "Heading 3",
    description: "Small section heading.",
    keywords: ["subtitle", "small", "heading"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run();
    },
  },
  {
    id: "bulletList",
    title: "Bullet List",
    description: "Create a simple bullet list.",
    keywords: ["unordered", "list", "bullet"],
    command: ({ editor, range }) => {
      (editor.chain().focus() as any).deleteRange(range).toggleBulletList().run();
    },
  },
  {
    id: "orderedList",
    title: "Numbered List",
    description: "Create a list with numbering.",
    keywords: ["ordered", "list"],
    command: ({ editor, range }) => {
      (editor.chain().focus() as any).deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    id: "taskList",
    title: "Task List",
    description: "Create a task list with checkboxes.",
    keywords: ["task", "todo", "checkbox"],
    command: ({ editor, range }) => {
      (editor.chain().focus() as any).deleteRange(range).toggleTaskList().run();
    },
  },
  {
    id: "blockquote",
    title: "Quote",
    description: "Capture a quote.",
    keywords: ["blockquote"],
    command: ({ editor, range }) =>
      (editor
        .chain()
        .focus() as any)
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .toggleBlockquote()
        .run(),
  },
  {
    id: "codeBlock",
    title: "Code",
    description: "Capture a code snippet.",
    keywords: ["codeblock"],
    command: ({ editor, range }) =>
      (editor.chain().focus() as any)
        .deleteRange(range)
        .toggleCodeBlock({ language: "plaintext" })
        .run(),
  },
  {
    id: "divider",
    title: "Divider",
    description: "Create a horizontal divider.",
    keywords: ["divider"],
    command: ({ editor, range }) =>
      (editor.chain().focus() as any).deleteRange(range).setHorizontalRule().run(),
  },
  {
    id: "image",
    title: "Image",
    description: "Insert an image.",
    keywords: ["image", "img", "picture", "photo"],
    command: ({ editor, range }) => {
      const url = window.prompt("Enter image URL");
      if (!url) return;
      (editor.chain().focus() as any).deleteRange(range).setImage({ src: url }).run();
    },
  },
  {
    id: "table",
    title: "Table",
    description: "Insert a table.",
    keywords: ["table", "grid"],
    command: ({ editor, range }) => {
      (editor.chain().focus() as any)
        .deleteRange(range)
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run();
    },
  },
];

function updatePosition(editor: Editor, element: Element) {
  if (!(element instanceof HTMLElement)) return;

  const virtualElement = {
    getBoundingClientRect: () =>
      posToDOMRect(editor.view, editor.state.selection.from, editor.state.selection.to),
  };

  computePosition(virtualElement, element, {
    placement: "bottom-start",
    strategy: "absolute",
    middleware: [shift(), flip()],
  }).then(({ x, y, strategy }) => {
    element.style.width = "max-content";
    element.style.position = strategy;
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  });
}

export function getSlashCommandSuggestion(): SuggestionType {
  return {
    items: ({ query }) => {
      return defaultSlashCommandItems.filter((item) =>
        item.keywords.some((k) => k.startsWith(query.toLowerCase())),
      );
    },
    render: () => {
      let component: ReactRenderer<SuggestionListHandle, SuggestionListProps>;

      return {
        onStart: (props) => {
          component = new ReactRenderer(SuggestionList, {
            props,
            editor: props.editor,
          });

          if (!props.clientRect) return;

          if (component.element instanceof HTMLElement) {
            component.element.style.position = "absolute";
            document.body.appendChild(component.element);
            updatePosition(props.editor, component.element);
          }
        },

        onUpdate(props) {
          component.updateProps(props);
          if (!props.clientRect) return;
          updatePosition(props.editor, component.element);
        },

        onKeyDown(props) {
          if (props.event.key === "Escape") {
            return true;
          }
          return component.ref?.onKeyDown(props) ?? false;
        },

        onExit() {
          component?.element.remove();
          component?.destroy();
        },
      };
    },
  };
}
