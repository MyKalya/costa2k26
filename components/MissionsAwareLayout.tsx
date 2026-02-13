"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/NavBar";

export default function MissionsAwareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMissions = pathname?.startsWith("/missions") ?? false;

  if (isMissions) {
    return <>{children}</>;
  }

  return (
    <>
      <NavBar />
      <main className="min-h-screen pt-14">{children}</main>
    </>
  );
}
