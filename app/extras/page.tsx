"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Extras() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/explore-tamarindo");
  }, [router]);

  return null;
}
