import { Editor, Extension, type Range } from "@tiptap/core";
import { PluginKey } from "@tiptap/pm/state";
import Suggestion, { type SuggestionOptions } from "@tiptap/suggestion";

type OnCommandSelect = (props: { editor: Editor; range: Range }) => void;

export interface SlashCommandSuggestionItem {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  command: OnCommandSelect;
}

export interface SlashCommandOptions<Item extends SlashCommandSuggestionItem = any> {
  suggestion: Omit<SuggestionOptions<Item, any>, "editor">;
}

export const slashCommandPluginKey = new PluginKey("slashCommand");

export const SlashCommand = Extension.create<SlashCommandOptions>({
  name: "slashCommand",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        pluginKey: slashCommandPluginKey,
        command: ({ editor, range, props }) => {
          props.command({ editor, range });
        },
        allow: ({ editor }) => {
          if (editor.isActive("codeBlock")) return false;
          return true;
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});
