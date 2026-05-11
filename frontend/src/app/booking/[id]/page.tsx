'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedButton from '@/components/ui/AnimatedButton';
import FormInput from '@/components/ui/FormInput';
import Modal from '@/components/ui/Modal';
import { destinationsAPI, bookingsAPI } from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import { Destination } from '@/types';

const seatMultipliers: Record<string, number> = {
  economy: 1,
  business: 1.8,
  first: 3,
  luxury: 5,
};

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);

  // Booking form
  const [departureDate, setDepartureDate] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [seatClass, setSeatClass] = useState('economy');
  const [booking, setBooking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (params.id) {
      destinationsAPI
        .getById(params.id as string)
        .then((res) => setDestination(res.data))
        .catch(() => router.push('/destinations'))
        .finally(() => setLoading(false));
    }
  }, [params.id, router]);

  const totalPrice = destination
    ? destination.price * parseInt(passengers || '1') * (seatMultipliers[seatClass] || 1)
    : 0;

  const handleBook = async () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    if (!departureDate || !destination) return;

    setBooking(true);
    try {
      await bookingsAPI.create({
        destination: destination._id,
        departureDate,
        passengers: parseInt(passengers),
        seatClass,
        totalPrice,
      });
      setShowSuccess(true);
    } catch {
      alert('Booking failed. Please try again.');
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-28 pb-20 px-6 min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/40">
          <span className="w-5 h-5 border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin" />
          Loading destination...
        </div>
      </div>
    );
  }

  if (!destination) return null;

  const dangerColorMap: Record<string, string> = {
    Low: 'text-green-400',
    Moderate: 'text-yellow-400',
    High: 'text-orange-400',
    Extreme: 'text-red-400',
  };

  return (
    <div className="pt-28 pb-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Destination Details — 3 cols */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <GlassCard className="p-8 glow-border" hover={false}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-neon-cyan text-sm uppercase tracking-widest mb-2 font-medium">Destination</p>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {destination.name}
                  </h1>
                  <p className="text-neon-purple/80 font-medium">{destination.tagline}</p>
                </div>
                <div className="text-5xl">🪐</div>
              </div>

              <p className="text-white/40 leading-relaxed mb-8">{destination.description}</p>

              {/* Info grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'Distance', value: destination.distance, icon: '📏' },
                  { label: 'Travel Time', value: destination.travelTime, icon: '⏱️' },
                  { label: 'Gravity', value: destination.gravity, icon: '🌍' },
                  { label: 'Temperature', value: destination.temperature, icon: '🌡️' },
                  { label: 'Atmosphere', value: destination.atmosphere, icon: '💨' },
                  { label: 'O₂ Level', value: destination.oxygenLevel, icon: '🫧' },
                ].map((info) => (
                  <div key={info.label} className="bg-white/5 rounded-xl p-4">
                    <p className="text-lg mb-1">{info.icon}</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">{info.label}</p>
                    <p className="text-sm text-white/70 font-medium">{info.value}</p>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {destination.highlights.map((h) => (
                    <span key={h} className="px-3 py-1.5 bg-neon-cyan/10 text-neon-cyan/80 text-xs rounded-full border border-neon-cyan/15 font-medium">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rating & Danger */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">★</span>
                  <span className="text-white font-medium">{destination.rating}</span>
                  <span className="text-white/30 text-sm">rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${dangerColorMap[destination.dangerLevel]}`}>
                    {destination.dangerLevel}
                  </span>
                  <span className="text-white/30 text-sm">danger level</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Booking Form — 2 cols */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="p-8 sticky top-28" hover={false}>
              <h2 className="text-xl font-bold text-white mb-6">Book Your Mission</h2>

              <FormInput
                id="departure-date"
                label="Departure Date"
                type="date"
                value={departureDate}
                onChange={setDepartureDate}
                required
              />

              <div className="mb-5">
                <label className="text-sm text-white/40 mb-2 block">Passengers</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setPassengers(n.toString())}
                      className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                        passengers === n.toString()
                          ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                          : 'bg-white/5 text-white/40 border border-transparent hover:bg-white/10'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm text-white/40 mb-2 block">Seat Class</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'economy', label: 'Economy', multiplier: '1x' },
                    { value: 'business', label: 'Business', multiplier: '1.8x' },
                    { value: 'first', label: 'First', multiplier: '3x' },
                    { value: 'luxury', label: 'Luxury', multiplier: '5x' },
                  ].map((cls) => (
                    <button
                      key={cls.value}
                      onClick={() => setSeatClass(cls.value)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                        seatClass === cls.value
                          ? 'bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30'
                          : 'bg-white/5 text-white/40 border border-transparent hover:bg-white/10'
                      }`}
                    >
                      <p className="font-medium">{cls.label}</p>
                      <p className="text-[10px] opacity-60">{cls.multiplier} price</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="border-t border-white/10 pt-5 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/40 text-sm">Base price</span>
                  <span className="text-white/60">${destination.price.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/40 text-sm">Passengers</span>
                  <span className="text-white/60">×{passengers}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/40 text-sm">Class multiplier</span>
                  <span className="text-white/60">×{seatMultipliers[seatClass]}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-2xl font-bold text-gradient">${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <AnimatedButton
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleBook}
                disabled={!departureDate || booking}
              >
                {booking ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : !isAuthenticated ? (
                  'Sign In to Book'
                ) : (
                  'Confirm Booking 🚀'
                )}
              </AnimatedButton>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal isOpen={showSuccess} onClose={() => { setShowSuccess(false); router.push('/dashboard'); }} title="Mission Confirmed! 🎉">
        <div className="text-center">
          <p className="text-white/60 mb-6">
            Your booking to <span className="text-neon-cyan font-semibold">{destination.name}</span> has been confirmed!
          </p>
          <AnimatedButton variant="primary" onClick={() => router.push('/dashboard')}>
            Go to Dashboard
          </AnimatedButton>
        </div>
      </Modal>
    </div>
  );
}
