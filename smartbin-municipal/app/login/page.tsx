'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useApp();

  const [staffId, setStaffId] = useState('AMC-W06');
  const [password, setPassword] = useState('amc123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!staffId.trim()) {
      setErrorMsg('Please enter your Staff ID or registered municipal email.');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Please enter your municipal access password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const ok = login(staffId, password);
      setLoading(false);
      if (ok) {
        router.push('/officer');
      } else {
        setErrorMsg('Invalid credentials. Use demo: AMC-W06 / amc123');
      }
    }, 600);
  };

  const fillDemo = () => {
    setStaffId('AMC-W06');
    setPassword('amc123');
    setErrorMsg('');
  };

  return (
    <div className="flex-1 w-full bg-[#f8f9fc] flex items-center justify-center p-4 min-h-[calc(100vh-3.5rem)]">
      <div className="w-full max-w-sm mx-auto">
        {/* Main Card Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-7 relative overflow-hidden">
          {/* Top Brand Icon & Name */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center mb-3 shadow-sm border border-slate-100">
              <span className="material-symbols-outlined text-[34px] text-primary">
                admin_panel_settings
              </span>
            </div>

            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              SmartBin Portal
            </h1>
            <p className="text-[11px] text-slate-500 font-semibold tracking-wider uppercase mt-0.5">
              Agartala Municipal Corporation
            </p>
          </div>

          {/* Page Heading & Purpose */}
          <div className="mb-5 pb-3 border-b border-slate-100">
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              Municipal Staff Login
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Authorized AMC sanitation &amp; telemetry personnel
            </p>
          </div>

          {/* Alert Box for Error / Notice */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl text-xs flex items-start gap-2 bg-red-50 text-red-700 border border-red-200 transition-all">
              <span className="material-symbols-outlined text-[16px] text-red-600 shrink-0 mt-0.5">
                error
              </span>
              <span className="flex-1 font-medium leading-relaxed">{errorMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Staff ID / Email Field */}
            <div>
              <label
                htmlFor="staffId"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Staff ID or Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <span className="material-symbols-outlined text-[18px]">badge</span>
                </div>
                <input
                  type="text"
                  id="staffId"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  placeholder="e.g. AMC-W06 or staff@amc.gov.in"
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter municipal password"
                  className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer focus:ring-2 focus:ring-slate-900/20 focus:outline-none disabled:opacity-75"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Officer...</span>
                </>
              ) : (
                <>
                  <span>Login to Field Desk</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </>
              )}
            </button>

            {/* Back Button to Role Selection */}
            <Link
              href="/"
              className="w-full py-2 px-4 bg-transparent hover:bg-slate-50 text-slate-600 hover:text-slate-900 text-xs font-semibold rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Back to Role Selection</span>
            </Link>
          </form>

          {/* Discreet Demo Helper */}
          <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              AMC Gateway Auth
            </span>
            <button
              onClick={fillDemo}
              type="button"
              className="font-mono text-[10px] text-emerald-600 hover:text-emerald-700 font-bold underline"
            >
              Demo: AMC-W06 / amc123
            </button>
          </div>
        </div>

        {/* Security Footnote */}
        <p className="text-center text-[11px] text-slate-400 mt-4 font-normal">
          Protected Government Telemetry Portal • Agartala Smart City Mission
        </p>
      </div>
    </div>
  );
}

