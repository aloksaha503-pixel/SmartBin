'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ProblemReport } from '@/data/reports';

function ReportIssueForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const binParam = searchParams.get('bin');

  const { bins, selectedBin, setSelectedBin, addReport } = useApp();

  const [targetBinId, setTargetBinId] = useState(binParam || selectedBin?.id || 'AGT-003');
  const [category, setCategory] = useState<ProblemReport['category']>('Overflowing Waste');
  const [urgency, setUrgency] = useState<ProblemReport['priority']>('High Priority');
  const [description, setDescription] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCu7_q6UylBz1yHMReExzSxI7H9MZ2te9soVrFWgKusnaCMdS6b9BBs5MXQSWPkzyex9rbMMjo14Z3ZmZ-pWZXdXzBhAK4Lm2Fh27zZPmGabhqnLSvhZcnwrXtc2HOT-Enc32s2y39MbmEDtM_V1Yrrzgmk7mhDX58CMwFpNFNuRl92lJbE3DTpbmZPqVj1jaywXfEU6QkcQkGs4evlT-1XZQmiN__fVqYTG14l0DI'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  useEffect(() => {
    if (binParam) {
      setTargetBinId(binParam);
      const matched = bins.find((b) => b.id === binParam);
      if (matched) setSelectedBin(matched);
    }
  }, [binParam, bins, setSelectedBin]);

  const activeBin = bins.find((b) => b.id === targetBinId) || bins[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const ticketId = addReport({
        binId: targetBinId,
        category,
        description:
          description ||
          `Reported ${category} at ${activeBin.name}. Immediate inspection and clearance requested.`,
        location: `${activeBin.name}, ${activeBin.location}`,
        coordinates: `${activeBin.coordinates.lat}° N, ${activeBin.coordinates.lng}° E`,
        ward: activeBin.ward,
        priority: urgency,
        status: 'New Alert',
        imageUrl: photoPreview || undefined,
        reporter: {
          type: 'Citizen Verified',
          name: reporterName || 'Concerned Citizen',
          phone: reporterPhone || undefined,
        },
      });

      setIsSubmitting(false);
      setSubmittedTicket(ticketId);
    }, 700);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Municipal Entity Sub-Bar */}
      <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-surface-container-low border border-surface-container">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[18px]">account_balance</span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
            Agartala Municipal Corporation (AMC)
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-primary text-[11px] font-semibold">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>Quick Response Live</span>
        </div>
      </div>

      {/* Bin Identification Card */}
      <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-2xl shadow-sm border border-surface-container relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[26px]">delete</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base font-bold text-on-surface tracking-tight">
                  {activeBin.id}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold">
                  {activeBin.type}
                </span>
              </div>
              <p className="text-xs text-secondary truncate mt-0.5">{activeBin.location}</p>
              <div className="flex items-center gap-2 mt-1 text-xs">
                <span className="inline-flex items-center gap-1 font-semibold text-primary">
                  <span className="material-symbols-outlined text-[15px]">sensors</span>
                  {activeBin.fill}% Fill • Synced
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-secondary font-medium">{activeBin.ward}</span>
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <select
              value={targetBinId}
              onChange={(e) => setTargetBinId(e.target.value)}
              className="text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer"
            >
              {bins.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.id} ({b.name})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Report Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl shadow-sm border border-surface-container flex flex-col gap-4"
      >
        <h2 className="text-sm font-bold text-on-surface border-b border-slate-100 pb-2">
          File Sanitation Incident Report
        </h2>

        {/* Issue Category */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="issueCategory" className="text-xs font-bold text-on-surface flex items-center gap-1">
            Issue Category <span className="text-error">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
              <span className="material-symbols-outlined text-[20px]">report_problem</span>
            </div>
            <select
              id="issueCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              required
              className="w-full h-11 pl-10 pr-9 rounded-xl bg-surface-container-low text-on-surface text-xs sm:text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors cursor-pointer font-medium"
            >
              <option value="Overflowing Waste">Overflowing Waste (Spilling onto sidewalk/street)</option>
              <option value="Damaged Lid / Jammed Mechanism">Damaged Lid / Jammed Compactor Mechanism</option>
              <option value="Illegal Commercial Dumping & Drain Blockage">Illegal Commercial Dumping &amp; Drain Blockage</option>
              <option value="Foul Odor / Pest Infestation">Foul Odor / Pest Infestation</option>
              <option value="Hazardous Littering">Hazardous / Glass Littering</option>
            </select>
          </div>
        </div>

        {/* Urgency Level */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-on-surface">Urgency Level</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'High Priority', label: 'High Priority / Overflow', icon: 'priority_high' },
              { id: 'Routine', label: 'Routine Inspection', icon: 'schedule' },
            ].map((u) => (
              <label
                key={u.id}
                className={`relative flex items-center gap-2 p-2.5 rounded-xl cursor-pointer border transition-all ${
                  urgency === u.id
                    ? 'ring-2 ring-primary border-primary bg-primary/5 text-primary font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                }`}
              >
                <input
                  type="radio"
                  name="urgency"
                  value={u.id}
                  checked={urgency === u.id}
                  onChange={() => setUrgency(u.id as any)}
                  className="sr-only"
                />
                <span className="material-symbols-outlined text-[18px]">{u.icon}</span>
                <span className="text-xs">{u.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Photo Evidence Preview */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-on-surface flex items-center justify-between">
            <span>Photographic Evidence</span>
            <span className="text-[10px] text-secondary font-normal">Geo-tagged to Ward 06</span>
          </label>
          <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-surface-container">
            {photoPreview ? (
              <div className="relative h-44 w-full">
                <img
                  src={photoPreview}
                  alt="Incident Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-md rounded-lg px-2.5 py-1 text-white flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1 font-mono">
                    <span className="material-symbols-outlined text-[14px] text-emerald-400">
                      photo_camera
                    </span>
                    GPS: {activeBin.coordinates.lat}° N, {activeBin.coordinates.lng}° E
                  </span>
                  <button
                    type="button"
                    onClick={() => setPhotoPreview(null)}
                    className="text-red-300 hover:text-white font-semibold underline text-[10px]"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() =>
                  setPhotoPreview(
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuCu7_q6UylBz1yHMReExzSxI7H9MZ2te9soVrFWgKusnaCMdS6b9BBs5MXQSWPkzyex9rbMMjo14Z3ZmZ-pWZXdXzBhAK4Lm2Fh27zZPmGabhqnLSvhZcnwrXtc2HOT-Enc32s2y39MbmEDtM_V1Yrrzgmk7mhDX58CMwFpNFNuRl92lJbE3DTpbmZPqVj1jaywXfEU6QkcQkGs4evlT-1XZQmiN__fVqYTG14l0DI'
                  )
                }
                className="h-32 flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 text-secondary"
              >
                <span className="material-symbols-outlined text-[32px] text-primary">add_a_photo</span>
                <span className="text-xs font-semibold mt-1">Click to attach photo evidence</span>
                <span className="text-[10px] text-slate-400">Supports JPG, PNG up to 10MB</span>
              </div>
            )}
          </div>
        </div>

        {/* Observations Description */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="description" className="text-xs font-bold text-on-surface">
            Incident Description &amp; Landmarks
          </label>
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue, spillage extent, or nearby landmarks (e.g. near vegetable market gate)..."
            className="w-full p-3 rounded-xl bg-surface-container-low text-on-surface text-xs sm:text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
          />
        </div>

        {/* Reporter Optional Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          <div>
            <label htmlFor="repName" className="block text-[11px] font-semibold text-slate-700 mb-1">
              Your Name (Optional)
            </label>
            <input
              type="text"
              id="repName"
              value={reporterName}
              onChange={(e) => setReporterName(e.target.value)}
              placeholder="e.g. S. Deb / Citizen"
              className="w-full px-3 py-2 text-xs bg-surface-container-low border border-slate-200 rounded-xl text-on-surface font-medium"
            />
          </div>
          <div>
            <label htmlFor="repPhone" className="block text-[11px] font-semibold text-slate-700 mb-1">
              Mobile Number (For status SMS)
            </label>
            <input
              type="tel"
              id="repPhone"
              value={reporterPhone}
              onChange={(e) => setReporterPhone(e.target.value)}
              placeholder="+91 98621 XXXXX"
              className="w-full px-3 py-2 text-xs bg-surface-container-low border border-slate-200 rounded-xl text-on-surface font-medium"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-primary hover:bg-primary-container active:scale-[0.99] text-on-primary text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Transmitting to AMC Sanitation Desk...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>Submit Report to Agartala Municipal Corp</span>
            </>
          )}
        </button>
      </form>

      {/* Confirmation Modal */}
      {submittedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/50 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-surface-container-lowest rounded-2xl shadow-2xl p-6 flex flex-col items-center text-center border border-surface-container animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-primary-fixed text-on-primary-fixed-variant flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>

            <h3 className="text-lg font-bold text-on-surface mb-1">Report Dispatched!</h3>
            <p className="text-xs text-secondary mb-4 leading-relaxed">
              Your civic report has been officially logged with Agartala Municipal Corporation Ward Desk.
            </p>

            <div className="w-full bg-surface-container-low p-3 rounded-xl border border-surface-container mb-5 text-left">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-secondary">Incident Ticket:</span>
                <span className="font-mono font-bold text-primary">{submittedTicket}</span>
              </div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-secondary">Assigned Unit:</span>
                <span className="font-medium text-on-surface">AMC Ward 06 Field Desk</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-secondary">Est. Response:</span>
                <span className="font-semibold text-emerald-700">&lt; 45 Minutes</span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
              <button
                type="button"
                onClick={() => router.push('/map')}
                className="w-full bg-primary text-on-primary py-2.5 px-4 rounded-xl text-xs font-bold hover:bg-primary-container transition-colors shadow-sm"
              >
                Return to Bins Map
              </button>
              <button
                type="button"
                onClick={() => router.push('/officer')}
                className="w-full bg-slate-900 text-white py-2 px-4 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                View in Officer Field Desk
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ReportIssuePage() {
  return (
    <div className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 pt-20 pb-10">
      <Suspense
        fallback={
          <div className="p-8 text-center text-xs font-semibold text-secondary">
            Loading Sanitation Desk form...
          </div>
        }
      >
        <ReportIssueForm />
      </Suspense>
    </div>
  );
}
