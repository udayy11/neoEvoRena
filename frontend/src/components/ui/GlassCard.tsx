'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
  glow?: 'cyan' | 'purple' | 'none';
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  glow = 'none',
  hover = true,
  ...props
}: GlassCardProps) {
  const glowClass = glow === 'cyan' ? 'glow-cyan' : glow === 'purple' ? 'glow-purple' : '';

  return (
    <motion.div
      className={`glass-card ${glowClass} ${className}`}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
