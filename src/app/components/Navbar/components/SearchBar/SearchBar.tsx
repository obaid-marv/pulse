"use client";
import { useState } from "react";
import styles from "./SearchBar.module.scss";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        placeholder="Search QLU Recruiting"
        onChange={(e) => setInputValue(e.target.value)}
        className={styles.input}
      />
    </div>
  );
}
