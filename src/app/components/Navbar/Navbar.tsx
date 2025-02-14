import SearchBar from "./components/SearchBar";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <SearchBar/>
    </nav>
  );
}
