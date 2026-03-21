import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export default function PageTransition({ children }: PropsWithChildren) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }}
        exit={{ opacity: 0, y: -10, transition: { duration: 0.3, ease: "easeIn" } }}
      >
        {children}
      </motion.div>

      {/* Gold sweep overlay */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[100] h-full w-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: [0, 1, 1, 0], transition: { duration: 0.8, times: [0, 0.4, 0.6, 1] } }}
        style={{ originX: 0 }}
      >
        <div className="h-full w-full bg-gradient-to-r from-gold-400/20 via-gold-200/30 to-gold-400/20" />
      </motion.div>
    </>
  );
}
