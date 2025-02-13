
import HeroSection from "./components/HeroSection";
import LandingPageNavbar from "./components/LandingPageNavbar";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
        <LandingPageNavbar/>
        <HeroSection/>
    </div>
  );
}
