export interface SmartBin {
  id: string;
  name: string;
  location: string;
  sector: string;
  ward: string;
  fill: number;
  status: 'Optimal' | 'Moderate' | 'Action Required' | 'Critical Overflow Alert' | 'Hardware Damaged' | 'Sensor Offline';
  condition: string;
  type: string;
  lastSynced: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapPos: {
    top: number; // percentage
    left: number; // percentage
  };
  batteryPercent: number;
  temperatureC: number;
}

export const INITIAL_BINS: SmartBin[] = [
  {
    id: 'AGT-001',
    name: 'Ujjayanta West Gate',
    location: 'Palace Circular Rd, Heritage Zone',
    sector: 'North Sector',
    ward: 'AMC Ward 04',
    fill: 62,
    status: 'Moderate',
    condition: 'Normal Condition',
    type: 'Dual Civic Recycler',
    lastSynced: '11m ago',
    coordinates: { lat: 23.8354, lng: 91.2825 },
    mapPos: { top: 24, left: 68 },
    batteryPercent: 88,
    temperatureC: 27,
  },
  {
    id: 'AGT-002',
    name: 'Radhanagar Bus Terminal',
    location: 'Near Passenger Concourse B',
    sector: 'Central Transit Sector',
    ward: 'AMC Ward 02',
    fill: 35,
    status: 'Optimal',
    condition: 'Normal Condition',
    type: 'Solar Compactor Unit',
    lastSynced: '42m ago',
    coordinates: { lat: 23.8412, lng: 91.2789 },
    mapPos: { top: 32, left: 28 },
    batteryPercent: 94,
    temperatureC: 26,
  },
  {
    id: 'AGT-003',
    name: 'Old Motor Stand',
    location: 'Banamalipur Main Arterial, Agartala',
    sector: 'Central Commercial Hub',
    ward: 'AMC Ward 06',
    fill: 81,
    status: 'Action Required',
    condition: 'Normal Condition',
    type: 'Solar Compactor',
    lastSynced: '4m ago',
    coordinates: { lat: 23.8329, lng: 91.2867 },
    mapPos: { top: 52, left: 50 },
    batteryPercent: 78,
    temperatureC: 29,
  },
  {
    id: 'AGT-004',
    name: 'Battala Wholesale Fish Yard',
    location: 'Southern Perimeter Gate 3, Battala',
    sector: 'High Density Market Zone',
    ward: 'AMC Ward 07',
    fill: 94,
    status: 'Critical Overflow Alert',
    condition: 'Spillage Detected',
    type: 'Heavy Duty Compactor',
    lastSynced: 'Just now',
    coordinates: { lat: 23.8245, lng: 91.2741 },
    mapPos: { top: 72, left: 24 },
    batteryPercent: 82,
    temperatureC: 31,
  },
  {
    id: 'AGT-005',
    name: 'City Centre Plaza East',
    location: 'Pedestrian Promenade, Paradise Chowmuhani',
    sector: 'Retail Corridor',
    ward: 'AMC Ward 06',
    fill: 48,
    status: 'Hardware Damaged',
    condition: 'Lid Hinge Defect',
    type: 'Sensor-Assisted SmartBin',
    lastSynced: '18m ago',
    coordinates: { lat: 23.8341, lng: 91.2892 },
    mapPos: { top: 64, left: 78 },
    batteryPercent: 65,
    temperatureC: 28,
  },
  {
    id: 'AGT-006',
    name: 'Akhaura Checkpost Link',
    location: 'International Border Corridor',
    sector: 'Border Sub-Zone',
    ward: 'AMC Ward 01',
    fill: 15,
    status: 'Sensor Offline',
    condition: 'Hardware Unreachable',
    type: 'IoT Telemetry Dustbin',
    lastSynced: '3d ago',
    coordinates: { lat: 23.8502, lng: 91.2654 },
    mapPos: { top: 16, left: 45 },
    batteryPercent: 12,
    temperatureC: 25,
  },
  {
    id: 'AGT-007',
    name: 'Melarmath Vegetable Market',
    location: 'Near Agartala Canal Crossing',
    sector: 'Market Zone 06',
    ward: 'AMC Ward 06',
    fill: 89,
    status: 'Action Required',
    condition: 'High Moisture Detected',
    type: 'Wet Waste Compactor',
    lastSynced: '8m ago',
    coordinates: { lat: 23.8322, lng: 91.2798 },
    mapPos: { top: 58, left: 36 },
    batteryPercent: 71,
    temperatureC: 30,
  },
];

