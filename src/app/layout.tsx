import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers/Providers";
import { SocketProvider } from "@/context/socketContext";
export const metadata: Metadata = {
  title: "Pulse",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <SocketProvider>{children}</SocketProvider>
        </Providers>
      </body>
    </html>
  );
}
