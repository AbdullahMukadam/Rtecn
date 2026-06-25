import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { EditorVariantsDemo, EditorClassNameDemo, EditorThemingDemo, EditorStickyToolbarDemo, EditorCustomControlsDemo, EditorReadOnlyDemo, EditorCustomLabelsDemo, EditorCustomIconsDemo } from '@/components/customization/editor-demos';
import { BlockEditorVariantsDemo, BlockEditorThemingDemo, BlockEditorClassNameDemo, BlockEditorCustomSlashCommandsDemo } from '@/components/customization/block-editor-demos';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    EditorVariantsDemo,
    EditorClassNameDemo,
    EditorThemingDemo,
    EditorStickyToolbarDemo,
    EditorCustomControlsDemo,
    EditorReadOnlyDemo,
    EditorCustomLabelsDemo,
    EditorCustomIconsDemo,
    BlockEditorVariantsDemo,
    BlockEditorThemingDemo,
    BlockEditorClassNameDemo,
    BlockEditorCustomSlashCommandsDemo,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
