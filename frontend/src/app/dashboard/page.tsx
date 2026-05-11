'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { bookingsAPI } from '@/lib/api';
import { Booking } from '@/types';
import DashboardWidgets from '@/components/dashboard/DashboardWidgets';
import AnimatedButton from '@/components/ui/AnimatedButton';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, isAuthenticated, loadUser, isLoading: authLoading } = useAuthStore();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      await loadUser();
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    if (isAuthenticated) {
      bookingsAPI
        .getAll()
        .then((res) => setBookings(res.data))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="pt-28 pb-20 px-6 min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/40">
          <span className="w-5 h-5 border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin" />
          Loading mission data...
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <DashboardWidgets bookings={bookings} userName={user?.name || 'Explorer'} />

        {/* Quick actions */}
        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/destinations">
            <AnimatedButton variant="primary">
              🪐 Book New Mission
            </AnimatedButton>
          </Link>
          <Link href="/onboarding">
            <AnimatedButton variant="secondary">
              🧭 Update Profile
            </AnimatedButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
