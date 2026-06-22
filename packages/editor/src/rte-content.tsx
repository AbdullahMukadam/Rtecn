import { EditorContent } from "@tiptap/react";
import { cn } from "./ui/utils";
import { useRichTextEditorContext } from "./rte-context";
import type { RichTextEditorContentProps } from "./types";

export function Content({ className }: RichTextEditorContentProps) {
  const { editor } = useRichTextEditorContext();

  return (
    <EditorContent
      editor={editor}
      className={cn(
        "rte-content w-full",
        className
      )}
    />
  );
}
