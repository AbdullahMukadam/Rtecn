import type { SlashCommandSuggestionItem } from "./slash-command";
import type { SuggestionKeyDownProps, SuggestionProps } from "@tiptap/suggestion";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

export type SuggestionListProps = SuggestionProps<SlashCommandSuggestionItem, any>;

export interface SuggestionListHandle {
  onKeyDown: (props: SuggestionKeyDownProps) => boolean;
}

const SuggestionList = forwardRef<SuggestionListHandle, SuggestionListProps>(
  (props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index: number) => {
      const item = props.items[index];
      if (!item) return;
      props.command(item);
    };

    const upHandler = () => {
      setSelectedIndex(
        (selectedIndex + props.items.length - 1) % props.items.length,
      );
    };

    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % props.items.length);
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(0), [props.items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
        if (event.key === "ArrowUp") {
          upHandler();
          return true;
        }
        if (event.key === "ArrowDown") {
          downHandler();
          return true;
        }
        if (event.key === "Enter") {
          enterHandler();
          return true;
        }
        return false;
      },
    }));

    return (
      <div className="block-editor-slash-menu">
        <div className="block-editor-slash-menu-list">
          {props.items.length > 0 ? (
            props.items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={`block-editor-slash-menu-item${
                  i === selectedIndex ? " block-editor-slash-menu-item--selected" : ""
                }`}
                onClick={() => selectItem(i)}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <div className="block-editor-slash-menu-item-content">
                  <span className="block-editor-slash-menu-item-label">
                    {item.title}
                  </span>
                  <span className="block-editor-slash-menu-item-desc">
                    {item.description}
                  </span>
                </div>
              </button>
            ))
          ) : (
            <div className="block-editor-slash-menu-empty">No results</div>
          )}
        </div>
      </div>
    );
  },
);

export default SuggestionList;
