'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import HeroSection from '@/components/hero/HeroSection';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { destinationsAPI } from '@/lib/api';
import { Destination } from '@/types';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7 },
};

export default function HomePage() {
  const [featured, setFeatured] = useState<Destination[]>([]);

  useEffect(() => {
    destinationsAPI.getAll(true).then((res) => setFeatured(res.data.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <>
      <HeroSection />

      {/* Featured Destinations */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <p className="text-neon-cyan text-sm uppercase tracking-widest mb-3 font-medium">Destinations</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Explore the <span className="text-gradient">Cosmos</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">
              From lunar gateways to the methane seas of Titan — choose your next frontier.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((dest, i) => (
              <motion.div
                key={dest._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <Link href={`/booking/${dest._id}`}>
                  <GlassCard className="p-6 h-full group cursor-pointer" glow="cyan">
                    {/* Planet icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center text-3xl mb-5 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-shadow">
                      🪐
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-all">{dest.name}</h3>
                    <p className="text-sm text-neon-cyan/80 mb-3">{dest.tagline}</p>
                    <p className="text-sm text-white/40 leading-relaxed mb-5 line-clamp-3">{dest.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div>
                        <p className="text-xs text-white/30">Starting from</p>
                        <p className="text-lg font-bold text-gradient">${dest.price.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/30">Travel time</p>
                        <p className="text-sm text-white/60">{dest.travelTime}</p>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center mt-12" {...fadeUp}>
            <Link href="/destinations">
              <AnimatedButton variant="secondary" size="lg">
                View All Destinations →
              </AnimatedButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why NeoEvolution */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/3 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <p className="text-neon-purple text-sm uppercase tracking-widest mb-3 font-medium">Why Us</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Built for the <span className="text-gradient-warm">Bold</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🧠',
                title: 'AI-Powered Navigation',
                description: 'Advanced AI systems plot optimal routes, predict hazards, and ensure the safest journey through deep space.',
              },
              {
                icon: '🛡️',
                title: '99.8% Safety Record',
                description: 'Redundant life-support systems, AI health monitoring, and emergency protocols tested across 2,400+ missions.',
              },
              {
                icon: '✨',
                title: 'Luxury in Zero-G',
                description: 'From private suites with Earth-view windows to gourmet zero-gravity dining — experience space in unmatched comfort.',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <GlassCard className="p-8 text-center h-full" glow="purple">
                  <span className="text-4xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="glass-card glow-border p-12 md:p-16 text-center relative overflow-hidden"
            {...fadeUp}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-gradient-to-b from-neon-cyan/10 to-transparent blur-[80px] pointer-events-none" />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative">
              Ready to Leave <span className="text-gradient">Earth</span>?
            </h2>
            <p className="text-white/40 max-w-lg mx-auto mb-10 relative">
              Join 2,400+ explorers who have already taken the first step.
              Your journey to the stars begins with a single click.
            </p>
            <Link href="/auth/signup">
              <AnimatedButton variant="primary" size="lg">
                Launch Your Journey 🚀
              </AnimatedButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
