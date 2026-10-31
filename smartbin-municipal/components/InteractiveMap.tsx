'use client';

import React, { useState } from 'react';
import { SmartBin } from '@/data/bins';
import { useApp } from '@/context/AppContext';

interface InteractiveMapProps {
  onSelectBin: (bin: SmartBin) => void;
  selectedBinId?: string;
}

export default function InteractiveMap({ onSelectBin, selectedBinId }: InteractiveMapProps) {
  const { bins, searchQuery } = useApp();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeLayer, setActiveLayer] = useState<'standard' | 'satellite' | 'heatmap'>('standard');
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const filteredBins = bins.filter((bin) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      bin.id.toLowerCase().includes(query) ||
      bin.name.toLowerCase().includes(query) ||
      bin.location.toLowerCase().includes(query) ||
      bin.ward.toLowerCase().includes(query)
    );
  });

  const handleRecenter = () => {
    setShowNotification('Map recentered to your detected GPS location near Ujjayanta Palace Circular Rd.');
    setTimeout(() => setShowNotification(null), 3500);
  };

  const getMarkerBadge = (bin: SmartBin) => {
    if (bin.status === 'Critical Overflow Alert') {
      return (
        <div className="relative flex flex-col items-center">
          <div className="absolute -inset-2 rounded-full bg-error/30 animate-ping pointer-events-none" />
          <div className="w-10 h-10 rounded-full bg-error flex items-center justify-center shadow-lg ring-2 ring-surface-container-lowest relative z-10 transition-transform hover:scale-110">
            <span className="material-symbols-outlined text-on-error text-[20px]">delete_forever</span>
          </div>
          <div className="mt-1 bg-error-container text-on-error-container px-1.5 py-0.5 rounded-sm shadow-sm flex items-center gap-1 relative z-10">
            <span className="material-symbols-outlined text-[10px] text-error font-bold">warning</span>
            <span className="text-[10px] text-error font-bold">{bin.fill}%</span>
            <span className="text-[9px] font-mono text-on-error-container">{bin.id}</span>
          </div>
        </div>
      );
    }

    if (bin.status === 'Hardware Damaged') {
      return (
        <div className="relative flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shadow-lg ring-2 ring-surface-container-lowest transition-transform hover:scale-110 relative">
            <span className="material-symbols-outlined text-on-primary-container text-[20px]">delete</span>
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-error text-on-error flex items-center justify-center shadow-md ring-1 ring-surface-container-lowest">
              <span className="material-symbols-outlined text-[12px]">build</span>
            </div>
          </div>
          <div className="mt-1 bg-surface-container-lowest/95 backdrop-blur-xs px-1.5 py-0.5 rounded-sm shadow-sm flex items-center gap-1">
            <span className="text-[10px] text-error font-bold">Damaged</span>
            <span className="text-[9px] text-secondary font-mono">{bin.id}</span>
          </div>
        </div>
      );
    }

    if (bin.status === 'Sensor Offline') {
      return (
        <div className="relative flex flex-col items-center opacity-85">
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shadow-md ring-2 ring-surface-container-lowest relative transition-transform hover:scale-110">
            <span className="material-symbols-outlined text-on-secondary text-[18px]">delete_sweep</span>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-on-surface text-surface-container-lowest flex items-center justify-center ring-1 ring-surface-container-lowest">
              <span className="material-symbols-outlined text-[10px]">wifi_off</span>
            </div>
          </div>
          <div className="mt-1 bg-surface-container-lowest/90 px-1 py-0.5 rounded-sm shadow-sm flex items-center gap-0.5">
            <span className="text-[9px] text-secondary font-medium">Offline</span>
          </div>
        </div>
      );
    }

    if (bin.fill >= 75) {
      return (
        <div className="relative flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center shadow-lg ring-2 ring-surface-container-lowest transition-transform hover:scale-110 font-bold">
            <span className="material-symbols-outlined text-[20px]">delete</span>
          </div>
          <div className="mt-1 bg-surface-container-lowest px-2 py-0.5 rounded shadow flex items-center gap-1">
            <span className="text-[10px] text-amber-700 font-bold">{bin.fill}%</span>
            <span className="text-[9px] text-secondary font-mono">{bin.id}</span>
          </div>
        </div>
      );
    }

    if (bin.fill >= 50) {
      return (
        <div className="relative flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg ring-2 ring-surface-container-lowest transition-transform hover:scale-110">
            <span className="material-symbols-outlined text-on-primary text-[20px]">delete</span>
          </div>
          <div className="mt-1 bg-surface-container-lowest/95 backdrop-blur-xs px-1.5 py-0.5 rounded-sm shadow-sm flex items-center gap-1">
            <span className="text-[10px] text-primary font-bold">{bin.fill}%</span>
            <span className="text-[9px] text-secondary font-mono">{bin.id}</span>
          </div>
        </div>
      );
    }

    // Default < 50%
    return (
      <div className="relative flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center shadow-lg ring-2 ring-surface-container-lowest transition-transform hover:scale-110">
          <span className="material-symbols-outlined text-on-tertiary text-[20px]">delete</span>
        </div>
        <div className="mt-1 bg-surface-container-lowest/95 backdrop-blur-xs px-1.5 py-0.5 rounded-sm shadow-sm flex items-center gap-1">
          <span className="text-[10px] text-tertiary font-bold">{bin.fill}%</span>
          <span className="text-[9px] text-secondary font-mono">{bin.id}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] rounded-2xl overflow-hidden shadow-lg border border-surface-container bg-[#eaf1fb]">
      {/* Toast Notification */}
      {showNotification && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-xl text-xs font-medium shadow-xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-primary-fixed text-[18px]">gps_fixed</span>
          <span>{showNotification}</span>
        </div>
      )}

      {/* Map Graphic Canvas / Simulation with Agartala Roads & Howrah River */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-300 select-none"
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'center center',
          background:
            activeLayer === 'satellite'
              ? 'radial-gradient(ellipse at 50% 50%, #1e293b 0%, #0f172a 100%)'
              : 'linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)',
        }}
      >
        {/* Agartala Street Map SVG Geometry */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Howrah River Curve */}
          <path
            d="M -50 420 Q 200 440 380 340 T 800 280 T 1200 260"
            fill="none"
            stroke="#93c5fd"
            strokeWidth="32"
            strokeLinecap="round"
            opacity="0.75"
          />
          <path
            d="M -50 420 Q 200 440 380 340 T 800 280 T 1200 260"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="18"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Urban Road Grid */}
          {/* Arterial 1: Palace Circular Road */}
          <circle cx="68%" cy="26%" r="70" fill="none" stroke="#cbd5e1" strokeWidth="8" />
          <line x1="0" y1="180" x2="100%" y2="180" stroke="#e2e8f0" strokeWidth="10" />
          <line x1="0" y1="360" x2="100%" y2="340" stroke="#e2e8f0" strokeWidth="12" />
          <line x1="28%" y1="0" x2="28%" y2="100%" stroke="#e2e8f0" strokeWidth="8" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#e2e8f0" strokeWidth="12" />
          <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#cbd5e1" strokeWidth="10" />

          {/* Diagonal Arterials */}
          <line x1="10%" y1="0" x2="80%" y2="100%" stroke="#e2e8f0" strokeWidth="6" strokeDasharray="6,4" />
          <line x1="90%" y1="0" x2="20%" y2="100%" stroke="#e2e8f0" strokeWidth="6" strokeDasharray="6,4" />
        </svg>

        {/* Agartala Civic Landmark Badges */}
        <div className="absolute top-6 left-6 pointer-events-none flex flex-col gap-1">
          <div className="bg-surface-container-lowest/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 w-fit border border-surface-container">
            <span className="material-symbols-outlined text-tertiary text-[15px]">account_balance</span>
            <span className="text-xs font-semibold text-on-surface">Ujjayanta Palace Sector</span>
          </div>
          <span className="text-[10px] text-secondary font-medium ml-1">
            North Agartala Zone · Ward 4
          </span>
        </div>

        <div className="absolute top-1/4 right-8 pointer-events-none">
          <div className="bg-surface-container-lowest/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-surface-container">
            <span className="material-symbols-outlined text-secondary text-[15px]">storefront</span>
            <span className="text-xs font-semibold text-on-surface">City Centre Complex</span>
          </div>
        </div>

        <div className="absolute bottom-28 left-8 pointer-events-none">
          <div className="bg-surface-container-lowest/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-surface-container">
            <span className="material-symbols-outlined text-secondary text-[15px]">directions_bus</span>
            <span className="text-xs font-semibold text-on-surface">Battala Central Junction</span>
          </div>
        </div>

        <div className="absolute top-36 left-1/3 pointer-events-none">
          <div className="bg-surface-container-lowest/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1 border border-surface-container">
            <span className="material-symbols-outlined text-primary text-[14px]">park</span>
            <span className="text-[11px] font-medium text-on-surface">Radhanagar Eco Park</span>
          </div>
        </div>

        {/* Current User GPS Location (Pulsing blue aura) */}
        <div className="absolute top-44 left-24 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-20">
          <div className="w-10 h-10 rounded-full bg-tertiary/25 animate-ping absolute" />
          <div className="w-4 h-4 rounded-full bg-tertiary shadow-md ring-2 ring-white relative z-10 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
          <div className="absolute top-5 bg-tertiary text-on-tertiary text-[9px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap">
            You Are Here
          </div>
        </div>

        {/* Interactive Dustbin Markers */}
        {filteredBins.map((bin) => {
          const isSelected = selectedBinId === bin.id;
          return (
            <button
              key={bin.id}
              type="button"
              onClick={() => onSelectBin(bin)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 z-30 focus:outline-none ${
                isSelected ? 'scale-125 z-40' : 'hover:scale-110 active:scale-95'
              }`}
              style={{ top: `${bin.mapPos.top}%`, left: `${bin.mapPos.left}%` }}
              aria-label={`SmartBin ${bin.id}, ${bin.fill}% full at ${bin.name}`}
            >
              {isSelected && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-slate-900 text-white text-[9px] uppercase tracking-wider font-bold shadow-md whitespace-nowrap">
                  Selected
                </div>
              )}
              {getMarkerBadge(bin)}
            </button>
          );
        })}
      </div>

      {/* Map Control Buttons: Top Right */}
      <div className="absolute right-3 top-3 flex flex-col gap-1.5 z-40">
        <button
          onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
          aria-label="Zoom in"
          className="w-9 h-9 rounded-xl bg-surface-container-lowest/95 backdrop-blur-sm text-on-surface shadow-md flex items-center justify-center hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
          aria-label="Zoom out"
          className="w-9 h-9 rounded-xl bg-surface-container-lowest/95 backdrop-blur-sm text-on-surface shadow-md flex items-center justify-center hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">remove</span>
        </button>
        <button
          onClick={() =>
            setActiveLayer((l) => (l === 'standard' ? 'satellite' : 'standard'))
          }
          aria-label="Toggle map layer"
          title="Toggle map style"
          className={`w-9 h-9 rounded-xl backdrop-blur-sm shadow-md flex items-center justify-center transition-colors ${
            activeLayer === 'satellite'
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container-lowest/95 text-secondary hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">layers</span>
        </button>
        <button
          onClick={handleRecenter}
          aria-label="Recenter to GPS"
          title="Recenter GPS"
          className="w-9 h-9 rounded-xl bg-surface-container-lowest/95 backdrop-blur-sm text-primary shadow-md flex items-center justify-center hover:bg-primary-fixed transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">my_location</span>
        </button>
      </div>

      {/* Floating Status Legend: Bottom Left */}
      <div className="absolute bottom-3 left-3 z-40 max-w-[230px] bg-surface-container-lowest/95 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-surface-container flex flex-col gap-1.5 text-xs">
        <div className="flex items-center justify-between pb-1 border-b border-surface-container">
          <span className="text-[10px] uppercase font-bold text-secondary tracking-wider">
            Dustbin Fill Legend
          </span>
          <span className="text-[9px] text-primary font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Live IoT
          </span>
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-tertiary flex items-center justify-center text-[8px] text-white font-bold">
              &lt;
            </div>
            <span className="text-[10px] text-on-surface">&lt; 50% Low</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-primary flex items-center justify-center text-[8px] text-white font-bold">
              M
            </div>
            <span className="text-[10px] text-on-surface">50-74% Med</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center text-[8px] font-bold">
              H
            </div>
            <span className="text-[10px] text-on-surface">75-89% High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-error text-white flex items-center justify-center text-[8px] font-bold">
              !
            </div>
            <span className="text-[10px] text-error font-semibold">90%+ Critical</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2 pt-0.5 border-t border-slate-100">
            <div className="w-3 h-3 rounded-full bg-secondary flex items-center justify-center text-white text-[8px]">
              x
            </div>
            <span className="text-[9px] text-secondary">Offline / Stale</span>
            <div className="w-3 h-3 rounded-full bg-error ml-2 flex items-center justify-center text-white text-[8px]">
              *
            </div>
            <span className="text-[9px] text-error">Damaged</span>
          </div>
        </div>
      </div>
    </div>
  );
}

