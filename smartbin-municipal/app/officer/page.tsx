'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ProblemReport } from '@/data/reports';

export default function OfficerDashboardPage() {
  const router = useRouter();
  const { user, reports, updateReportStatus, setSelectedBin, bins } = useApp();

  const [activeTab, setActiveTab] = useState<'problem_reports' | 'dustbin_reports' | 'telemetry'>('problem_reports');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Filter reports
  const filteredReports = reports.filter((r) => {
    if (statusFilter !== 'All' && r.status !== statusFilter) return false;
    if (categoryFilter !== 'All' && !r.category.toLowerCase().includes(categoryFilter.toLowerCase())) return false;
    return true;
  });

  const handleDispatch = (reportId: string) => {
    updateReportStatus(reportId, 'In Progress', 'Rapid Response Truck AMC-08');
    setActionNotice(`Cleaning Crew Dispatched for Ticket ${reportId}! Status updated to In Progress.`);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleResolve = (reportId: string) => {
    updateReportStatus(reportId, 'Resolved', 'Field Cleaned & Sensor Calibrated');
    setActionNotice(`Ticket ${reportId} marked as Resolved! Citizen notification queued.`);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const viewBinOnMap = (binId?: string) => {
    if (binId) {
      const match = bins.find((b) => b.id === binId);
      if (match) setSelectedBin(match);
    }
    router.push('/map');
  };

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-12 flex flex-col gap-4">
      {/* Toast Alert Banner */}
      {actionNotice && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">verified</span>
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Municipal Context & Officer Identity Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-surface-container-low px-4 sm:px-5 py-3 rounded-2xl border border-surface-container gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">verified_user</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm sm:text-base font-bold text-on-surface truncate">
              {user ? user.name : 'Officer Debbarma'}
            </span>
            <span className="text-xs text-secondary truncate">
              {user ? user.ward : 'AMC Zone-2 · Ward 06 Field Desk'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs font-mono font-bold bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-full border border-surface-container">
            Unit #{user ? user.id : 'AMC-W06'}
          </span>
          <Link
            href="/officer/settings"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-slate-200"
          >
            <span className="material-symbols-outlined text-[16px]">settings</span>
            <span>Duty Desk</span>
          </Link>
        </div>
      </div>

      {/* Sub-Navigation Segmented Control */}
      <div className="flex items-center bg-surface-container p-1 rounded-xl gap-1">
        <button
          onClick={() => setActiveTab('problem_reports')}
          className={`flex-1 py-2 px-2 text-center rounded-lg text-xs font-bold transition-all ${
            activeTab === 'problem_reports'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-secondary hover:text-on-surface'
          }`}
        >
          Problem Reports ({reports.length})
        </button>
        <button
          onClick={() => setActiveTab('dustbin_reports')}
          className={`flex-1 py-2 px-2 text-center rounded-lg text-xs font-bold transition-all ${
            activeTab === 'dustbin_reports'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-secondary hover:text-on-surface'
          }`}
        >
          IoT Sensor Hub ({bins.length})
        </button>
        <button
          onClick={() => router.push('/map')}
          className="flex-1 py-2 px-2 text-center rounded-lg text-xs font-bold text-secondary hover:text-on-surface transition-all flex items-center justify-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">map</span>
          <span>Dustbin Map</span>
        </button>
      </div>

      {/* Operational Telemetry Metric Tiles */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <div className="bg-surface-container-lowest p-3 sm:p-4 rounded-2xl flex flex-col shadow-sm border border-surface-container">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-secondary">Active</span>
            <span className="material-symbols-outlined text-[18px] text-tertiary">
              assignment_late
            </span>
          </div>
          <span className="text-xl sm:text-2xl font-extrabold text-on-surface">
            {reports.filter((r) => r.status !== 'Resolved').length}
          </span>
          <span className="text-[10px] sm:text-xs text-secondary truncate font-medium">
            Ward 06 Active
          </span>
        </div>

        <div className="bg-surface-container-lowest p-3 sm:p-4 rounded-2xl flex flex-col shadow-sm border border-surface-container">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-error">Priority</span>
            <span className="material-symbols-outlined text-[18px] text-error">
              notification_important
            </span>
          </div>
          <span className="text-xl sm:text-2xl font-extrabold text-error">
            {reports.filter((r) => r.priority === 'High Priority').length}
          </span>
          <span className="text-[10px] sm:text-xs text-secondary truncate font-medium">
            Near Markets
          </span>
        </div>

        <div className="bg-surface-container-lowest p-3 sm:p-4 rounded-2xl flex flex-col shadow-sm border border-surface-container">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-primary">Avg Time</span>
            <span className="material-symbols-outlined text-[18px] text-primary">schedule</span>
          </div>
          <span className="text-xl sm:text-2xl font-extrabold text-on-surface">
            3.2<span className="text-xs text-secondary font-medium">h</span>
          </span>
          <span className="text-[10px] sm:text-xs text-secondary truncate font-medium">
            Turnaround
          </span>
        </div>
      </div>

      {activeTab === 'problem_reports' ? (
        <>
          {/* Interactive Filters & Classification Tray */}
          <div className="flex flex-col gap-2">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              {['All', 'New Alert', 'In Progress', 'Resolved'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-full font-semibold shrink-0 transition-colors ${
                    statusFilter === st
                      ? 'bg-inverse-surface text-inverse-on-surface shadow-sm'
                      : 'bg-surface-container-high text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {st}{' '}
                  <span className="opacity-80">
                    (
                    {st === 'All'
                      ? reports.length
                      : reports.filter((r) => r.status === st).length}
                    )
                  </span>
                </button>
              ))}
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              {['All', 'Dumping', 'Overflowing', 'Lid', 'Odor'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-lg font-medium shrink-0 transition-colors ${
                    categoryFilter === cat
                      ? 'bg-primary text-on-primary font-bold'
                      : 'bg-surface-container-low text-secondary hover:bg-slate-200'
                  }`}
                >
                  {cat === 'All' ? 'All Issues' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Incident Tickets List */}
          <div className="flex flex-col gap-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-sm border border-surface-container flex flex-col gap-3 transition-all hover:shadow-md"
              >
                {/* Header: ID, Badges & Time */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold bg-surface-container px-2.5 py-1 rounded-md text-on-surface">
                        {report.id}
                      </span>
                      {report.binId && (
                        <span className="font-mono text-xs font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                          {report.binId}
                        </span>
                      )}
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          report.status === 'New Alert'
                            ? 'bg-error-container text-on-error-container'
                            : report.status === 'In Progress'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            report.status === 'New Alert'
                              ? 'bg-error animate-pulse'
                              : report.status === 'In Progress'
                              ? 'bg-amber-600'
                              : 'bg-emerald-600'
                          }`}
                        />
                        {report.status}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          report.priority === 'High Priority'
                            ? 'bg-error text-on-error'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {report.priority}
                      </span>
                    </div>

                    <span className="text-[11px] text-secondary mt-1 flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      Reported {report.reportedAt} • {report.reporter.type}
                    </span>
                  </div>

                  <button
                    onClick={() => viewBinOnMap(report.binId)}
                    title="View on Map"
                    className="w-8 h-8 rounded-xl bg-surface-container-low hover:bg-surface-container text-secondary flex items-center justify-center shrink-0 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">near_me</span>
                  </button>
                </div>

                {/* Incident Classification */}
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-on-surface">
                    {report.category}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed bg-surface-container-low p-2.5 rounded-xl border border-slate-100 font-medium italic">
                    “{report.description}”
                  </p>
                </div>

                {/* Photographic Evidence Showcase if available */}
                {report.imageUrl && (
                  <div className="relative rounded-xl overflow-hidden bg-surface-container h-44 sm:h-52 border border-slate-200">
                    <img
                      src={report.imageUrl}
                      alt="Incident Evidence"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-slate-900/85 backdrop-blur-md rounded-lg px-3 py-1.5 text-white flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="material-symbols-outlined text-[15px] text-emerald-400">
                          photo_camera
                        </span>
                        <span className="truncate font-mono text-[11px]">
                          Geo-verified Citizen Upload
                        </span>
                      </div>
                      <span className="font-mono text-[11px] shrink-0 text-slate-300">
                        AMC Inspection Photolog
                      </span>
                    </div>
                  </div>
                )}

                {/* Geo Snapshot & Assigned Crew */}
                <div className="bg-surface-container-low rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border border-slate-100 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-primary text-[20px] shrink-0">
                      pin_drop
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-on-surface truncate">{report.location}</p>
                      <p className="font-mono text-[11px] text-secondary truncate">
                        {report.coordinates} ({report.ward})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <span className="text-[11px] text-secondary font-medium">Crew:</span>
                    <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                      {report.assignedCrew || 'Standby'}
                    </span>
                  </div>
                </div>

                {/* Officer Operational Action Row */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap">
                  {report.status === 'New Alert' && (
                    <button
                      onClick={() => handleDispatch(report.id)}
                      type="button"
                      className="py-2 px-3.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                      <span>Dispatch Cleaning Crew</span>
                    </button>
                  )}

                  {report.status === 'In Progress' && (
                    <button
                      onClick={() => handleResolve(report.id)}
                      type="button"
                      className="py-2 px-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">task_alt</span>
                      <span>Mark Field Cleaned / Resolved</span>
                    </button>
                  )}

                  <button
                    onClick={() => viewBinOnMap(report.binId)}
                    type="button"
                    className="py-2 px-3 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">map</span>
                    <span>Locate on Ward Map</span>
                  </button>

                  {report.status === 'Resolved' && (
                    <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 py-1 px-2.5 bg-emerald-50 rounded-lg">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Incident Closed &amp; Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* IoT Sensor Hub Tab */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {bins.map((bin) => (
            <div
              key={bin.id}
              className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-sm font-bold text-on-surface">{bin.id}</span>
                    <p className="text-xs text-secondary truncate">{bin.name}</p>
                  </div>
                  <span
                    className={`text-base font-extrabold ${
                      bin.fill >= 90
                        ? 'text-error'
                        : bin.fill >= 75
                        ? 'text-amber-700'
                        : 'text-primary'
                    }`}
                  >
                    {bin.fill}%
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mb-3">
                  <div
                    className={`h-full ${
                      bin.fill >= 90
                        ? 'bg-error'
                        : bin.fill >= 75
                        ? 'bg-amber-500'
                        : 'bg-primary'
                    }`}
                    style={{ width: `${bin.fill}%` }}
                  />
                </div>

                <div className="text-[11px] text-secondary space-y-1 mb-3">
                  <div className="flex justify-between">
                    <span>Battery:</span>
                    <span className="font-semibold text-slate-800">{bin.batteryPercent}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Temperature:</span>
                    <span className="font-semibold text-slate-800">{bin.temperatureC}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="font-semibold text-slate-800">{bin.condition}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => viewBinOnMap(bin.id)}
                className="w-full py-1.5 px-3 bg-surface-container hover:bg-surface-container-high text-primary rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                <span>Inspect on Live Map</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

