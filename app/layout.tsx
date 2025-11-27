import "./globals.css";
import NavBar from "@/components/NavBar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Costa Rica 2026",
  description: "Trip hub for Feb 13–18, 2026",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-foreground antialiased">
        <NavBar />
        <main className="min-h-screen pt-14">{children}</main>
      </body>
    </html>
  );
}
