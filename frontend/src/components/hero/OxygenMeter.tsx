'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function OxygenMeter() {
  const [oxygenLevel, setOxygenLevel] = useState(98.7);
  const [pressure, setPressure] = useState(101.3);
  const [temp, setTemp] = useState(22.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setOxygenLevel(98 + Math.random() * 1.8);
      setPressure(100.5 + Math.random() * 1.5);
      setTemp(21.5 + Math.random() * 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'O₂ Level', value: `${oxygenLevel.toFixed(1)}%`, color: 'from-green-400 to-emerald-500' },
    { label: 'Pressure', value: `${pressure.toFixed(1)} kPa`, color: 'from-neon-cyan to-blue-500' },
    { label: 'Temp', value: `${temp.toFixed(1)}°C`, color: 'from-orange-400 to-red-500' },
  ];

  return (
    <motion.div
      className="glass rounded-2xl p-4 flex gap-6"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{stat.label}</p>
          <p className={`text-lg font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
            {stat.value}
          </p>
        </div>
      ))}
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Status</p>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-medium text-green-400">Nominal</span>
        </div>
      </div>
    </motion.div>
  );
}
