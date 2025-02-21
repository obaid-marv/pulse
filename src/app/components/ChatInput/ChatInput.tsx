"use client";

import { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from "./ChatInput.module.scss";
import { Plus, SendHorizonalIcon } from "lucide-react";
import ToolbarButton from "./ToolbarButton";
import { bottomToolbarItems, ToolbarItem, topToolbarItems } from "./ToolbarItems";

interface ChatInputProps {
  onChange: (message: string) => void;
  handleSubmit: () => void;
  handleFileUpload: (fileData: { dataUrl: string; fileName: string }) => void;
}

export default function ChatInput({ onChange, handleSubmit, handleFileUpload }: ChatInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        handleFileUpload({ dataUrl, fileName: file.name });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextEditing = (item: ToolbarItem) => {
    if (!editor) return;
    switch (item.key) {
      case "bold":
        editor.chain().focus().toggleBold().run();
        break;
      case "italic":
        editor.chain().focus().toggleItalic().run();
        break;
      case "list":
        editor.chain().focus().toggleBulletList().run();
        break;
      case "listOrdered":
        editor.chain().focus().toggleOrderedList().run();
        break;
      case "code":
        editor.chain().focus().toggleCodeBlock().run();
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (editor && editor.getText().trim()) {
            handleSubmit();
            editor.commands.clearContent();
          }
        }}
        className={styles.container}
      >
        <div className={styles.topToolbar}>
          {topToolbarItems.map((item) =>
            item.divider ? (
              <div key={item.key} className={styles.divider}></div>
            ) : (
              <ToolbarButton
                key={item.key}
                icon={<item.Icon size={item.size} />}
                onClick={() => handleTextEditing(item)}
              />
            )
          )}
        </div>

        <EditorContent editor={editor} className={styles.editorContent} />

        <div className={styles.bottomToolbar}>
          <div className={styles.leftTools}>
            <ToolbarButton
              key="plus"
              icon={<Plus size={20} />}
              onClick={() => fileInputRef.current?.click()}
            />
            {bottomToolbarItems.map((item) => {
              if ("divider" in item && item.divider) {
                return <div key={item.key} className={styles.divider} />;
              } else {
                const Icon = item.Icon;
                return (
                  <ToolbarButton
                    key={item.key}
                    icon={<Icon size={item.size} />}
                    onClick={item.onClick}
                  />
                );
              }
            })}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={onFileChange}
              accept="image/*"
            />
          </div>
          <button
            type="submit"
            className={`${styles.sendButton} ${
              editor && editor.getText().trim() ? styles.active : ""
            }`}
          >
            <SendHorizonalIcon size={20} color={"#06334D"} />
          </button>
        </div>
      </form>
    </div>
  );
}
