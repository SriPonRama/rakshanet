import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { DashboardLayout } from '../../components/dashboards/DashboardLayout.jsx';
import { incidentService } from '../../services/incidentService.js';
import { resourceService } from '../../services/resourceService.js';
import { alertService } from '../../services/alertService.js';
import { aiService } from '../../services/aiService.js';

const severityValue = (sev) => {
  switch (sev) {
    case 'low': return 0.3;
    case 'medium': return 0.6;
    case 'high':
    case 'critical': return 0.9;
    default: return 0.4;
  }
};

export const AuthorityDashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [resources, setResources] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('high');
  const [broadcasting, setBroadcasting] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [newSeverity, setNewSeverity] = useState('medium');

  useEffect(() => {
    const fetchData = () => {
      incidentService.list().then(setIncidents).catch(() => {});
      resourceService.list().then(setResources).catch(() => {});
      alertService.list().then(setAlerts).catch(() => {});
    };
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const unassigned = useMemo(
    () => incidents.filter((i) => !i.assignedTo && i.status === 'reported'),
    [incidents],
  );

  const summary = useMemo(() => {
    const open = incidents.filter((i) => i.status !== 'closed' && i.status !== 'resolved');
    const critical = open.filter((i) => i.severity === 'critical' || i.severity === 'high');
    const shelters = resources.filter((r) => r.type?.toLowerCase().includes('shelter'));
    return {
      totalOpen: open.length,
      criticalOpen: critical.length,
      unassigned: unassigned.length,
      shelters: shelters.length,
      alerts: alerts.length,
    };
  }, [incidents, resources, alerts, unassigned]);

  const heatmapPoints = useMemo(
    () =>
      incidents
        .filter((i) => i.location?.coordinates?.length === 2)
        .map((i) => [i.location.coordinates[1], i.location.coordinates[0], severityValue(i.severity)]),
    [incidents],
  );

  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map || heatmapPoints.length === 0) return;
    const heat = L.heatLayer(heatmapPoints, {
      radius: 35,
      blur: 25,
      maxZoom: 10,
      gradient: { 0.3: '#2E7D32', 0.6: '#FBC02D', 0.9: '#D32F2F' },
    }).addTo(map);
    return () => map.removeLayer(heat);
  }, [map, heatmapPoints]);

  const assignIncident = async (id) => {
    try {
      // Assign to any rescue user (in production, you'd select specific rescue team)
      await incidentService.updateStatus(id, { 
        status: 'assigned', 
        severity: newSeverity,
        assignedTo: 'rescue-team-id' // This will be set by backend to first rescue user
      });
      const fresh = await incidentService.list();
      setIncidents(fresh);
      setSelectedIncident(null);
    } catch {}
  };

  const sendAlert = async (e) => {
    e.preventDefault();
    setBroadcasting(true);
    try {
      await alertService.create({
        message: alertMsg,
        severity: alertSeverity,
        targetArea: { type: 'Point', coordinates: [80.27, 13.08] },
      });
      setAlertMsg('');
      const fresh = await alertService.list();
      setAlerts(fresh);
    } finally {
      setBroadcasting(false);
    }
  };

  return (
    <DashboardLayout
      title="Authority Portal"
      subtitle="Command centre for incident management, assignment and coordination."
    >
      <div className="grid gap-5 lg:grid-cols-4">
        <div className="rounded-lg bg-slate-50 px-3 py-2">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">Open incidents</p>
          <p className="mt-1 text-xl font-semibold text-emergency">{summary.totalOpen}</p>
        </div>
        <div className="rounded-lg bg-slate-50 px-3 py-2">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">Unassigned</p>
          <p className="mt-1 text-xl font-semibold text-warning">{summary.unassigned}</p>
        </div>
        <div className="rounded-lg bg-slate-50 px-3 py-2">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">Critical / high</p>
          <p className="mt-1 text-xl font-semibold text-emergency">{summary.criticalOpen}</p>
        </div>
        <div className="rounded-lg bg-slate-50 px-3 py-2">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">Shelters</p>
          <p className="mt-1 text-xl font-semibold text-success">{summary.shelters}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="card px-4 py-4">
          <h2 className="text-sm font-semibold text-primary">Unassigned Incidents - Assign to Rescue</h2>
          <div className="mt-2 max-h-80 space-y-2 overflow-y-auto text-xs">
            {unassigned.map((i) => (
              <div key={i._id} className="rounded-md border border-slate-200 bg-white px-3 py-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-primary">{i.title}</p>
                    <p className="mt-1 text-[11px] text-slate-600">{i.description}</p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      {i.location?.address || 'Location available'}
                    </p>
                  </div>
                  <span className="ml-2 rounded-full bg-yellow-100 px-2 py-1 text-[10px] font-medium text-yellow-700">
                    {i.severity.toUpperCase()}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 border-t border-slate-100 pt-2">
                  <select
                    className="rounded-lg border border-slate-200 px-2 py-1 text-[11px]"
                    value={selectedIncident === i._id ? newSeverity : i.severity}
                    onChange={(e) => {
                      setSelectedIncident(i._id);
                      setNewSeverity(e.target.value);
                    }}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                  <button
                    onClick={() => assignIncident(i._id)}
                    className="rounded-lg bg-primary px-3 py-1 text-[11px] font-medium text-white hover:bg-[#071533]"
                  >
                    Assign to Rescue
                  </button>
                </div>
              </div>
            ))}
            {unassigned.length === 0 && (
              <p className="text-xs text-slate-500">All incidents have been assigned.</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="card px-4 py-4">
            <h2 className="text-sm font-semibold text-primary">Incident heatmap</h2>
            <div className="mt-2 h-64 w-full overflow-hidden rounded-lg border border-slate-200">
              <MapContainer
                center={[15.5, 79]}
                zoom={5}
                scrollWheelZoom={false}
                className="h-full w-full"
                attributionControl={false}
                ref={setMap}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              </MapContainer>
            </div>
          </div>

          <div className="card px-4 py-4">
            <h2 className="text-sm font-semibold text-primary">Broadcast alert</h2>
            <form className="mt-2 space-y-2" onSubmit={sendAlert}>
              <textarea
                rows={2}
                required
                className="w-full rounded-lg border border-slate-200 px-2 py-1 text-xs"
                placeholder="Alert message..."
                value={alertMsg}
                onChange={(e) => setAlertMsg(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <select
                  className="rounded-lg border border-slate-200 px-2 py-1 text-xs"
                  value={alertSeverity}
                  onChange={(e) => setAlertSeverity(e.target.value)}
                >
                  <option value="info">Info</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
                <button
                  type="submit"
                  disabled={broadcasting}
                  className="rounded-lg bg-emergency px-3 py-1 text-xs font-semibold text-white hover:bg-[#b71c1c]"
                >
                  {broadcasting ? 'Sending...' : 'Send'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
