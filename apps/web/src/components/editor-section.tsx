"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@rtecn/ui/components/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@rtecn/ui/components/tabs";
import { EditorPreview } from "@/components/editor-preview";
import { BlockEditorPreview } from "@/components/block-editor-preview";
import { EditorCodeBlock } from "@/components/editor-code-block";
import type { RichTextEditorVariant } from "@rtecn/editor";

type CodeFile = {
  language: string;
  filename: string;
  code: string;
};

type EditorSectionProps = {
  type: "editor" | "block-editor";
  title: string;
  badge: string;
  badgeClass?: string;
  description: string;
  codeData: CodeFile[];
  docsHref: string;
};

const VARIANTS: { label: string; value: RichTextEditorVariant }[] = [
  { label: "Default", value: "default" },
  { label: "Subtle", value: "subtle" },
  { label: "Compact", value: "compact" },
];

export function EditorSection(props: EditorSectionProps) {
  const [variant, setVariant] = useState<RichTextEditorVariant>("default");

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <h2 className="text-lg font-medium tracking-tight text-foreground">{props.title}</h2>
        <span className={props.badgeClass ?? "inline-flex h-5 items-center rounded-full bg-foreground px-2 text-[11px] font-medium tracking-wider text-background"}>
          {props.badge}
        </span>
      </div>
      <p className="mb-4 text-base text-muted-foreground">{props.description}</p>

      {props.type === "editor" && (
        <div className="mb-3 flex gap-1">
          {VARIANTS.map((v) => (
            <Button
              key={v.value}
              variant={variant === v.value ? "default" : "outline"}
              size="sm"
              onClick={() => setVariant(v.value)}
            >
              {v.label}
            </Button>
          ))}
        </div>
      )}

      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="pt-4">
          {props.type === "editor" ? (
            <EditorPreview variant={variant} />
          ) : (
            <BlockEditorPreview />
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
