import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function ModalComponent({ children }: { children: React.ReactNode }) {
  return createPortal(
    <AnimatePresence>
      <motion.aside
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="fixed inset-0 h-[100dvh] w-[100dvw] overflow-hidden bg-white"
        style={{ zIndex: 2 }}
      >
        {children}
      </motion.aside>
    </AnimatePresence>,
    document.body,
  );
}
