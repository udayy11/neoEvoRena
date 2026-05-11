'use client';

import { useState } from 'react';

interface FormInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  id: string;
}

export default function FormInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  id,
}: FormInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative mb-5">
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          focused || value
            ? '-top-2.5 text-xs text-neon-cyan bg-[#0a0a1e] px-2 rounded'
            : 'top-3.5 text-sm text-white/40'
        }`}
      >
        {label}{required && ' *'}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ''}
        className={`w-full px-4 py-3.5 bg-white/5 border rounded-xl text-white outline-none transition-all duration-300 ${
          error
            ? 'border-red-500/60 focus:border-red-400'
            : focused
            ? 'border-neon-cyan/40 shadow-[0_0_20px_rgba(0,240,255,0.1)]'
            : 'border-white/10 hover:border-white/20'
        }`}
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
