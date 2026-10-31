export interface ProblemReport {
  id: string;
  binId?: string;
  category: 'Illegal Commercial Dumping & Drain Blockage' | 'Overflowing Waste' | 'Damaged Lid / Jammed Mechanism' | 'Foul Odor / Pest Infestation' | 'Hazardous Littering';
  description: string;
  location: string;
  coordinates: string;
  ward: string;
  priority: 'High Priority' | 'Urgent' | 'Medium' | 'Routine';
  status: 'New Alert' | 'In Progress' | 'Resolved';
  reportedAt: string;
  timestamp: number;
  imageUrl?: string;
  reporter: {
    type: 'Citizen Verified' | 'Field Inspector' | 'IoT Trigger';
    name?: string;
    phone?: string;
  };
  assignedCrew?: string;
}

export const INITIAL_REPORTS: ProblemReport[] = [
  {
    id: '#PUB-104',
    binId: 'AGT-007',
    category: 'Illegal Commercial Dumping & Drain Blockage',
    description: 'Piles of wet waste and rotten produce discarded along market perimeter blocking the storm drain. Strong foul odor impacting pedestrians.',
    location: 'Melarmath Vegetable Market Rd, Agartala Canal',
    coordinates: '23.8322° N, 91.2798° E',
    ward: 'AMC Ward 06',
    priority: 'High Priority',
    status: 'New Alert',
    reportedAt: '25 min ago',
    timestamp: Date.now() - 25 * 60 * 1000,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu7_q6UylBz1yHMReExzSxI7H9MZ2te9soVrFWgKusnaCMdS6b9BBs5MXQSWPkzyex9rbMMjo14Z3ZmZ-pWZXdXzBhAK4Lm2Fh27zZPmGabhqnLSvhZcnwrXtc2HOT-Enc32s2y39MbmEDtM_V1Yrrzgmk7mhDX58CMwFpNFNuRl92lJbE3DTpbmZPqVj1jaywXfEU6QkcQkGs4evlT-1XZQmiN__fVqYTG14l0DI',
    reporter: {
      type: 'Citizen Verified',
      name: 'R. Choudhury',
      phone: '+91 98621 *****',
    },
    assignedCrew: 'Standby - Unassigned',
  },
  {
    id: '#PUB-103',
    binId: 'AGT-004',
    category: 'Overflowing Waste',
    description: 'SmartBin reached 94% capacity. Fish yard market vendors stacked plastic crates around the aperture preventing closing.',
    location: 'Battala Wholesale Fish Yard, Gate 3',
    coordinates: '23.8245° N, 91.2741° E',
    ward: 'AMC Ward 07',
    priority: 'High Priority',
    status: 'In Progress',
    reportedAt: '1.2h ago',
    timestamp: Date.now() - 72 * 60 * 1000,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd-S88DOJaeYUKjrUFa6SWB0tHa0fcno4rq5BxinRPAhN0r0k3WFcmGJBWAbtkYfsfRgejJuBLbhCrHNZ98p_lANfHHHoptwpUyss23ZkQKTkd_h30rhQAcACEdkQJ_8sk_aYALoroRmP3V2iB8IBC3DkkfozS1K4PSEX4luUvRMjFPFyBhR_mxA2dO3WwU88yAYEsp4eDpd-sAfI8vH7lPwRVpgk9tmczYnGtAWoDsDs8XnP413Zm',
    reporter: {
      type: 'IoT Trigger',
      name: 'Automated Telemetry Sensor',
    },
    assignedCrew: 'Rapid Response Truck AMC-08',
  },
  {
    id: '#PUB-102',
    binId: 'AGT-005',
    category: 'Damaged Lid / Jammed Mechanism',
    description: 'Hydraulic solar compactor door damaged due to forced insertion of heavy packaging material. Sensor optical line blocked.',
    location: 'City Centre Plaza East Promenade',
    coordinates: '23.8341° N, 91.2892° E',
    ward: 'AMC Ward 06',
    priority: 'Medium',
    status: 'In Progress',
    reportedAt: '2.5h ago',
    timestamp: Date.now() - 150 * 60 * 1000,
    reporter: {
      type: 'Field Inspector',
      name: 'Ward Officer Debbarma',
    },
    assignedCrew: 'Hardware Maintenance Team B',
  },
  {
    id: '#PUB-101',
    binId: 'AGT-002',
    category: 'Overflowing Waste',
    description: 'Post-commute surge litter cleaned and compacted. Sensor re-calibrated.',
    location: 'Radhanagar Bus Terminal Concourse',
    coordinates: '23.8412° N, 91.2789° E',
    ward: 'AMC Ward 02',
    priority: 'Routine',
    status: 'Resolved',
    reportedAt: '4.8h ago',
    timestamp: Date.now() - 288 * 60 * 1000,
    reporter: {
      type: 'Citizen Verified',
    },
    assignedCrew: 'Cleanliness Team AMC-02',
  },
];

