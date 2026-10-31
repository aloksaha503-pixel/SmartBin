'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SmartBin } from '@/data/bins';

interface BinDetailCardProps {
  bin: SmartBin;
}

export default function BinDetailCard({ bin }: BinDetailCardProps) {
  const [copied, setCopied] = useState(false);

  const getStatusColor = (fill: number, status: string) => {
    if (status === 'Critical Overflow Alert' || fill >= 90) return 'text-error bg-error-container';
    if (status === 'Hardware Damaged') return 'text-error bg-error-container';
    if (fill >= 75) return 'text-amber-800 bg-amber-100';
    if (fill >= 50) return 'text-primary bg-primary-fixed';
    return 'text-tertiary bg-tertiary-fixed';
  };

  const getProgressBarColor = (fill: number, status: string) => {
    if (status === 'Critical Overflow Alert' || fill >= 90) return 'bg-error';
    if (status === 'Hardware Damaged') return 'bg-error';
    if (fill >= 75) return 'bg-amber-500';
    if (fill >= 50) return 'bg-primary';
    return 'bg-tertiary';
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `SmartBin ${bin.id} - ${bin.name}`,
          text: `Current fill level: ${bin.fill}% at ${bin.location}, Agartala.`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section
      aria-labelledby="detail-bin-heading"
      className="w-full bg-surface-container-lowest rounded-2xl shadow-md p-4 sm:p-5 border border-surface-container transition-all"
    >
      {/* Header: ID, Badge, Location & Fill */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center shrink-0 shadow-sm text-primary">
            <span className="material-symbols-outlined text-[26px]">delete</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2
                id="detail-bin-heading"
                className="text-lg font-bold text-on-surface tracking-tight"
              >
                {bin.id}
              </h2>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${getStatusColor(
                  bin.fill,
                  bin.status
                )}`}
              >
                {bin.status}
              </span>
            </div>
            <p className="text-xs text-secondary truncate mt-0.5">{bin.location}</p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-2xl sm:text-3xl font-extrabold text-on-surface leading-none">
            {bin.fill}%
          </span>
          <span className="block text-[10px] uppercase text-secondary tracking-wider font-semibold mt-0.5">
            Capacity
          </span>
        </div>
      </div>

      {/* Volumetric Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center text-xs mb-1.5">
          <span className="text-secondary font-medium">Volumetric Level (Ultrasonic Sensor)</span>
          <span className="font-bold text-on-surface">{bin.status}</span>
        </div>
        <div className="w-full h-3 rounded-full bg-surface-container overflow-hidden p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-700 ${getProgressBarColor(
              bin.fill,
              bin.status
            )}`}
            style={{ width: `${bin.fill}%` }}
          />
        </div>
      </div>

      {/* Telemetry & Sensor Info Grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <div className="bg-surface-container-low rounded-xl p-2.5 flex items-center gap-2.5 border border-slate-100">
          <span
            className={`material-symbols-outlined text-[20px] ${
              bin.condition.includes('Defect') || bin.condition.includes('Spillage')
                ? 'text-error'
                : 'text-primary'
            }`}
          >
            {bin.condition.includes('Defect')
              ? 'warning'
              : bin.condition.includes('Offline')
              ? 'wifi_off'
              : 'check_circle'}
          </span>
          <div className="min-w-0">
            <span className="block text-[10px] uppercase text-secondary font-semibold">
              Physical Unit
            </span>
            <span className="text-xs font-semibold text-on-surface truncate block">
              {bin.condition}
            </span>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-xl p-2.5 flex items-center gap-2.5 border border-slate-100">
          <span className="material-symbols-outlined text-tertiary text-[20px]">sensors</span>
          <div className="min-w-0">
            <span className="block text-[10px] uppercase text-secondary font-semibold">
              Telemetry
            </span>
            <span className="text-xs font-semibold text-on-surface truncate block">
              Synced {bin.lastSynced}
            </span>
          </div>
        </div>
      </div>

      {/* Civic Authority Notice */}
      <div className="bg-surface-container rounded-xl p-2.5 mb-4 flex items-start gap-2 text-xs text-on-surface-variant">
        <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
          verified
        </span>
        <p className="leading-relaxed">
          Public waste container maintained by <strong>Agartala Municipal Corporation (AMC)</strong>.
          Notice an overflow, odor, or lid defect? Submit an instant report below.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Link
          href={`/report?bin=${bin.id}`}
          className="flex-1 py-2.5 px-4 bg-primary hover:bg-primary-container active:scale-[0.99] text-on-primary text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">report_problem</span>
          <span>Report Issue for {bin.id}</span>
        </Link>

        <div className="grid grid-cols-2 gap-2 sm:w-auto">
          <button
            type="button"
            onClick={() =>
              alert(
                `Routing pedestrian directions to SmartBin ${bin.id} at ${bin.location} via Agartala Central road.`
              )
            }
            className="h-10 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-surface-container"
          >
            <span className="material-symbols-outlined text-secondary text-[18px]">directions</span>
            <span>Directions</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="h-10 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-surface-container"
          >
            <span className="material-symbols-outlined text-secondary text-[18px]">share</span>
            <span>{copied ? 'Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

