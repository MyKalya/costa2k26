"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { LucideIcon } from "lucide-react";

interface PaymentTileProps {
  title: string;
  amount: string;
  due: string;
  description: string;
  paymentInstructions: {
    label: string;
    lines: string[];
  };
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
  iconBgColor: string;
  iconBorderColor: string;
  index: number;
}

export function PaymentTile({
  title,
  amount,
  due,
  description,
  paymentInstructions,
  icon: Icon,
  gradientFrom,
  gradientTo,
  iconBgColor,
  iconBorderColor,
  index,
}: PaymentTileProps) {
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
          {/* Title */}
          <h3 className="text-lg font-semibold text-white leading-tight mb-4">
            {title}
          </h3>

          {/* Amount and Due */}
          <div className="space-y-2 mb-3">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-white/70">Amount</span>
              <span className="font-semibold text-white text-base">{amount}</span>
            </div>
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-white/70">Due</span>
              <span className="font-semibold text-white">{due}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-white/80 mb-4 leading-relaxed">
            {description}
          </p>

          {/* Payment Instructions */}
          <div className="border-t border-white/20 pt-4 mt-4">
            <p className="text-xs font-semibold text-white/90 uppercase tracking-wide mb-2">
              {paymentInstructions.label}
            </p>
            <div className="space-y-1 text-sm text-white/80">
              {paymentInstructions.lines.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

