'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useApp();

  // On the welcome/role-selection screen, we don't need the standard navbar
  if (pathname === '/') return null;

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/85 backdrop-blur-xl border-b border-surface-container shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto h-14 px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Logo & Title */}
        <Link href="/" className="flex items-center gap-2.5 min-w-0 group">
          <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105">
            <span className="material-symbols-outlined text-[20px]">delete_sweep</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">
              Agartala Smart City
            </span>
            <h1 className="text-sm sm:text-base font-bold text-on-surface truncate leading-tight">
              SmartBin Telemetry
            </h1>
          </div>
        </Link>

        {/* Center: Navigation Links for larger screens */}
        <nav className="hidden md:flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-xl">
          <Link
            href="/map"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              pathname === '/map'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-secondary hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">map</span>
            Bins Map
          </Link>
          <Link
            href="/report"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              pathname === '/report'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-secondary hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">report_problem</span>
            Report Issue
          </Link>
          {user ? (
            <>
              <Link
                href="/officer"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  pathname === '/officer'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-secondary hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">dashboard</span>
                Desk & Tickets
              </Link>
              <Link
                href="/officer/settings"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  pathname === '/officer/settings'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-secondary hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">tune</span>
                Duty Settings
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                pathname === '/login'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-secondary hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
              Staff Login
            </Link>
          )}
        </nav>

        {/* Right: User / Mode Pill */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/officer/settings"
                className="flex items-center gap-2 bg-surface-container px-2.5 py-1 rounded-full hover:bg-surface-container-high transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-xs font-semibold text-on-surface hidden sm:inline">
                  {user.name}
                </span>
                <span className="text-[10px] bg-primary text-on-primary px-1.5 py-0.5 rounded-full font-mono font-bold">
                  {user.id}
                </span>
              </Link>
              <button
                onClick={logout}
                title="Log out"
                className="w-8 h-8 rounded-full bg-surface-container hover:bg-error-container hover:text-on-error-container text-secondary flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 bg-inverse-surface text-inverse-on-surface hover:bg-on-background px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span>Staff Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

