'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedButton from '@/components/ui/AnimatedButton';
import OxygenMeter from './OxygenMeter';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient light orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[150px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-cyan/8 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-blue/5 rounded-full blur-[200px] pointer-events-none" />

      {/* Saturn-like ring decoration */}
      <motion.div
        className="absolute top-[15%] right-[10%] w-[300px] h-[300px] opacity-20 pointer-events-none hidden lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-full h-full rounded-full border-2 border-neon-purple/30" style={{ transform: 'rotateX(75deg)' }} />
        <div className="absolute inset-4 rounded-full border border-neon-cyan/20" style={{ transform: 'rotateX(75deg)' }} />
        <div className="absolute inset-[40%] rounded-full bg-gradient-to-br from-neon-purple/40 to-neon-cyan/20 blur-sm" />
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-neon-cyan/40 pointer-events-none"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <motion.div
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              <span className="text-xs text-white/60 uppercase tracking-widest font-medium">Now Accepting Explorers</span>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="text-white">Step into the</span>
              <br />
              <span className="text-gradient">Next Era</span>
              <br />
              <span className="text-white">of Humanity</span>
            </motion.h1>

            <motion.p
              className="text-lg text-white/50 max-w-lg mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              AI-powered evolution meets interstellar ambition. Book your journey
              to the stars and become part of the greatest adventure in human history.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link href="/onboarding">
                <AnimatedButton variant="primary" size="lg">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Begin Your Onboarding
                </AnimatedButton>
              </Link>
              <Link href="/destinations">
                <AnimatedButton variant="secondary" size="lg">
                  Explore the Frontier
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </AnimatedButton>
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="flex gap-8 mt-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[
                { value: '2.4K+', label: 'Explorers' },
                { value: '6', label: 'Destinations' },
                { value: '99.8%', label: 'Safety Rate' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-gradient">{stat.value}</p>
                  <p className="text-xs text-white/40 uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right side — Oxygen meter + visual element */}
          <div className="hidden lg:flex flex-col items-end gap-6">
            {/* Spacecraft/planet visual element */}
            <motion.div
              className="relative w-80 h-80"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {/* Planet */}
              <motion.div
                className="absolute inset-8 rounded-full bg-gradient-to-br from-neon-purple/30 via-neon-blue/20 to-neon-cyan/30 shadow-[0_0_80px_rgba(168,85,247,0.2)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10" />
                  <div className="absolute top-[20%] left-[30%] w-[40%] h-[20%] rounded-full bg-white/5 blur-md" />
                  <div className="absolute top-[50%] left-[20%] w-[60%] h-[15%] rounded-full bg-neon-purple/10 blur-md" />
                </div>
              </motion.div>

              {/* Orbiting ring */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute inset-2 rounded-full border border-neon-cyan/20" style={{ transform: 'rotateX(70deg) rotateZ(15deg)' }} />
              </motion.div>

              {/* Orbiting dot */}
              <motion.div
                className="absolute w-3 h-3 rounded-full bg-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.5)]"
                style={{ top: '10%', left: '50%' }}
                animate={{
                  rotate: 360,
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>

            <OxygenMeter />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-1 h-2.5 rounded-full bg-white/40" />
        </div>
      </motion.div>
    </section>
  );
}
