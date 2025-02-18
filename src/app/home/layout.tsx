'use client'
import { ReactNode, useEffect } from "react";
import Navbar from "../components/Navbar";
import InnerSidebar from "../components/Sidebars/InnerSidebar";
import OuterSidebar from "../components/Sidebars/OuterSidebar";
import styles from "./layout.module.scss";
import { roboto } from "../fonts";
import useMyDetails from "@/hooks/Auth/useGetMyDetails";
import { SocketProvider } from "@/context/socketContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  const { data, isPending, refetch } = useMyDetails();

  useEffect(()=>{
      if(!isPending&& !data?.user){
        refetch()
      }
  }, [data, refetch])
  return (
    <div className={`${styles.layout} ${roboto.variable}`}>

      <Navbar />
      <OuterSidebar />
      <InnerSidebar />
      <main className={styles.mainContent}>{children}</main>

    </div>
  );
}
