"use client";
import useMyDetails from "@/hooks/Auth/useGetMyDetails";
import HeroSection from "./components/HeroSection";
import LandingPageNavbar from "./components/LandingPageNavbar";
import styles from "./page.module.scss";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import getToken from "../utils/getToken";
import Cookies from "js-cookie";

export default function Home() {
  const { data, isPending, refetch } = useMyDetails();
  const token = getToken();
  const router = useRouter();
  const isVerified = Cookies.get("isVerified");

  useEffect(() => {
    if (!data && !isPending && token) {
      refetch();
    }
    if (data?.success && isVerified == "true") {
      router.push("/home");
    }
  }, [data, refetch]);

  return (
    <div className={styles.page}>
      <LandingPageNavbar />
      <HeroSection />
    </div>
  );
}
