'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-white font-bold text-xl">
                Neo<span className="text-gradient">Evolution</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Pioneering the future of space travel with AI-powered technology and human ambition.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2.5">
              {['Destinations', 'Onboarding', 'About Us', 'Mission'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-white/40 hover:text-neon-cyan text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {['Careers', 'Press', 'Partners', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/40 hover:text-neon-cyan text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2.5">
              {['Privacy', 'Terms', 'Safety', 'Compliance'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/40 hover:text-neon-cyan text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © 2026 NeoEvolution. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Twitter', 'Discord', 'GitHub'].map((social) => (
              <a key={social} href="#" className="text-white/30 hover:text-neon-cyan text-sm transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
