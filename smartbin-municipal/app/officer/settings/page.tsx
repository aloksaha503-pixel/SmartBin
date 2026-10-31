'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function OfficerSettingsPage() {
  const router = useRouter();
  const { user, logout, updateOfficerDuty } = useApp();

  const [onDuty, setOnDuty] = useState(user ? user.onDuty : true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [offlineSync, setOfflineSync] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleDutyToggle = () => {
    const nextVal = !onDuty;
    setOnDuty(nextVal);
    updateOfficerDuty(nextVal);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="flex-1 w-full max-w-xl mx-auto px-4 sm:px-6 pt-20 pb-12 flex flex-col gap-4">
      {savedNotice && (
        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
          <span>Duty desk status updated and synchronized with AMC Gateway.</span>
        </div>
      )}

      {/* Profile Header Card */}
      <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl shadow-sm border border-surface-container flex flex-col items-center text-center relative overflow-hidden">
        <div className="w-20 h-20 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center mb-3 shadow-md border-2 border-white">
          <span className="material-symbols-outlined text-[40px]">person</span>
        </div>

        <h1 className="text-lg sm:text-xl font-bold text-on-surface">
          {user ? user.name : 'Officer Debbarma'}
        </h1>
        <p className="text-xs font-semibold text-primary mt-0.5">
          {user ? user.role : 'Senior Ward Sanitation Officer'}
        </p>
        <p className="text-[11px] text-secondary mt-0.5">
          {user ? user.ward : 'AMC Zone-2 · Ward 06 Field Desk'}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <span className="text-xs font-mono font-bold bg-surface-container px-3 py-1 rounded-full text-slate-800 border border-slate-200">
            ID: {user ? user.id : 'AMC-W06'}
          </span>
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${
              onDuty ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                onDuty ? 'bg-emerald-600 animate-pulse' : 'bg-slate-500'
              }`}
            />
            {onDuty ? 'Active On Duty' : 'Off Duty'}
          </span>
        </div>
      </div>

      {/* Duty Status Switcher */}
      <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-2xl shadow-sm border border-surface-container flex items-center justify-between">
        <div>
          <span className="text-xs sm:text-sm font-bold text-on-surface block">
            Field Duty Active Status
          </span>
          <p className="text-[11px] text-secondary mt-0.5">
            When active, automatic emergency spillage dispatches are routed to this terminal.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDutyToggle}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
            onDuty ? 'bg-primary' : 'bg-slate-300'
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              onDuty ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Operational Shift & Ward Info */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex flex-col gap-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-secondary border-b border-slate-100 pb-2">
          Assignment Specifications
        </h2>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-surface-container-low p-3 rounded-xl border border-slate-100">
            <span className="text-[10px] text-secondary uppercase font-semibold block">
              Designated Ward
            </span>
            <span className="text-xs font-bold text-on-surface mt-0.5 block">
              Ward 06 (Banamalipur)
            </span>
          </div>

          <div className="bg-surface-container-low p-3 rounded-xl border border-slate-100">
            <span className="text-[10px] text-secondary uppercase font-semibold block">
              Shift Window
            </span>
            <span className="text-xs font-bold text-on-surface mt-0.5 block">
              06:00 - 14:00 IST Morning
            </span>
          </div>

          <div className="bg-surface-container-low p-3 rounded-xl border border-slate-100">
            <span className="text-[10px] text-secondary uppercase font-semibold block">
              Response Crew
            </span>
            <span className="text-xs font-bold text-on-surface mt-0.5 block">
              Rapid Truck AMC-08
            </span>
          </div>

          <div className="bg-surface-container-low p-3 rounded-xl border border-slate-100">
            <span className="text-[10px] text-secondary uppercase font-semibold block">
              Control Station
            </span>
            <span className="text-xs font-bold text-on-surface mt-0.5 block">
              Melarmath HQ Desk
            </span>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex flex-col gap-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-secondary border-b border-slate-100 pb-2">
          Telemetry &amp; Incident Alerts
        </h2>

        <label className="flex items-center justify-between text-xs cursor-pointer">
          <span className="font-medium text-on-surface">Critical 90%+ Dustbin Overflow Pushes</span>
          <input
            type="checkbox"
            checked={pushAlerts}
            onChange={(e) => setPushAlerts(e.target.checked)}
            className="w-4 h-4 accent-emerald-700"
          />
        </label>

        <label className="flex items-center justify-between text-xs cursor-pointer">
          <span className="font-medium text-on-surface">Audible High-Priority Incident Sound</span>
          <input
            type="checkbox"
            checked={soundAlerts}
            onChange={(e) => setSoundAlerts(e.target.checked)}
            className="w-4 h-4 accent-emerald-700"
          />
        </label>

        <label className="flex items-center justify-between text-xs cursor-pointer">
          <span className="font-medium text-on-surface">Auto-sync offline telemetry on reconnect</span>
          <input
            type="checkbox"
            checked={offlineSync}
            onChange={(e) => setOfflineSync(e.target.checked)}
            className="w-4 h-4 accent-emerald-700"
          />
        </label>
      </div>

      {/* Account Actions */}
      <div className="flex flex-col gap-2">
        <Link
          href="/officer"
          className="w-full py-2.5 px-4 bg-primary text-on-primary rounded-xl text-xs font-bold text-center hover:bg-primary-container transition-colors shadow-sm"
        >
          Return to Officer Field Desk
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full py-2.5 px-4 bg-transparent hover:bg-red-50 text-red-600 rounded-xl text-xs font-bold text-center border border-red-200 transition-colors flex items-center justify-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">logout</span>
          <span>Log Out of Municipal Terminal</span>
        </button>
      </div>
    </div>
  );
}

