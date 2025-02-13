import { Righteous } from "next/font/google";
import { Roboto } from "next/font/google";

export const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-righteous",
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], 
  variable: "--font-roboto",
});
