import { useEditorState } from "@tiptap/react";
import type { RichTextEditorLabels } from "../labels";
import type { RichTextEditorIcons } from "../icons";
import { useRichTextEditorContext } from "../rte-context";
import type { RichTextEditorControlProps } from "../types";
import React from "react";
import { Toggle } from "../ui/toggle";
import { cn } from "../ui/utils";

type IsActiveConfig =
  | { name: string; attributes?: Record<string, any> | string }
  | { attrs: Record<string, any> };

interface CreateControlProps {
  label: keyof RichTextEditorLabels;
  iconKey: keyof RichTextEditorIcons;
  isActive?: IsActiveConfig;
  isDisabled?: (editor: any) => boolean;
  operation: { name: string; attributes?: Record<string, any> | string };
}

export function RichTextEditorControl({
  active,
  interactive = true,
  className,
  children,
  onMouseDown,
  onClick,
  disabled,
  ...props
}: RichTextEditorControlProps) {
  return (
    <Toggle
      size="sm"
      pressed={active}
      disabled={disabled}
      aria-label={props["aria-label"]}
      title={props.title}
      className={cn("rte-control-button", className)}
      onMouseDown={(e) => {
        e.preventDefault();
        onMouseDown?.(e);
      }}
      onPressedChange={() => onClick?.({} as React.MouseEvent<HTMLButtonElement>)}
    >
      {children}
    </Toggle>
  );
}

export function createControl({
  label,
  iconKey,
  isActive,
  isDisabled,
  operation,
}: CreateControlProps) {
  function Control({ className }: { className?: string }) {
    const { editor, labels, icons } = useRichTextEditorContext();
    const ariaLabel = labels[label] as string;

    const editorState = useEditorState({
      editor: editor ?? null,
      selector: (ctx) => {
        const safeEditor =
          ctx.editor && !ctx.editor.isDestroyed ? ctx.editor : null;
        const checkIsActive = () => {
          if (!safeEditor || !isActive) return false;
          if ("attrs" in isActive) return safeEditor.isActive(isActive.attrs);
          return safeEditor.isActive(isActive.name, isActive.attributes);
        };

        return {
          active: checkIsActive(),
          disabled: safeEditor ? (isDisabled?.(safeEditor) ?? false) : true,
        };
      },
    });

    const active = editorState?.active ?? false;
    const disabled = editorState?.disabled ?? true;

    return (
      <RichTextEditorControl
        active={active}
        disabled={disabled}
        aria-label={ariaLabel}
        title={ariaLabel}
        className={className}
        onClick={() => {
          if (!editor || editor.isDestroyed) {
            return;
          }
          (editor as any)
            .chain()
            .focus()
            [operation.name](operation.attributes)
            .run();
        }}
      >
        {icons[iconKey]}
      </RichTextEditorControl>
    );
  }

  Control.displayName = `RichTextEditor.${String(label)}`;
  return Control;
}
