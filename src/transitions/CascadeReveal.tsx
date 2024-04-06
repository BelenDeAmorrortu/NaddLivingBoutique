import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface IProps {
  children: ReactNode;
  key: number;
}

export default function CascadeReveal({ children, key }: IProps) {
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: key * 0.1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
