import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import InnerSidebar from "../components/Sidebars/InnerSidebar";
import OuterSidebar from "../components/Sidebars/OuterSidebar";
import styles from "./layout.module.scss";
import { roboto } from "../fonts";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={`${styles.layout} ${roboto.variable}`}>
      <Navbar />
      <OuterSidebar />
      <InnerSidebar />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
