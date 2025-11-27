"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

export function HeroTitle({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  const variants: Variants = reduce
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.25 } },
      }
    : {
        hidden: { opacity: 0, scale: 0.82 },
        show: {
          opacity: 1,
          scale: [0.82, 1.1, 0.96, 1],
          transition: { duration: 0.9, times: [0, 0.55, 0.8, 1], ease: "easeOut" },
        },
      };

  return (
    <motion.h1
      className="font-recoleta font-extrabold text-[clamp(2.8rem,7vw,6rem)] leading-tight uppercase tracking-tight text-white"
      initial="hidden"
      animate="show"
      variants={variants}
    >
      {children}
    </motion.h1>
  );
}
