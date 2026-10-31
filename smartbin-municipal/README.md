# SmartBin — Agartala Municipal Corporation (AMC)

**Urban Sanitation Telemetry System & Civic Waste Management**  
Generated and transformed from Google Stitch Project `4731441235562008557` into a production-ready Next.js application.

---

## 🌟 Overview & Key Features

* **Civic Design System**: Built with Tailwind CSS, Public Sans typography, and Material Symbols matching the Agartala Municipal Corporation (Tripura) Civic Utility theme.
* **Dual Persona Architecture**:
  * **Public Citizen / Guest Mode**: Interactive live telemetry map with IoT fill readings, GPS location, route directions, and instant civic problem reporting.
  * **Municipal Board & Ward Officer Desk**: Secure gateway login, real-time ticket triage, incident photo logs, cleaning crew dispatching, and duty shift management.
* **Real-time Incident & Telemetry State**: Problem reports submitted by citizens instantly appear in the officer's field desk, updating bin fill levels and unit conditions dynamically.

---

## 🗺️ Application Routes

| Route | View | Description |
| :--- | :--- | :--- |
| `/` | **Role Selection** | Welcome portal with persona choice (Municipal Board vs. Citizen Guest). |
| `/login` | **Municipal Staff Login** | Official staff authentication portal. *(Demo: `AMC-W06` / `amc123`)*. |
| `/map` | **Citizen Bins Map** | Interactive vector map of Agartala Central Sector (Ward 04 & 06) with IoT fill indicators, GPS positioning, search, and detail card. |
| `/report` | **File Problem Report** | Citizen hazard reporting with geo-tagged photo evidence, category selection, and tracking ticket confirmation (`#PUB-105+`). |
| `/officer` | **Officer Field Desk** | Comprehensive incident management dashboard with active triage, cleaning crew dispatching, and IoT telemetry metrics. |
| `/officer/settings` | **Duty & Shift Settings** | Officer duty toggle (On Duty / Off Duty), assigned ward specifications, and alert preferences. |

---

## 🚀 Getting Started

To launch the development server:

```bash
npm run dev
```

Then navigate to [http://localhost:3000](http://localhost:3000) in your browser.

To run the optimized production build:

```bash
npm run build
npm run start
```

