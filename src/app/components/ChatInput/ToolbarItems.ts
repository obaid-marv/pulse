import { Bold, Italic, Link, List, ListOrdered, Code, Type, Smile, Video, Mic } from "lucide-react";
import { ForwardRefExoticComponent, ElementType } from "react";
import { LucideProps } from "lucide-react";

export type ToolbarItem =
  | {
      divider: true;
      key: string;
    }
  | {
      divider?: false;
      Icon: ElementType<LucideProps>;
      key: string;
      size: number;
      onClick?: () => void;
    };
export const topToolbarItems: ToolbarItem[] = [
  { Icon: Bold, key: "bold", size: 18 },
  { Icon: Italic, key: "italic", size: 18 },
  { Icon: Link, key: "link", size: 18 },
  { divider: true, key: "divider1" },
  { Icon: List, key: "list", size: 18 },
  { Icon: ListOrdered, key: "listOrdered", size: 18 },
  { divider: true, key: "divider2" },
  { Icon: Code, key: "code", size: 18 },
];

export const bottomToolbarItems: ToolbarItem[] = [
  { Icon: Italic, key: "italic-bottom", size: 20 },
  { Icon: Type, key: "type", size: 20 },
  { Icon: Smile, key: "smile", size: 20 },
  { Icon: Video, key: "video", size: 20 },
  { Icon: Mic, key: "mic", size: 20 },
];
