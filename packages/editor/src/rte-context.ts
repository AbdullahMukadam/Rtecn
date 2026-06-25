import { Editor } from "@tiptap/react";
import type { RichTextEditorLabels } from "./labels";
import type { RichTextEditorIcons } from "./icons";
import type { RichTextEditorVariant } from "./types";
import { createContext, useContext } from "react";

interface RichTextEditorContextValue {
  editor: Editor | null;
  labels: RichTextEditorLabels;
  icons: RichTextEditorIcons;
  variant: RichTextEditorVariant;
}

export const RichTextEditorContext = createContext<RichTextEditorContextValue | null>(null);

export function useRichTextEditorContext(): RichTextEditorContextValue {
  const context = useContext(RichTextEditorContext);
  if (!context) {
    throw new Error(
      "useRichTextEditorContext must be used within RichTextEditor"
    );
  }
  return context;
}

