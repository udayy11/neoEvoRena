'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedButton from '@/components/ui/AnimatedButton';

const steps = [
  {
    id: 'welcome',
    title: 'Welcome, Explorer',
    subtitle: 'Let\'s prepare you for the journey of a lifetime.',
    icon: '🚀',
  },
  {
    id: 'travel-style',
    title: 'Travel Style',
    subtitle: 'How do you like to explore?',
    icon: '🧭',
    options: [
      { value: 'pioneer', label: 'Pioneer', desc: 'First to touch untouched worlds', icon: '⚡' },
      { value: 'explorer', label: 'Explorer', desc: 'Balanced adventure and safety', icon: '🌍' },
      { value: 'luxury', label: 'Luxury', desc: 'Premium comfort in deep space', icon: '💎' },
    ],
  },
  {
    id: 'risk-tolerance',
    title: 'Risk Tolerance',
    subtitle: 'How bold are you willing to be?',
    icon: '🛡️',
    options: [
      { value: 'low', label: 'Cautious', desc: 'Stick to proven, safe destinations', icon: '🟢' },
      { value: 'moderate', label: 'Balanced', desc: 'Some adventure, measured risks', icon: '🟡' },
      { value: 'high', label: 'Fearless', desc: 'Push the boundaries of exploration', icon: '🔴' },
    ],
  },
  {
    id: 'health',
    title: 'Health Check',
    subtitle: 'Quick compatibility assessment',
    icon: '❤️',
    questions: [
      'Are you comfortable in zero-gravity environments?',
      'Do you have any cardiovascular conditions?',
      'Can you handle extended periods in confined spaces?',
    ],
  },
  {
    id: 'complete',
    title: 'You\'re Ready!',
    subtitle: 'Your profile has been configured for optimal space travel.',
    icon: '✅',
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [healthAnswers, setHealthAnswers] = useState<boolean[]>([true, false, true]);
  const router = useRouter();

  const step = steps[currentStep];
  const progress = ((currentStep) / (steps.length - 1)) * 100;

  const next = () => {
    if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1);
  };

  const back = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  return (
    <div className="pt-28 pb-20 px-6 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Progress bar */}
        <motion.div className="mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/40 uppercase tracking-widest font-medium">Onboarding</p>
            <p className="text-xs text-white/40">{currentStep + 1} / {steps.length}</p>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
          >
            <GlassCard className="p-8 md:p-12 glow-border" hover={false}>
              <div className="text-center mb-8">
                <span className="text-5xl mb-4 block">{step.icon}</span>
                <h2 className="text-3xl font-bold text-white mb-2">{step.title}</h2>
                <p className="text-white/40">{step.subtitle}</p>
              </div>

              {/* Options step */}
              {step.options && (
                <div className="grid gap-3 mb-8">
                  {step.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSelections({ ...selections, [step.id]: opt.value })}
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left ${
                        selections[step.id] === opt.value
                          ? 'border-neon-cyan/50 bg-neon-cyan/10 shadow-[0_0_20px_rgba(0,240,255,0.1)]'
                          : 'border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <div>
                        <p className="font-semibold text-white">{opt.label}</p>
                        <p className="text-sm text-white/40">{opt.desc}</p>
                      </div>
                      {selections[step.id] === opt.value && (
                        <motion.div
                          className="ml-auto w-6 h-6 rounded-full bg-neon-cyan flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Health questions */}
              {step.questions && (
                <div className="space-y-4 mb-8">
                  {step.questions.map((q, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                      <p className="text-sm text-white/70 pr-4">{q}</p>
                      <div className="flex gap-2 shrink-0">
                        {['Yes', 'No'].map((answer) => (
                          <button
                            key={answer}
                            onClick={() => {
                              const updated = [...healthAnswers];
                              updated[i] = answer === 'Yes';
                              setHealthAnswers(updated);
                            }}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                              (answer === 'Yes' && healthAnswers[i]) || (answer === 'No' && !healthAnswers[i])
                                ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                                : 'bg-white/5 text-white/40 border border-transparent hover:bg-white/10'
                            }`}
                          >
                            {answer}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Complete step */}
              {step.id === 'complete' && (
                <div className="space-y-4 mb-8">
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selections).map(([key, value]) => (
                      <div key={key} className="bg-white/5 rounded-xl p-3">
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">{key.replace('-', ' ')}</p>
                        <p className="text-sm font-medium text-white capitalize">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between gap-4">
                {currentStep > 0 ? (
                  <AnimatedButton variant="ghost" onClick={back}>
                    ← Back
                  </AnimatedButton>
                ) : <div />}

                {step.id === 'complete' ? (
                  <AnimatedButton variant="primary" onClick={() => router.push('/destinations')}>
                    Explore Destinations 🚀
                  </AnimatedButton>
                ) : step.id === 'welcome' ? (
                  <AnimatedButton variant="primary" onClick={next}>
                    Let&apos;s Begin →
                  </AnimatedButton>
                ) : (
                  <AnimatedButton
                    variant="primary"
                    onClick={next}
                    disabled={step.options && !selections[step.id]}
                  >
                    Continue →
                  </AnimatedButton>
                )}
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
