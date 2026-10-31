'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RoleSelectionPage() {
  const router = useRouter();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    icon: string;
    isBoard: boolean;
    targetRoute: string;
  }>({
    isOpen: false,
    title: '',
    description: '',
    icon: '',
    isBoard: false,
    targetRoute: '/map',
  });

  const openConfirmation = (isBoard: boolean) => {
    if (isBoard) {
      setModalState({
        isOpen: true,
        title: 'Municipal Board Login',
        description: 'Redirecting to secure AMC Administrator authentication for Ward Officers.',
        icon: 'admin_panel_settings',
        isBoard: true,
        targetRoute: '/login',
      });
    } else {
      setModalState({
        isOpen: true,
        title: 'Public Citizen Access',
        description: 'Launching interactive map telemetry for Agartala Municipal Corporation.',
        icon: 'travel_explore',
        isBoard: false,
        targetRoute: '/map',
      });
    }
  };

  const handleProceed = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    router.push(modalState.targetRoute);
  };

  return (
    <div className="flex-1 w-full bg-surface px-4 py-8 flex flex-col justify-center items-center min-h-[calc(100vh-2rem)]">
      {/* Container Card: Civic Minimalism */}
      <div className="w-full max-w-sm bg-surface-container-lowest rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

        {/* Civic Logo & Identifier */}
        <div className="relative flex items-center justify-center w-20 h-20 bg-surface-container-low rounded-2xl mb-4 border border-surface-container">
          <img
            alt="SmartBin Logo"
            className="w-16 h-16 object-contain rounded-xl"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8Xtj1WksxuTVp91YK8Fter_M9YFmq0NQBMuYmDNg5GwVXmQEkDFqUWljyQQspbEsRzNBweQkg1iZmCRL-nrJ2uNs87RfqKtBf8aYXO2U6ubqQM3htA0pSNNAkzpouCaGLi8Bw6070pt_lKnUcYkTHn8477zTI-mtcr83_hAeAKQGyEOSKeQbSDeAyBnZgHUk-6Ot8bLD-Asjc3yWt0vtc5F20qSWlRggNo1sM-mE0upSULtvwSNwD"
          />
          <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-primary rounded-full ring-2 ring-white" />
        </div>

        {/* Official Platform Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
          SmartBin
        </h1>
        <p className="text-xs font-semibold text-secondary mt-1">
          Urban Sanitation Telemetry System
        </p>

        {/* Civic Authority Subtitle */}
        <div className="mt-3 mb-6 px-3 py-1 bg-surface-container rounded-full border border-surface-container-high">
          <span className="text-[10px] sm:text-[11px] text-on-surface-variant uppercase tracking-wider font-bold">
            Agartala Municipal Corporation • Tripura
          </span>
        </div>

        {/* Action Buttons Stack */}
        <div className="w-full flex flex-col gap-3">
          {/* Municipal Board Login (Primary Action: Dark Slate) */}
          <button
            onClick={() => openConfirmation(true)}
            type="button"
            className="w-full bg-inverse-surface hover:bg-slate-950 active:scale-[0.99] transition-all text-inverse-on-surface rounded-xl py-3.5 px-4 flex items-center justify-between shadow-sm group cursor-pointer"
          >
            <div className="flex items-center gap-2.5 text-left">
              <span
                className="material-symbols-outlined text-inverse-on-surface text-[22px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                admin_panel_settings
              </span>
              <span className="text-xs sm:text-sm font-bold tracking-tight">
                Municipal Board Login
              </span>
            </div>
            <span className="material-symbols-outlined text-outline-variant group-hover:text-inverse-on-surface text-[20px] transition-colors">
              arrow_forward
            </span>
          </button>

          {/* Guest Login (Secondary Outlined Card Action) */}
          <button
            onClick={() => openConfirmation(false)}
            type="button"
            className="w-full bg-surface-container-lowest hover:bg-surface-container-low active:scale-[0.99] transition-all text-on-surface rounded-xl p-3.5 text-left flex items-start justify-between shadow-sm border border-surface-container group cursor-pointer"
          >
            <div className="flex items-start gap-2.5">
              <div className="p-2 rounded-lg bg-surface-container text-primary mt-0.5">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  location_on
                </span>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-on-surface tracking-tight">
                  Guest Login
                </div>
                <div className="text-[11px] text-secondary mt-0.5 leading-snug">
                  Explore Agartala Bins &amp; Report Cleanliness
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:text-on-surface text-[20px] mt-2 transition-colors">
              chevron_right
            </span>
          </button>
        </div>

        {/* Direct Status Bar Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2 pt-4 border-t border-slate-100 w-full">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[11px] font-medium text-secondary">
            Operational Feed: AMC Central Ward Active
          </span>
        </div>
      </div>

      {/* Role Confirmation Popover Overlay */}
      {modalState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/45 backdrop-blur-sm transition-opacity duration-200">
          <div className="w-full max-w-xs bg-surface-container-lowest rounded-2xl shadow-2xl p-6 flex flex-col items-center text-center border border-surface-container animate-in fade-in zoom-in-95">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
                modalState.isBoard
                  ? 'bg-surface-container-highest text-inverse-surface'
                  : 'bg-primary-fixed text-on-primary-fixed-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[28px]">
                {modalState.icon}
              </span>
            </div>

            <h3 className="text-base font-bold text-on-surface mb-1">
              {modalState.title}
            </h3>
            <p className="text-xs text-secondary mb-5 leading-relaxed">
              {modalState.description}
            </p>

            <div className="w-full flex flex-col gap-2">
              <button
                onClick={handleProceed}
                type="button"
                className="w-full bg-primary hover:bg-primary-container active:scale-[0.98] text-on-primary py-2.5 px-4 rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                Proceed to Ward Portal
              </button>
              <button
                onClick={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
                type="button"
                className="w-full bg-transparent hover:bg-slate-100 text-secondary hover:text-on-surface py-2 px-4 rounded-xl text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

