'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
}

export default function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  fullWidth = false,
}: AnimatedButtonProps) {
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  const baseStyles = 'relative overflow-hidden font-semibold rounded-xl transition-all duration-300 cursor-pointer select-none inline-flex items-center justify-center gap-2';

  const variants = {
    primary:
      'bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple text-white shadow-lg shadow-neon-cyan/20 hover:shadow-neon-cyan/40',
    secondary:
      'glass border border-white/10 text-white hover:border-neon-cyan/40 hover:bg-white/10',
    ghost:
      'bg-transparent text-neon-cyan hover:bg-white/5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 600);
    onClick?.();
  };

  return (
    <motion.button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.03, y: -1 } : undefined}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {ripple && (
        <span
          className="absolute rounded-full bg-white/30 animate-ping pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      )}
      {children}
    </motion.button>
  );
}
