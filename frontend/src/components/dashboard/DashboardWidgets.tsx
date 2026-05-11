'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { Booking } from '@/types';

interface DashboardWidgetsProps {
  bookings: Booking[];
  userName: string;
}

export default function DashboardWidgets({ bookings, userName }: DashboardWidgetsProps) {
  const confirmed = bookings.filter((b) => b.status === 'confirmed').length;
  const totalSpent = bookings.reduce((acc, b) => acc + b.totalPrice, 0);
  const destinations = new Set(bookings.map((b) => b.destination?.name)).size;

  const stats = [
    {
      label: 'Total Missions',
      value: bookings.length.toString(),
      icon: '🚀',
      color: 'from-neon-cyan to-blue-500',
    },
    {
      label: 'Confirmed',
      value: confirmed.toString(),
      icon: '✅',
      color: 'from-green-400 to-emerald-500',
    },
    {
      label: 'Destinations',
      value: destinations.toString(),
      icon: '🪐',
      color: 'from-neon-purple to-pink-500',
    },
    {
      label: 'Total Invested',
      value: `$${(totalSpent / 1000).toFixed(0)}K`,
      icon: '💎',
      color: 'from-amber-400 to-orange-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, <span className="text-gradient">{userName}</span>
        </h1>
        <p className="text-white/40">Your mission control center</p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="p-5" hover={false}>
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
              <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">{stat.label}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Recent Missions</h2>
        {bookings.length === 0 ? (
          <GlassCard className="p-8 text-center" hover={false}>
            <p className="text-white/40 text-lg">No missions yet</p>
            <p className="text-white/25 mt-2 text-sm">Book your first space journey to get started!</p>
          </GlassCard>
        ) : (
          <div className="space-y-3">
            {bookings.slice(0, 5).map((booking, i) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <GlassCard className="p-4 flex items-center justify-between" hover>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center text-xl">
                      🪐
                    </div>
                    <div>
                      <p className="font-semibold text-white">{booking.destination?.name || 'Unknown'}</p>
                      <p className="text-xs text-white/40">
                        {new Date(booking.departureDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gradient">${booking.totalPrice.toLocaleString()}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      booking.status === 'confirmed'
                        ? 'bg-green-500/20 text-green-400'
                        : booking.status === 'cancelled'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
