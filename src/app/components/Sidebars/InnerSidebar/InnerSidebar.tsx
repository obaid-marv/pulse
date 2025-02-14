import styles from "./InnerSidebar.module.scss";

export default function InnerSidebar() {
  return (
    <aside className={styles.innerSidebar}>
      <h2>Inner Sidebar</h2>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
      </ul>
    </aside>
  );
}
