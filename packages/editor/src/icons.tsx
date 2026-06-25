import React from "react";

function Svg({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export interface RichTextEditorIcons {
  boldControlIcon: React.ReactNode;
  italicControlIcon: React.ReactNode;
  underlineControlIcon: React.ReactNode;
  strikeControlIcon: React.ReactNode;
  clearFormattingControlIcon: React.ReactNode;
  codeControlIcon: React.ReactNode;
  codeBlockControlIcon: React.ReactNode;
  h1ControlIcon: React.ReactNode;
  h2ControlIcon: React.ReactNode;
  h3ControlIcon: React.ReactNode;
  h4ControlIcon: React.ReactNode;
  h5ControlIcon: React.ReactNode;
  h6ControlIcon: React.ReactNode;
  bulletListControlIcon: React.ReactNode;
  orderedListControlIcon: React.ReactNode;
  blockquoteControlIcon: React.ReactNode;
  hrControlIcon: React.ReactNode;
  linkControlIcon: React.ReactNode;
  unlinkControlIcon: React.ReactNode;
  undoControlIcon: React.ReactNode;
  redoControlIcon: React.ReactNode;
  alignLeftControlIcon: React.ReactNode;
  alignCenterControlIcon: React.ReactNode;
  alignRightControlIcon: React.ReactNode;
  alignJustifyControlIcon: React.ReactNode;
  highlightControlIcon: React.ReactNode;
  subscriptControlIcon: React.ReactNode;
  superscriptControlIcon: React.ReactNode;
}

const iconProps = { className: "rte-editor-icon" };

export const DEFAULT_ICONS: RichTextEditorIcons = {
  boldControlIcon: (
    <Svg {...iconProps}>
      <path d="M6 4h7a4 4 0 0 1 0 8H6z" />
      <path d="M6 12h9a4 4 0 0 1 0 8H6z" />
    </Svg>
  ),
  italicControlIcon: (
    <Svg {...iconProps}>
      <line x1="19" y1="4" x2="10" y2="4" />
      <line x1="14" y1="20" x2="5" y2="20" />
      <line x1="15" y1="4" x2="9" y2="20" />
    </Svg>
  ),
  underlineControlIcon: (
    <Svg {...iconProps}>
      <path d="M6 4v6a6 6 0 0 0 12 0V4" />
      <line x1="4" y1="20" x2="20" y2="20" />
    </Svg>
  ),
  strikeControlIcon: (
    <Svg {...iconProps}>
      <path d="M16 4H9.5a3.5 3.5 0 0 0-2.9 5.4" />
      <path d="M14.5 14.6a3.5 3.5 0 0 1-2.9 5.4H8" />
      <line x1="4" y1="12" x2="20" y2="12" />
    </Svg>
  ),
  clearFormattingControlIcon: (
    <Svg {...iconProps}>
      <path d="M4 7V4h16v3" />
      <path d="M5 20h6" />
      <path d="M13 4 8 20" />
      <path d="m16 16 5 5" />
      <path d="m21 16-5 5" />
    </Svg>
  ),
  codeControlIcon: (
    <Svg {...iconProps}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </Svg>
  ),
  codeBlockControlIcon: (
    <Svg {...iconProps}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <polyline points="10 9 8 12 10 15" />
      <polyline points="14 9 16 12 14 15" />
    </Svg>
  ),
  h1ControlIcon: (
    <Svg {...iconProps}>
      <path d="M4 6v12" />
      <path d="M12 6v12" />
      <path d="M4 12h8" />
      <path d="m17 10 3-2v8" />
    </Svg>
  ),
  h2ControlIcon: (
    <Svg {...iconProps}>
      <path d="M4 6v12" />
      <path d="M12 6v12" />
      <path d="M4 12h8" />
      <path d="M17 9.5a2.5 2.5 0 0 1 4.8-1c0 2-4.8 2.5-4.8 5.5h5" />
    </Svg>
  ),
  h3ControlIcon: (
    <Svg {...iconProps}>
      <path d="M4 6v12" />
      <path d="M12 6v12" />
      <path d="M4 12h8" />
      <path d="M17.5 9.5c1.5-1 3.5-.2 3.5 1.3a1.8 1.8 0 0 1-1.8 1.7" />
      <path d="M19.2 12.5a1.8 1.8 0 0 1 1.8 1.7c0 1.5-2 2.3-3.5 1.3" />
    </Svg>
  ),
  h4ControlIcon: (
    <Svg {...iconProps}>
      <path d="M4 6v12" />
      <path d="M12 6v12" />
      <path d="M4 12h8" />
      <path d="M20 9v5h-4l3.5-5.5" />
      <path d="M20 14v3" />
    </Svg>
  ),
  h5ControlIcon: (
    <Svg {...iconProps}>
      <path d="M4 6v12" />
      <path d="M12 6v12" />
      <path d="M4 12h8" />
      <path d="M21 9h-4v3.5c2.5-.7 4.5.3 4.5 2a2.3 2.3 0 0 1-4.3 1.3" />
    </Svg>
  ),
  h6ControlIcon: (
    <Svg {...iconProps}>
      <path d="M4 6v12" />
      <path d="M12 6v12" />
      <path d="M4 12h8" />
      <path d="M20.5 9.5c-3 1-3.5 4-3.5 5.5a2.5 2.5 0 1 0 2.5-2.5c-1 0-2 .4-2.5 1" />
    </Svg>
  ),
  bulletListControlIcon: (
    <Svg {...iconProps}>
      <line x1="9" y1="6" x2="21" y2="6" />
      <line x1="9" y1="12" x2="21" y2="12" />
      <line x1="9" y1="18" x2="21" y2="18" />
      <circle cx="4" cy="6" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="4" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="4" cy="18" r="1.2" fill="currentColor" stroke="none" />
    </Svg>
  ),
  orderedListControlIcon: (
    <Svg {...iconProps}>
      <line x1="10" y1="6" x2="21" y2="6" />
      <line x1="10" y1="12" x2="21" y2="12" />
      <line x1="10" y1="18" x2="21" y2="18" />
      <path d="M4 5h2v4" />
      <path d="M4 9h2" />
      <path d="M4 13h2.5L4 16h2.5" />
      <path d="M4 19h2.5" />
    </Svg>
  ),
  blockquoteControlIcon: (
    <Svg {...iconProps}>
      <path d="M7 8a3 3 0 0 0-3 3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H6a3 3 0 0 1 2-3" />
      <path d="M16 8a3 3 0 0 0-3 3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a3 3 0 0 1 2-3" />
    </Svg>
  ),
  hrControlIcon: (
    <Svg {...iconProps}>
      <line x1="4" y1="12" x2="20" y2="12" />
    </Svg>
  ),
  linkControlIcon: (
    <Svg {...iconProps}>
      <path d="M9 17H7a5 5 0 0 1 0-10h2" />
      <path d="M15 7h2a5 5 0 0 1 0 10h-2" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </Svg>
  ),
  unlinkControlIcon: (
    <Svg {...iconProps}>
      <path d="M9 17H7a5 5 0 0 1-1.7-9.7" />
      <path d="M15 7h2a5 5 0 0 1 1.7 9.7" />
      <line x1="3" y1="3" x2="21" y2="21" />
    </Svg>
  ),
  undoControlIcon: (
    <Svg {...iconProps}>
      <path d="M9 14 4 9l5-5" />
      <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
    </Svg>
  ),
  redoControlIcon: (
    <Svg {...iconProps}>
      <path d="m15 14 5-5-5-5" />
      <path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13" />
    </Svg>
  ),
  alignLeftControlIcon: (
    <Svg {...iconProps}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="14" y2="12" />
      <line x1="4" y1="18" x2="17" y2="18" />
    </Svg>
  ),
  alignCenterControlIcon: (
    <Svg {...iconProps}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="5.5" y1="18" x2="18.5" y2="18" />
    </Svg>
  ),
  alignRightControlIcon: (
    <Svg {...iconProps}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="10" y1="12" x2="20" y2="12" />
      <line x1="7" y1="18" x2="20" y2="18" />
    </Svg>
  ),
  alignJustifyControlIcon: (
    <Svg {...iconProps}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </Svg>
  ),
  highlightControlIcon: (
    <Svg {...iconProps}>
      <path d="M9 11 3 17v3h3l6-6" />
      <path d="M14 6l4-4 4 4-4 4" />
      <path d="m9 11 4-4 5 5-4 4" />
    </Svg>
  ),
  subscriptControlIcon: (
    <Svg {...iconProps}>
      <path d="m4 4 8 9" />
      <path d="m12 4-8 9" />
      <path d="M19 16h-3.5c0-1.6 3.5-1.9 3.5-3.8a1.8 1.8 0 0 0-3.3-1" />
    </Svg>
  ),
  superscriptControlIcon: (
    <Svg {...iconProps}>
      <path d="m4 20 8-9" />
      <path d="m12 20-8-9" />
      <path d="M19 11h-3.5c0-1.6 3.5-1.9 3.5-3.8a1.8 1.8 0 0 0-3.3-1" />
    </Svg>
  ),
};
