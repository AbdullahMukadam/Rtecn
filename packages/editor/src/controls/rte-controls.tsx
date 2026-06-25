import { createControl } from './rte-control';

export const BoldControl = createControl({
  label: 'boldControlLabel',
  iconKey: 'boldControlIcon',
  isActive: { name: 'bold' },
  operation: { name: 'toggleBold' },
});

export const ItalicControl = createControl({
  label: 'italicControlLabel',
  iconKey: 'italicControlIcon',
  isActive: { name: 'italic' },
  operation: { name: 'toggleItalic' },
});

export const UnderlineControl = createControl({
  label: 'underlineControlLabel',
  iconKey: 'underlineControlIcon',
  isActive: { name: 'underline' },
  operation: { name: 'toggleUnderline' },
});

export const StrikethroughControl = createControl({
  label: 'strikeControlLabel',
  iconKey: 'strikeControlIcon',
  isActive: { name: 'strike' },
  operation: { name: 'toggleStrike' },
});

export const ClearFormattingControl = createControl({
  label: 'clearFormattingControlLabel',
  iconKey: 'clearFormattingControlIcon',
  operation: { name: 'unsetAllMarks' },
});

export const CodeControl = createControl({
  label: 'codeControlLabel',
  iconKey: 'codeControlIcon',
  isActive: { name: 'code' },
  operation: { name: 'toggleCode' },
});

export const CodeBlockControl = createControl({
  label: 'codeBlockControlLabel',
  iconKey: 'codeBlockControlIcon',
  isActive: { name: 'codeBlock' },
  operation: { name: 'toggleCodeBlock' },
});

export const H1Control = createControl({
  label: 'h1ControlLabel',
  iconKey: 'h1ControlIcon',
  isActive: { name: 'heading', attributes: { level: 1 } },
  operation: { name: 'toggleHeading', attributes: { level: 1 } },
});

export const H2Control = createControl({
  label: 'h2ControlLabel',
  iconKey: 'h2ControlIcon',
  isActive: { name: 'heading', attributes: { level: 2 } },
  operation: { name: 'toggleHeading', attributes: { level: 2 } },
});

export const H3Control = createControl({
  label: 'h3ControlLabel',
  iconKey: 'h3ControlIcon',
  isActive: { name: 'heading', attributes: { level: 3 } },
  operation: { name: 'toggleHeading', attributes: { level: 3 } },
});

export const H4Control = createControl({
  label: 'h4ControlLabel',
  iconKey: 'h4ControlIcon',
  isActive: { name: 'heading', attributes: { level: 4 } },
  operation: { name: 'toggleHeading', attributes: { level: 4 } },
});

export const BulletListControl = createControl({
  label: 'bulletListControlLabel',
  iconKey: 'bulletListControlIcon',
  isActive: { name: 'bulletList' },
  operation: { name: 'toggleBulletList' },
});

export const OrderedListControl = createControl({
  label: 'orderedListControlLabel',
  iconKey: 'orderedListControlIcon',
  isActive: { name: 'orderedList' },
  operation: { name: 'toggleOrderedList' },
});

export const BlockquoteControl = createControl({
  label: 'blockquoteControlLabel',
  iconKey: 'blockquoteControlIcon',
  isActive: { name: 'blockquote' },
  operation: { name: 'toggleBlockquote' },
});

export const HrControl = createControl({
  label: 'hrControlLabel',
  iconKey: 'hrControlIcon',
  operation: { name: 'setHorizontalRule' },
});

export const UnlinkControl = createControl({
  label: 'unlinkControlLabel',
  iconKey: 'unlinkControlIcon',
  operation: { name: 'unsetLink' },
});

export const UndoControl = createControl({
  label: 'undoControlLabel',
  iconKey: 'undoControlIcon',
  isDisabled: (editor) => !editor.can().undo(),
  operation: { name: 'undo' },
});

export const RedoControl = createControl({
  label: 'redoControlLabel',
  iconKey: 'redoControlIcon',
  isDisabled: (editor) => !editor.can().redo(),
  operation: { name: 'redo' },
});

export const H5Control = createControl({
  label: 'h5ControlLabel',
  iconKey: 'h5ControlIcon',
  isActive: { name: 'heading', attributes: { level: 5 } },
  operation: { name: 'toggleHeading', attributes: { level: 5 } },
});

export const H6Control = createControl({
  label: 'h6ControlLabel',
  iconKey: 'h6ControlIcon',
  isActive: { name: 'heading', attributes: { level: 6 } },
  operation: { name: 'toggleHeading', attributes: { level: 6 } },
});

export const AlignLeftControl = createControl({
  label: 'alignLeftControlLabel',
  iconKey: 'alignLeftControlIcon',
  operation: { name: 'setTextAlign', attributes: 'left' },
});

export const AlignCenterControl = createControl({
  label: 'alignCenterControlLabel',
  iconKey: 'alignCenterControlIcon',
  isActive: { attrs: { textAlign: 'center' } },
  operation: { name: 'setTextAlign', attributes: 'center' },
});

export const AlignRightControl = createControl({
  label: 'alignRightControlLabel',
  iconKey: 'alignRightControlIcon',
  isActive: { attrs: { textAlign: 'right' } },
  operation: { name: 'setTextAlign', attributes: 'right' },
});

export const AlignJustifyControl = createControl({
  label: 'alignJustifyControlLabel',
  iconKey: 'alignJustifyControlIcon',
  isActive: { attrs: { textAlign: 'justify' } },
  operation: { name: 'setTextAlign', attributes: 'justify' },
});

export const HighlightControl = createControl({
  label: 'highlightControlLabel',
  iconKey: 'highlightControlIcon',
  isActive: { name: 'highlight' },
  operation: { name: 'toggleHighlight' },
});

export const SubscriptControl = createControl({
  label: 'subscriptControlLabel',
  iconKey: 'subscriptControlIcon',
  isActive: { name: 'subscript' },
  operation: { name: 'toggleSubscript' },
});

export const SuperscriptControl = createControl({
  label: 'superscriptControlLabel',
  iconKey: 'superscriptControlIcon',
  isActive: { name: 'superscript' },
  operation: { name: 'toggleSuperscript' },
});