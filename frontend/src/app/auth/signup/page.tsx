'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedButton from '@/components/ui/AnimatedButton';
import FormInput from '@/components/ui/FormInput';
import { useAuthStore } from '@/store/useAuthStore';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup, isLoading } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await signup(name, email, password);
      router.push('/onboarding');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    }
  };

  return (
    <div className="pt-28 pb-20 px-6 min-h-screen flex items-center justify-center">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <GlassCard className="p-8 md:p-10 glow-border" hover={false}>
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center mx-auto mb-5">
              <span className="text-2xl">🚀</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Join the Mission</h1>
            <p className="text-white/40 text-sm">Create your explorer account</p>
          </div>

          {error && (
            <motion.div
              className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-6 text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <FormInput
              id="signup-name"
              label="Full Name"
              value={name}
              onChange={setName}
              required
            />
            <FormInput
              id="signup-email"
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              required
            />
            <FormInput
              id="signup-password"
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              required
            />
            <FormInput
              id="signup-confirm"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              required
            />

            <AnimatedButton
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isLoading || !name || !email || !password || !confirmPassword}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </AnimatedButton>
          </form>

          <p className="text-center mt-6 text-sm text-white/40">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-neon-cyan hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}
