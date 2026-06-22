import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  RemoveFormatting,
  Code,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  TextQuote,
  Minus,
  Unlink,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  Subscript,
  Superscript,
} from 'lucide-react';
import { createControl } from './rte-control';

const iconProps = { className: 'h-4 w-4' };

export const BoldControl = createControl({
  label: 'boldControlLabel',
  icon: <Bold {...iconProps} />,
  isActive: { name: 'bold' },
  operation: { name: 'toggleBold' },
});

export const ItalicControl = createControl({
  label: 'italicControlLabel',
  icon: <Italic {...iconProps} />,
  isActive: { name: 'italic' },
  operation: { name: 'toggleItalic' },
});

export const UnderlineControl = createControl({
  label: 'underlineControlLabel',
  icon: <Underline {...iconProps} />,
  isActive: { name: 'underline' },
  operation: { name: 'toggleUnderline' },
});

export const StrikethroughControl = createControl({
  label: 'strikeControlLabel',
  icon: <Strikethrough {...iconProps} />,
  isActive: { name: 'strike' },
  operation: { name: 'toggleStrike' },
});

export const ClearFormattingControl = createControl({
  label: 'clearFormattingControlLabel',
  icon: <RemoveFormatting {...iconProps} />,
  operation: { name: 'unsetAllMarks' },
});

export const CodeControl = createControl({
  label: 'codeControlLabel',
  icon: <Code {...iconProps} />,
  isActive: { name: 'code' },
  operation: { name: 'toggleCode' },
});

export const CodeBlockControl = createControl({
  label: 'codeBlockControlLabel',
  icon: <Code2 {...iconProps} />,
  isActive: { name: 'codeBlock' },
  operation: { name: 'toggleCodeBlock' },
});

export const H1Control = createControl({
  label: 'h1ControlLabel',
  icon: <Heading1 {...iconProps} />,
  isActive: { name: 'heading', attributes: { level: 1 } },
  operation: { name: 'toggleHeading', attributes: { level: 1 } },
});

export const H2Control = createControl({
  label: 'h2ControlLabel',
  icon: <Heading2 {...iconProps} />,
  isActive: { name: 'heading', attributes: { level: 2 } },
  operation: { name: 'toggleHeading', attributes: { level: 2 } },
});

export const H3Control = createControl({
  label: 'h3ControlLabel',
  icon: <Heading3 {...iconProps} />,
  isActive: { name: 'heading', attributes: { level: 3 } },
  operation: { name: 'toggleHeading', attributes: { level: 3 } },
});

export const H4Control = createControl({
  label: 'h4ControlLabel',
  icon: <Heading4 {...iconProps} />,
  isActive: { name: 'heading', attributes: { level: 4 } },
  operation: { name: 'toggleHeading', attributes: { level: 4 } },
});

export const BulletListControl = createControl({
  label: 'bulletListControlLabel',
  icon: <List {...iconProps} />,
  isActive: { name: 'bulletList' },
  operation: { name: 'toggleBulletList' },
});

export const OrderedListControl = createControl({
  label: 'orderedListControlLabel',
  icon: <ListOrdered {...iconProps} />,
  isActive: { name: 'orderedList' },
  operation: { name: 'toggleOrderedList' },
});

export const BlockquoteControl = createControl({
  label: 'blockquoteControlLabel',
  icon: <TextQuote {...iconProps} />,
  isActive: { name: 'blockquote' },
  operation: { name: 'toggleBlockquote' },
});

export const HrControl = createControl({
  label: 'hrControlLabel',
  icon: <Minus {...iconProps} />,
  operation: { name: 'setHorizontalRule' },
});

export const UnlinkControl = createControl({
  label: 'unlinkControlLabel',
  icon: <Unlink {...iconProps} />,
  operation: { name: 'unsetLink' },
});

export const UndoControl = createControl({
  label: 'undoControlLabel',
  icon: <Undo {...iconProps} />,
  isDisabled: (editor) => !editor.can().undo(),
  operation: { name: 'undo' },
});

export const RedoControl = createControl({
  label: 'redoControlLabel',
  icon: <Redo {...iconProps} />,
  isDisabled: (editor) => !editor.can().redo(),
  operation: { name: 'redo' },
});

export const H5Control = createControl({
  label: 'h5ControlLabel',
  icon: <Heading5 {...iconProps} />,
  isActive: { name: 'heading', attributes: { level: 5 } },
  operation: { name: 'toggleHeading', attributes: { level: 5 } },
});

export const H6Control = createControl({
  label: 'h6ControlLabel',
  icon: <Heading6 {...iconProps} />,
  isActive: { name: 'heading', attributes: { level: 6 } },
  operation: { name: 'toggleHeading', attributes: { level: 6 } },
});

export const AlignLeftControl = createControl({
  label: 'alignLeftControlLabel',
  icon: <AlignLeft {...iconProps} />,
  operation: { name: 'setTextAlign', attributes: 'left' },
});

export const AlignCenterControl = createControl({
  label: 'alignCenterControlLabel',
  icon: <AlignCenter {...iconProps} />,
  operation: { name: 'setTextAlign', attributes: 'center' },
});

export const AlignRightControl = createControl({
  label: 'alignRightControlLabel',
  icon: <AlignRight {...iconProps} />,
  operation: { name: 'setTextAlign', attributes: 'right' },
});

export const AlignJustifyControl = createControl({
  label: 'alignJustifyControlLabel',
  icon: <AlignJustify {...iconProps} />,
  operation: { name: 'setTextAlign', attributes: 'justify' },
});

export const HighlightControl = createControl({
  label: 'highlightControlLabel',
  icon: <Highlighter {...iconProps} />,
  isActive: { name: 'highlight' },
  operation: { name: 'toggleHighlight' },
});

export const SubscriptControl = createControl({
  label: 'subscriptControlLabel',
  icon: <Subscript {...iconProps} />,
  isActive: { name: 'subscript' },
  operation: { name: 'toggleSubscript' },
});

export const SuperscriptControl = createControl({
  label: 'superscriptControlLabel',
  icon: <Superscript {...iconProps} />,
  isActive: { name: 'superscript' },
  operation: { name: 'toggleSuperscript' },
});