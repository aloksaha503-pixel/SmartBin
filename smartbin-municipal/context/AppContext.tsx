'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SmartBin, INITIAL_BINS } from '@/data/bins';
import { ProblemReport, INITIAL_REPORTS } from '@/data/reports';

export interface User {
  id: string;
  name: string;
  role: string;
  ward: string;
  email: string;
  onDuty: boolean;
  avatarUrl?: string;
}

interface AppContextType {
  user: User | null;
  login: (id: string, pass: string) => boolean;
  logout: () => void;
  bins: SmartBin[];
  selectedBin: SmartBin | null;
  setSelectedBin: (bin: SmartBin | null) => void;
  reports: ProblemReport[];
  addReport: (newReport: Omit<ProblemReport, 'id' | 'timestamp' | 'reportedAt'>) => string;
  updateReportStatus: (reportId: string, status: ProblemReport['status'], crew?: string) => void;
  updateOfficerDuty: (onDuty: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [bins, setBins] = useState<SmartBin[]>(INITIAL_BINS);
  const [selectedBin, setSelectedBin] = useState<SmartBin | null>(INITIAL_BINS[2]); // default to AGT-003 as in Stitch design
  const [reports, setReports] = useState<ProblemReport[]>(INITIAL_REPORTS);
  const [searchQuery, setSearchQuery] = useState('');

  // Load persisted session if available
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('smartbin_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {}
  }, []);

  const login = (id: string, pass: string) => {
    const cleanId = id.trim().toUpperCase();
    if (cleanId === 'AMC-W06' || cleanId === 'OFFICER' || cleanId.includes('@AMC.GOV.IN')) {
      const officer: User = {
        id: 'AMC-W06',
        name: 'Officer Debbarma',
        role: 'Senior Ward Sanitation Officer',
        ward: 'AMC Zone-2 · Ward 06 Field Desk',
        email: 'debbarma@amc.gov.in',
        onDuty: true,
      };
      setUser(officer);
      localStorage.setItem('smartbin_user', JSON.stringify(officer));
      return true;
    }
    // Also accept generic login for test purposes
    if (pass.length >= 4) {
      const genericUser: User = {
        id: cleanId,
        name: 'Field Officer',
        role: 'AMC Field Personnel',
        ward: 'AMC Central Zone',
        email: `${cleanId.toLowerCase()}@amc.gov.in`,
        onDuty: true,
      };
      setUser(genericUser);
      localStorage.setItem('smartbin_user', JSON.stringify(genericUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smartbin_user');
  };

  const addReport = (newReportData: Omit<ProblemReport, 'id' | 'timestamp' | 'reportedAt'>) => {
    const reportNum = 105 + reports.length;
    const reportId = `#PUB-${reportNum}`;
    const report: ProblemReport = {
      ...newReportData,
      id: reportId,
      timestamp: Date.now(),
      reportedAt: 'Just now',
    };

    setReports((prev) => [report, ...prev]);

    // If report was for an existing bin, update its condition/status
    if (report.binId) {
      setBins((prev) =>
        prev.map((b) => {
          if (b.id === report.binId) {
            return {
              ...b,
              status: report.priority === 'High Priority' ? 'Critical Overflow Alert' : 'Action Required',
              condition: report.category.includes('Lid')
                ? 'Lid Hinge Defect'
                : report.category.includes('Overflow')
                ? 'Spillage Detected'
                : 'Citizen Hazard Flagged',
            };
          }
          return b;
        })
      );
    }

    return reportId;
  };

  const updateReportStatus = (reportId: string, status: ProblemReport['status'], crew?: string) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          return {
            ...r,
            status,
            assignedCrew: crew || r.assignedCrew || 'Municipal Response Crew',
          };
        }
        return r;
      })
    );
  };

  const updateOfficerDuty = (onDuty: boolean) => {
    if (!user) return;
    const updated = { ...user, onDuty };
    setUser(updated);
    localStorage.setItem('smartbin_user', JSON.stringify(updated));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        bins,
        selectedBin,
        setSelectedBin,
        reports,
        addReport,
        updateReportStatus,
        updateOfficerDuty,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

