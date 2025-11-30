"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { LucideIcon } from "lucide-react";

interface InfoTileProps {
  title: string;
  badge: string;
  description: string;
  buttonLabel: string;
  href: string;
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
  iconBgColor: string;
  iconBorderColor: string;
  ctaColor: string;
  index: number;
}

export function InfoTile({
  title,
  badge,
  description,
  buttonLabel,
  href,
  icon: Icon,
  gradientFrom,
  gradientTo,
  iconBgColor,
  iconBorderColor,
  ctaColor,
  index,
}: InfoTileProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{
        duration: 0.45,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="group relative block rounded-3xl border border-white/20 p-6 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.25)] backdrop-filter backdrop-blur-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:-translate-y-[3px] transition-all duration-300 ease-out overflow-hidden"
      style={{
        background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      {/* Subtle brightness on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative flex items-start gap-5">
        {/* Icon box on the left */}
        <motion.div
          className="flex-shrink-0 mt-0.5"
          whileHover={{ y: -2, rotate: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl p-3 shadow-lg backdrop-blur-sm border"
            style={{
              backgroundColor: iconBgColor,
              borderColor: iconBorderColor,
            }}
          >
            <Icon className="h-6 w-6 text-white" strokeWidth={2} />
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header row: Title and Badge */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-lg font-semibold text-white leading-tight">
              {title}
            </h3>
            <span className="flex-shrink-0 rounded-full bg-emerald-50/80 backdrop-blur-sm px-3 py-1 text-[10px] font-semibold text-slate-700 whitespace-nowrap uppercase tracking-wide border border-emerald-100/50">
              {badge}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-white/80 mb-4 leading-relaxed">
            {description}
          </p>

          {/* CTA Pill Button */}
          <Link href={href}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span
                className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white shadow-md transition-shadow duration-200 hover:shadow-lg"
                style={{ backgroundColor: ctaColor }}
              >
                {buttonLabel}
              </span>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

