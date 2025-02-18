"use client"
import useMyDetails from "@/hooks/Auth/useGetMyDetails";
import HeroSection from "./components/HeroSection";
import LandingPageNavbar from "./components/LandingPageNavbar";
import styles from "./page.module.scss";
import getToken from "@/api/utils/getToken";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const { data, isPending, refetch } = useMyDetails();
  const token = getToken();
  const router = useRouter();

  useEffect(() => {
    if(!data && !isPending && token){
        refetch()
    }
    if(data?.success){
      router.push('/home')
    }
  },[data, refetch])

  return (
    <div className={styles.page}>
        <LandingPageNavbar/>
        <HeroSection/>
    </div>
  );
}
