"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface AccordionItemProps {
  title: string;
  icon: LucideIcon;
  preview: string;
  children: React.ReactNode;
  bgColor?: string;
  defaultOpen?: boolean;
}

export function AccordionItem({
  title,
  icon: Icon,
  preview,
  children,
  bgColor = "#E8F1EB",
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full rounded-3xl shadow-sm shadow-black/5 overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 text-left hover:opacity-90 transition-opacity"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="flex-shrink-0 h-10 w-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#0F3D2E" }}>
            <Icon className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">
              {title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {preview}
            </p>
          </div>
        </div>
        <ChevronDown
          className={`flex-shrink-0 h-5 w-5 text-slate-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
              <div className="pt-4 border-t border-slate-200/50">
                <div className="text-base text-slate-700 leading-relaxed space-y-3">
                  {children}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface AccordionProps {
  children: React.ReactNode;
}

export function Accordion({ children }: AccordionProps) {
  return <div className="w-full space-y-6">{children}</div>;
}

