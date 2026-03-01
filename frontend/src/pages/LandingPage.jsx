import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  BellAlertIcon,
  MapIcon,
  ChartBarIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline';
import { fadeInUp } from '../utils/motion.js';
import { MapPreview } from '../components/landing/MapPreview.jsx';

const Section = ({ id, children, delay = 0 }) => (
  <motion.section
    id={id}
    className="page-section"
    variants={fadeInUp(delay)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className="mx-auto max-w-7xl">{children}</div>
  </motion.section>
);

export const LandingPage = () => {
  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#F1F5F9' }}>
      {/* Hexagon pattern */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(30deg, transparent 48%, rgba(10, 31, 68, 0.02) 49%, rgba(10, 31, 68, 0.02) 51%, transparent 52%),
            linear-gradient(90deg, transparent 48%, rgba(10, 31, 68, 0.02) 49%, rgba(10, 31, 68, 0.02) 51%, transparent 52%),
            linear-gradient(150deg, transparent 48%, rgba(10, 31, 68, 0.02) 49%, rgba(10, 31, 68, 0.02) 51%, transparent 52%)
          `,
          backgroundSize: '100px 58px',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      {/* Dots overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle, rgba(10, 31, 68, 0.04) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
      
      {/* Hero */}
      <Section id="hero">
        <div className="h-1 w-full bg-gradient-to-r from-[#D32F2F] via-[#FBC02D] to-[#2E7D32] mb-6" />
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-emergency/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emergency">
              Live emergency coordination platform
            </span>
            <h1 className="mt-4 text-3xl font-semibold text-primary md:text-4xl">
              RakshaNet – Smart Disaster Response Platform
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-[15px]">
              A unified command system connecting citizens, rescue teams, authorities, NGOs and
              administrators for real-time incident reporting, resource allocation and AI-powered
              risk assessment.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/login"
                className="inline-flex items-center justify-center rounded-lg bg-[#0A1F44] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#112E67] hover:shadow-lg"
              >
                Report Emergency
              </a>
              <a
                href="#portals"
                className="inline-flex items-center justify-center rounded-lg border-2 border-[#0A1F44] bg-white px-5 py-2.5 text-sm font-medium text-[#0A1F44] shadow-md transition-all hover:bg-[#0A1F44] hover:text-white hover:shadow-lg"
              >
                View Portals Overview
              </a>
            </div>
            <dl className="mt-6 grid grid-cols-3 gap-3 text-xs text-slate-600 md:gap-4">
              <div className="card px-3 py-2">
                <dt className="text-[11px] uppercase tracking-wide text-slate-500">Response time</dt>
                <dd className="mt-1 text-sm font-semibold text-primary">Under 5 min</dd>
              </div>
              <div className="card px-3 py-2">
                <dt className="text-[11px] uppercase tracking-wide text-slate-500">
                  Multi-agency coverage
                </dt>
                <dd className="mt-1 text-sm font-semibold text-primary">5+ Portals</dd>
              </div>
              <div className="card px-3 py-2">
                <dt className="text-[11px] uppercase tracking-wide text-slate-500">AI assistance</dt>
                <dd className="mt-1 text-sm font-semibold text-primary">Risk & damage</dd>
              </div>
            </dl>
          </div>
          <div className="card h-full bg-gradient-to-r from-[#0A1F44] to-[#112E67] px-6 py-6 text-white shadow-lg">
            <p className="text-xs font-medium uppercase tracking-wide text-warning">
              Live incident snapshot
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-white/5 p-3">
                <p className="text-[11px] text-slate-200">Active incidents</p>
                <p className="mt-1 text-2xl font-semibold">18</p>
                <p className="mt-1 text-[11px] text-slate-300">Across 6 districts</p>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <p className="text-[11px] text-slate-200">Rescue teams deployed</p>
                <p className="mt-1 text-2xl font-semibold text-warning">32</p>
                <p className="mt-1 text-[11px] text-slate-300">Fire, SDRF, NGO</p>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <p className="text-[11px] text-slate-200">Shelter capacity</p>
                <p className="mt-1 text-2xl font-semibold text-success">7.2k</p>
                <p className="mt-1 text-[11px] text-slate-300">Available beds</p>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <p className="text-[11px] text-slate-200">Broadcast alerts</p>
                <p className="mt-1 text-2xl font-semibold">5</p>
                <p className="mt-1 text-[11px] text-slate-300">Last 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section id="features" delay={0.05}>
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-primary">Why RakshaNet</h2>
            <p className="mt-1 text-xs text-slate-600">
              A single, secure platform connecting citizens, responders, authorities, NGOs and
              administrators.
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: ShieldCheckIcon,
              title: 'Citizen-centric SOS',
              body: 'One-tap SOS with precise location, media uploads and automatic routing to the nearest control room.',
            },
            {
              icon: MapIcon,
              title: 'Operational live map',
              body: 'Leaflet-based situational map with markers, clusters and severity heatmaps across incident types.',
            },
            {
              icon: BellAlertIcon,
              title: 'Targeted public alerts',
              body: 'Authority portal to broadcast geo-targeted alerts, evacuation instructions and safe-route advisories.',
            },
            {
              icon: ChartBarIcon,
              title: 'Command analytics',
              body: 'Authority dashboard with incident trends, response SLAs, resource utilization and AI risk scores.',
            },
            {
              icon: UserGroupIcon,
              title: 'NGO & shelter network',
              body: 'NGO portal to manage shelters, accept help requests and coordinate with official control rooms.',
            },
            {
              icon: BuildingOffice2Icon,
              title: 'Enterprise-grade governance',
              body: 'Admin controls for user lifecycle, roles, system logs and incident quality checks.',
            },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="card flex h-full flex-col gap-3 px-4 py-4">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/5 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-primary">{title}</h3>
              <p className="text-xs leading-relaxed text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section id="how-it-works" delay={0.1}>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primary">How RakshaNet operates</h2>
          <p className="mt-1 text-xs text-slate-600">
            Streamlined, three-step flow from citizen report to coordinated response and closure.
          </p>
        </div>
        <div className="card grid gap-4 px-4 py-5 md:grid-cols-3">
          {[
            {
              step: '01',
              title: 'Report & triage',
              body: 'Citizens raise SOS with location, images and description. Authority desk validates and prioritizes.',
            },
            {
              step: '02',
              title: 'Dispatch & coordinate',
              body: 'Rescue teams receive assignments on their portal with maps, contacts and live status updates.',
            },
            {
              step: '03',
              title: 'Monitor & close',
              body: 'Authority and NGOs track progress, manage shelters, broadcast alerts and close incidents with audit trail.',
            },
          ].map((item, idx) => (
            <div
              key={item.step}
              className="flex flex-col border-slate-100 md:border-l md:first:border-l-0 md:pl-4"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Step {item.step}
              </span>
              <h3 className="mt-1 text-sm font-semibold text-primary">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Live statistics */}
      <Section id="stats" delay={0.15}>
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-primary">Live preparedness snapshot</h2>
            <p className="mt-1 text-xs text-slate-600">
              Real-time metrics built for district control rooms and state disaster management
              authorities.
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="card px-4 py-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500">Open incidents</p>
            <p className="mt-1 text-2xl font-semibold text-emergency">18</p>
            <p className="mt-1 text-xs text-slate-600">Across floods, fire, cyclone, landslide.</p>
          </div>
          <div className="card px-4 py-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500">
              Average acknowledgment
            </p>
            <p className="mt-1 text-2xl font-semibold text-success">3.2 min</p>
            <p className="mt-1 text-xs text-slate-600">From SOS to control room confirmation.</p>
          </div>
          <div className="card px-4 py-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500">
              Shelters with live capacity
            </p>
            <p className="mt-1 text-2xl font-semibold text-primary">41</p>
            <p className="mt-1 text-xs text-slate-600">Updated by field and NGO teams.</p>
          </div>
          <div className="card px-4 py-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500">AI risk evaluated</p>
            <p className="mt-1 text-2xl font-semibold text-primary">64%</p>
            <p className="mt-1 text-xs text-slate-600">Of new high-impact incidents.</p>
          </div>
        </div>
      </Section>

      {/* Map preview */}
      <Section id="map" delay={0.2}>
        <div className="grid gap-6 lg:grid-cols-[1.2fr,1fr] lg:items-center">
          <div>
            <h2 className="text-xl font-semibold text-primary">Live incident map preview</h2>
            <p className="mt-2 text-xs text-slate-600">
              Leaflet-powered operational map with marker clustering and severity-based heatmap.
              District officers can filter by incident type, severity and time window to coordinate
              responses.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-600">
              <li>
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-success" />
                Green – low severity incidents and minor disruptions
              </li>
              <li>
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-warning" />
                Yellow – medium severity with localized impact
              </li>
              <li>
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emergency" />
                Red – critical, high-priority incidents requiring immediate attention
              </li>
            </ul>
          </div>
          <MapPreview />
        </div>
      </Section>

      {/* Portals overview + CTA */}
      <Section id="portals" delay={0.25}>
        <div className="card px-5 py-6">
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-primary">Five dedicated portals</h2>
              <p className="mt-1 text-xs text-slate-600">
                Role-based dashboards with secure access, tailored workflows and operational views.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {[
              {
                name: 'Citizen',
                highlight: 'SOS, My reports, nearby shelters',
              },
              {
                name: 'Rescue Team',
                highlight: 'Assigned incidents, navigation, victim contact',
              },
              {
                name: 'Authority',
                highlight: 'Analytics, heatmaps, alerts, AI risk',
              },
              {
                name: 'NGO',
                highlight: 'Help requests, shelter management',
              },
              {
                name: 'Super Admin',
                highlight: 'User roles, logs, moderation',
              },
            ].map((portal) => (
              <div key={portal.name} className="rounded-lg border border-slate-100 bg-slate-50/70 p-3">
                <p className="text-xs font-semibold text-primary">{portal.name} portal</p>
                <p className="mt-1 text-[11px] text-slate-600">{portal.highlight}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-2 border-t border-slate-100 pt-4 text-xs text-slate-600 md:flex-row md:items-center md:justify-between">
            <p>
              Ready to explore? Use the login options above to experience each portal based on your
              assigned role.
            </p>
            <a
              href="/login"
              className="inline-flex items-center justify-center rounded-lg bg-[#0A1F44] px-4 py-2 text-xs font-semibold text-white shadow-md transition-all hover:bg-[#112E67] hover:shadow-lg"
            >
              Access secure portal
            </a>
          </div>
        </div>
      </Section>
    </div>
    </div>
  );
};

