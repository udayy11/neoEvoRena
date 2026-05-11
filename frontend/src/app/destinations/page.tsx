'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { destinationsAPI } from '@/lib/api';
import { Destination } from '@/types';

const dangerColors: Record<string, string> = {
  Low: 'bg-green-500/20 text-green-400',
  Moderate: 'bg-yellow-500/20 text-yellow-400',
  High: 'bg-orange-500/20 text-orange-400',
  Extreme: 'bg-red-500/20 text-red-400',
};

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  useEffect(() => {
    destinationsAPI
      .getAll()
      .then((res) => setDestinations(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'featured' ? destinations.filter((d) => d.featured) : destinations;

  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-neon-cyan text-sm uppercase tracking-widest mb-3 font-medium">Interstellar Catalog</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Choose Your <span className="text-gradient">Destination</span>
          </h1>
          <p className="text-white/40 max-w-xl mx-auto">
            Each destination offers a unique experience. From the familiar lunar surface to the extreme alien worlds of Saturn&apos;s moons.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          className="flex justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {(['all', 'featured'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === f
                  ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                  : 'glass text-white/50 hover:text-white'
              }`}
            >
              {f === 'all' ? 'All Destinations' : 'Featured'}
            </button>
          ))}
        </motion.div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
                <div className="w-16 h-16 rounded-2xl bg-white/5 mb-5" />
                <div className="h-6 bg-white/5 rounded mb-3 w-2/3" />
                <div className="h-4 bg-white/5 rounded mb-2 w-full" />
                <div className="h-4 bg-white/5 rounded w-4/5" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dest, i) => (
              <motion.div
                key={dest._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                layout
              >
                <Link href={`/booking/${dest._id}`}>
                  <GlassCard className="p-6 h-full group cursor-pointer" glow="cyan">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center text-2xl group-hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] transition-all">
                        🪐
                      </div>
                      {dest.featured && (
                        <span className="text-xs px-2 py-1 bg-neon-purple/20 text-neon-purple rounded-full font-medium">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gradient transition-all">
                      {dest.name}
                    </h3>
                    <p className="text-sm text-neon-cyan/70 mb-3">{dest.tagline}</p>
                    <p className="text-sm text-white/35 leading-relaxed mb-5 line-clamp-2">{dest.description}</p>

                    {/* Info grid */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="bg-white/5 rounded-xl px-3 py-2">
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">Distance</p>
                        <p className="text-sm text-white/70 font-medium">{dest.distance}</p>
                      </div>
                      <div className="bg-white/5 rounded-xl px-3 py-2">
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">Travel</p>
                        <p className="text-sm text-white/70 font-medium">{dest.travelTime}</p>
                      </div>
                      <div className="bg-white/5 rounded-xl px-3 py-2">
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">Gravity</p>
                        <p className="text-sm text-white/70 font-medium">{dest.gravity}</p>
                      </div>
                      <div className="bg-white/5 rounded-xl px-3 py-2">
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">O₂</p>
                        <p className="text-sm text-white/70 font-medium truncate">{dest.oxygenLevel}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div>
                        <p className="text-xs text-white/30">From</p>
                        <p className="text-lg font-bold text-gradient">${dest.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${dangerColors[dest.dangerLevel]}`}>
                          {dest.dangerLevel}
                        </span>
                        <span className="text-yellow-400 text-sm">★ {dest.rating}</span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
