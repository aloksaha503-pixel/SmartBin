'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import InteractiveMap from '@/components/InteractiveMap';
import BinDetailCard from '@/components/BinDetailCard';

export default function BinsMapPage() {
  const { bins, selectedBin, setSelectedBin, searchQuery, setSearchQuery } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    if (filter === 'all') {
      setSearchQuery('');
    } else if (filter === 'critical') {
      setSearchQuery('Critical');
    } else if (filter === 'damaged') {
      setSearchQuery('Damaged');
    } else if (filter === 'ward06') {
      setSearchQuery('Ward 06');
    } else if (filter === 'ward04') {
      setSearchQuery('Ward 04');
    }
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-6 flex flex-col gap-4">
      {/* Search & Locality Quick Switch Bar */}
      <div className="bg-surface-container-lowest p-2.5 sm:p-3 rounded-2xl shadow-sm border border-surface-container flex items-center gap-2 sm:gap-3">
        <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-primary text-[22px]">delete</span>
        </div>

        <div className="flex-1 min-w-0 flex items-center bg-surface-container-low rounded-xl px-3 h-10 border border-slate-100">
          <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mr-2">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bin ID e.g. AGT-003, locality, or ward..."
            className="w-full bg-transparent text-on-surface text-xs sm:text-sm focus:outline-none placeholder:text-secondary truncate font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear Search"
              className="text-secondary hover:text-on-surface p-1 rounded-full"
            >
              <span className="material-symbols-outlined text-[16px]">cancel</span>
            </button>
          )}
        </div>

        <button
          onClick={() => {
            const agt3 = bins.find((b) => b.id === 'AGT-003');
            if (agt3) setSelectedBin(agt3);
          }}
          title="Reset to Central Ward (Banamalipur)"
          className="h-10 px-3 rounded-xl bg-surface-container text-primary hover:bg-primary-fixed hover:text-on-primary-fixed flex items-center justify-center shrink-0 transition-colors shadow-sm text-xs font-semibold gap-1 hidden sm:flex"
        >
          <span className="material-symbols-outlined text-[18px]">near_me</span>
          <span>Central AMC</span>
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <button
          onClick={() => handleFilterChange('all')}
          className={`px-3 py-1.5 rounded-full font-semibold shrink-0 transition-colors ${
            selectedFilter === 'all'
              ? 'bg-inverse-surface text-inverse-on-surface shadow-sm'
              : 'bg-surface-container-high text-on-surface hover:bg-surface-container'
          }`}
        >
          All Bins ({bins.length})
        </button>
        <button
          onClick={() => handleFilterChange('critical')}
          className={`px-3 py-1.5 rounded-full font-semibold shrink-0 transition-colors ${
            selectedFilter === 'critical'
              ? 'bg-error text-on-error shadow-sm'
              : 'bg-error-container text-on-error-container hover:bg-red-100'
          }`}
        >
          Critical Overflows
        </button>
        <button
          onClick={() => handleFilterChange('damaged')}
          className={`px-3 py-1.5 rounded-full font-semibold shrink-0 transition-colors ${
            selectedFilter === 'damaged'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
          }`}
        >
          Hardware Defects
        </button>
        <button
          onClick={() => handleFilterChange('ward06')}
          className={`px-3 py-1.5 rounded-full font-semibold shrink-0 transition-colors ${
            selectedFilter === 'ward06'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'bg-surface-container-high text-on-surface hover:bg-surface-container'
          }`}
        >
          Ward 06 (Banamalipur)
        </button>
        <button
          onClick={() => handleFilterChange('ward04')}
          className={`px-3 py-1.5 rounded-full font-semibold shrink-0 transition-colors ${
            selectedFilter === 'ward04'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'bg-surface-container-high text-on-surface hover:bg-surface-container'
          }`}
        >
          Ward 04 (Heritage Zone)
        </button>
      </div>

      {/* Main Grid: Interactive Map + Selected Bin Telemetry Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        {/* Map Column (Takes 2 cols on wide screens) */}
        <div className="lg:col-span-2">
          <InteractiveMap
            onSelectBin={(bin) => setSelectedBin(bin)}
            selectedBinId={selectedBin?.id}
          />
        </div>

        {/* Selected Bin Detail Panel */}
        <div className="lg:col-span-1">
          {selectedBin ? (
            <BinDetailCard bin={selectedBin} />
          ) : (
            <div className="w-full bg-surface-container-lowest rounded-2xl shadow-md p-6 text-center border border-surface-container flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary mb-3">
                <span className="material-symbols-outlined text-[26px]">touch_app</span>
              </div>
              <h3 className="text-sm font-bold text-on-surface">Select a SmartBin Marker</h3>
              <p className="text-xs text-secondary mt-1 max-w-xs">
                Tap any dustbin marker on the map to inspect live ultrasonic fill telemetry, condition, and directions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

