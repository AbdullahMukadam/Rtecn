"use client";

import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockItem,
} from "@rtecn/ui/components/kibo-ui/code-block";
import type { BundledLanguage } from "@rtecn/ui/components/kibo-ui/code-block";

type CodeBlockData = {
  language: string;
  filename: string;
  code: string;
};

export function EditorCodeBlock({ data }: { data: CodeBlockData[] }) {
  return (
    <div className="relative">
      <CodeBlock data={data} defaultValue={data[0].language}>
        <CodeBlockCopyButton className="absolute top-3 right-3 z-10" />
        <CodeBlockBody>
          {(item) => (
            <CodeBlockItem key={item.language} value={item.language}>
              <CodeBlockContent language={item.language as BundledLanguage}>
                {item.code}
              </CodeBlockContent>
            </CodeBlockItem>
          )}
        </CodeBlockBody>
      </CodeBlock>
    </div>
  );
}
