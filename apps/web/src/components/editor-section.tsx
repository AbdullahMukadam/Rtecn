"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@rtecn/ui/components/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@rtecn/ui/components/tabs";
import { EditorPreview } from "@/components/editor-preview";
import { BlockEditorPreview } from "@/components/block-editor-preview";
import { EditorCodeBlock } from "@/components/editor-code-block";
import type { RichTextEditorVariant } from "@rtecn/editor";
import type { BlockEditorVariant } from "@rtecn/block-editor";

type CodeFile = {
  language: string;
  filename: string;
  code: string;
};

type EditorSectionProps =
  | {
      type: "editor";
      title: string;
      badge: string;
      badgeClass?: string;
      description: string;
      codeData: CodeFile[];
      docsHref: string;
    }
  | {
      type: "block-editor";
      title: string;
      badge: string;
      badgeClass?: string;
      description: string;
      codeData: CodeFile[];
      docsHref: string;
    };

const EDITOR_VARIANTS: { label: string; value: RichTextEditorVariant }[] = [
  { label: "Default", value: "default" },
  { label: "Subtle", value: "subtle" },
  { label: "Compact", value: "compact" },
];

const BLOCK_EDITOR_VARIANTS: { label: string; value: BlockEditorVariant }[] = [
  { label: "Default", value: "default" },
  { label: "Minimal", value: "minimal" },
];

export function EditorSection(props: EditorSectionProps) {
  const [editorVariant, setEditorVariant] = useState<RichTextEditorVariant>("default");
  const [blockEditorVariant, setBlockEditorVariant] = useState<BlockEditorVariant>("default");

  const variants = props.type === "editor" ? EDITOR_VARIANTS : BLOCK_EDITOR_VARIANTS;
  const currentVariant = props.type === "editor" ? editorVariant : blockEditorVariant;
  const setVariant = (v: string) => {
    if (props.type === "editor") {
      setEditorVariant(v as RichTextEditorVariant);
    } else {
      setBlockEditorVariant(v as BlockEditorVariant);
    }
  };

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <h2 className="text-lg font-medium tracking-tight text-foreground">{props.title}</h2>
        <span className={props.badgeClass ?? "inline-flex h-5 items-center rounded-full bg-foreground px-2 text-[11px] font-medium tracking-wider text-background"}>
          {props.badge}
        </span>
      </div>
      <p className="mb-4 text-base text-muted-foreground">{props.description}</p>

      <div className="mb-3 flex gap-1">
        {variants.map((v) => (
          <Button
            key={v.value}
            variant={currentVariant === v.value ? "default" : "outline"}
            size="sm"
            onClick={() => setVariant(v.value)}
          >
            {v.label}
          </Button>
        ))}
      </div>

      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="pt-4">
          {props.type === "editor" ? (
            <EditorPreview variant={editorVariant} />
          ) : (
            <BlockEditorPreview variant={blockEditorVariant} />
          )}
        </TabsContent>
        <TabsContent value="code" className="pt-4">
          <EditorCodeBlock data={props.codeData} />
        </TabsContent>
      </Tabs>
      <div className="mt-3">
        <Link href={props.docsHref}>
          <Button variant="link" className="h-auto px-0">View docs &rarr;</Button>
        </Link>
      </div>
    </div>
  );
}
