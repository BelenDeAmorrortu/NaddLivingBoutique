"use client";
import React, { ReactNode, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function Reveal({
  children,
  isSection,
  tailwindStyles,
}: {
  children: ReactNode;
  isSection?: boolean;
  tailwindStyles?: string;
}) {
  const element = useRef<HTMLDivElement>(null);
  const inView = useInView(element, { once: true });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView]);

  if (isSection) {
    return (
      <motion.section
        ref={element}
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.5 }}
        className={tailwindStyles}
      >
        {children}
      </motion.section>
    );
  } else {
    return (
      <motion.div
        ref={element}
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.5 }}
        className={tailwindStyles}
      >
        {children}
      </motion.div>
    );
  }
}
