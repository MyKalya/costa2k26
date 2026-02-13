import "./globals.css";
import { Inter } from "next/font/google";
import MissionsAwareLayout from "@/components/MissionsAwareLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Costa Rica 2026",
  description: "Trip hub for Feb 13–18, 2026",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-foreground antialiased">
        <MissionsAwareLayout>{children}</MissionsAwareLayout>
      </body>
    </html>
  );
}
