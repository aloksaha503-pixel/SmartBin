'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function BottomNav() {
  const pathname = usePathname();
  const { user } = useApp();

  // Don't show bottom navigation on role selection welcome screen
  if (pathname === '/') return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl border-t border-surface-container py-1 px-2 flex items-center justify-around shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <Link
        href="/map"
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors ${
          pathname === '/map' ? 'text-primary font-bold' : 'text-secondary hover:text-on-surface'
        }`}
      >
        <span
          className="material-symbols-outlined text-[22px]"
          style={pathname === '/map' ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          map
        </span>
        <span className="text-[10px] mt-0.5">Bins Map</span>
      </Link>

      <Link
        href="/report"
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors ${
          pathname === '/report' ? 'text-primary font-bold' : 'text-secondary hover:text-on-surface'
        }`}
      >
        <span
          className="material-symbols-outlined text-[22px]"
          style={pathname === '/report' ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          report_problem
        </span>
        <span className="text-[10px] mt-0.5">Report</span>
      </Link>

      {user ? (
        <>
          <Link
            href="/officer"
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors ${
              pathname === '/officer' ? 'text-primary font-bold' : 'text-secondary hover:text-on-surface'
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={pathname === '/officer' ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              dashboard
            </span>
            <span className="text-[10px] mt-0.5">Tickets</span>
          </Link>

          <Link
            href="/officer/settings"
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors ${
              pathname === '/officer/settings' ? 'text-primary font-bold' : 'text-secondary hover:text-on-surface'
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={pathname === '/officer/settings' ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              person
            </span>
            <span className="text-[10px] mt-0.5">Profile</span>
          </Link>
        </>
      ) : (
        <Link
          href="/login"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors ${
            pathname === '/login' ? 'text-primary font-bold' : 'text-secondary hover:text-on-surface'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={pathname === '/login' ? { fontVariationSettings: "'FILL' 1" } : {}}
          >
            admin_panel_settings
          </span>
          <span className="text-[10px] mt-0.5">Staff</span>
        </Link>
      )}
    </nav>
  );
}

