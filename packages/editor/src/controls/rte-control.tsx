import { useEditorState } from "@tiptap/react";
import type { RichTextEditorLabels } from "../labels";
import { useRichTextEditorContext } from "../rte-context";
import type { RichTextEditorControlProps } from "../types";
import React from "react";
import { Toggle } from "../ui/toggle";
import { cn } from "../ui/utils";

interface CreateControlProps {
  label: keyof RichTextEditorLabels;
  icon:  React.ReactNode;
  isActive?: { name: string; attributes?: Record<string, any> | string };
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
      className={cn("h-8 w-8 p-0", className)}
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
  icon,
  isActive,
  isDisabled,
  operation,
}: CreateControlProps) {
  function Control({ className }: { className?: string }) {
    const { editor, labels } = useRichTextEditorContext();
    const ariaLabel = labels[label] as string;

    const editorState = useEditorState({
      editor: editor ?? null,
      selector: (ctx) => {
        const safeEditor =
          ctx.editor && !ctx.editor.isDestroyed ? ctx.editor : null;
        return {
          active:
            safeEditor && isActive?.name
              ? safeEditor.isActive(isActive.name, isActive.attributes)
              : false,
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
        {icon}
      </RichTextEditorControl>
    );
  }

  Control.displayName = `RichTextEditor.${String(label)}`;
  return Control;
}
