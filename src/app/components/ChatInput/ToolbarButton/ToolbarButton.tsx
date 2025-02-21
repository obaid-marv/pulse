"use client";

import React from "react";
import styles from "./ToolbarButton.module.scss";

interface ToolbarButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export default function ToolbarButton({
  icon,
  onClick,
  type = "button",
  className,
}: ToolbarButtonProps) {
  return (
    <button type={type} onClick={onClick} className={styles.toolbarButton}>
      {icon}
    </button>
  );
}
