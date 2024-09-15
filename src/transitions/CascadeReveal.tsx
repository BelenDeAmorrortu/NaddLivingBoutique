"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface IProps {
  children: ReactNode;
  position: number;
  twStyles?: string;
}

export default function CascadeReveal({
  children,
  position,
  twStyles,
}: IProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: position * 0.1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={twStyles ?? ""}
    >
      {children}
    </motion.div>
  );
}
