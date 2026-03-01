import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { DashboardLayout } from '../../components/dashboards/DashboardLayout.jsx';
import { incidentService } from '../../services/incidentService.js';
import { alertService } from '../../services/alertService.js';
import { useAuth } from '../../hooks/useAuth.jsx';

export const CitizenDashboard = () => {
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [myIncidents, setMyIncidents] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = () => {
      incidentService.list().then((data) => {
        setIncidents(data);
        setMyIncidents(data.filter(i => i.reportedBy === user?.id || i.reportedBy?._id === user?.id));
      }).catch(() => {});
      alertService.list().then(setAlerts).catch(() => {});
    };
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [user]);

  const handleReport = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await incidentService.create({
        title: `Disaster report`,
        description,
        severity: 'medium',
        status: 'reported',
        location: {
          type: 'Point',
          coordinates: [80.27, 13.08],
          address: 'Citizen-reported location',
        },
      });
      setDescription('');
      const fresh = await incidentService.list();
      setIncidents(fresh);
      setMyIncidents(fresh.filter(i => i.reportedBy === user?.id || i.reportedBy?._id === user?.id));
    } catch {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout
      title="Citizen Portal"
      subtitle="Raise SOS, track your reports and locate nearby shelters and alerts."
    >
      <div className="grid gap-5 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-4">
          <div className="card px-4 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-primary">Emergency SOS</h2>
              <span className="text-[11px] font-medium uppercase tracking-wide text-emergency">
                High priority
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-600">
              Use this for real emergencies requiring immediate attention.
            </p>
            <button
              type="button"
              className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-emergency px-4 py-2 text-sm font-semibold text-white shadow-md shadow-soft hover:bg-[#b71c1c]"
            >
              Tap to send SOS
            </button>
          </div>

          <div className="card px-4 py-4">
            <h2 className="text-sm font-semibold text-primary">Report a disaster</h2>
            <p className="mt-1 text-xs text-slate-600">
              Describe the situation. Our AI will assess severity and route to the appropriate team.
            </p>
            <form className="mt-3 space-y-3" onSubmit={handleReport}>
              <textarea
                rows={3}
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary/40"
                placeholder="Example: Severe flooding near main bus stand, water entering homes…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-md shadow-soft hover:bg-[#071533] disabled:opacity-70"
              >
                {submitting ? 'Submitting…' : 'Submit report'}
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card px-4 py-4">
            <h2 className="text-sm font-semibold text-primary">Nearby shelters</h2>
            <p className="mt-1 text-xs text-slate-600">
              Map preview of government and NGO-run shelters. Detailed routing appears on mobile
              app or field devices.
            </p>
            <div className="mt-3 h-56 w-full overflow-hidden rounded-lg border border-slate-200">
              <MapContainer
                center={[13.08, 80.27]}
                zoom={10}
                scrollWheelZoom={false}
                className="h-full w-full"
                attributionControl={false}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <CircleMarker
                  center={[13.1, 80.25]}
                  radius={7}
                  pathOptions={{ color: '#2E7D32', weight: 2, fillOpacity: 0.9 }}
                />
                <CircleMarker
                  center={[13.06, 80.29]}
                  radius={7}
                  pathOptions={{ color: '#2E7D32', weight: 2, fillOpacity: 0.9 }}
                />
              </MapContainer>
            </div>
          </div>

          <div className="card px-4 py-4">
            <h2 className="text-sm font-semibold text-primary">Active alerts</h2>
            <ul className="mt-2 space-y-2 text-xs text-slate-700">
              {alerts.slice(0, 4).map((alert) => (
                <li key={alert._id} className="flex items-start justify-between gap-2">
                  <span>{alert.message}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-[2px] text-[10px] uppercase tracking-wide text-slate-500">
                    {alert.severity}
                  </span>
                </li>
              ))}
              {alerts.length === 0 && (
                <li className="text-xs text-slate-500">No active alerts in your area.</li>
              )}
            </ul>
          </div>

          <div className="card px-4 py-4">
            <h2 className="text-sm font-semibold text-primary">My incident tracker</h2>
            <div className="mt-2 space-y-2 text-xs">
              {myIncidents.slice(0, 5).map((i) => {
                const statusColor = {
                  reported: 'bg-yellow-100 text-yellow-700',
                  assigned: 'bg-blue-100 text-blue-700',
                  in_progress: 'bg-orange-100 text-orange-700',
                  resolved: 'bg-green-100 text-green-700',
                  closed: 'bg-slate-100 text-slate-600'
                }[i.status] || 'bg-slate-100 text-slate-600';
                
                const statusLabel = {
                  reported: '🟡 Pending Review',
                  assigned: '🔵 Assigned to Team',
                  in_progress: '🟠 Rescue En Route',
                  resolved: '✅ Resolved',
                  closed: '✔ Closed'
                }[i.status] || i.status;

                return (
                  <div key={i._id} className="rounded-md border border-slate-200 bg-white px-3 py-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-primary">{i.title}</p>
                        <p className="mt-1 text-[11px] text-slate-600">{i.description}</p>
                      </div>
                      <span className={`ml-2 rounded-full px-2 py-1 text-[10px] font-medium ${statusColor}`}>
                        {i.severity.toUpperCase()}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2">
                      <span className="text-[11px] font-medium text-slate-700">{statusLabel}</span>
                      <span className="text-[11px] text-slate-500">
                        {new Date(i.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
              {myIncidents.length === 0 && (
                <p className="text-xs text-slate-500">You have not submitted any reports yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

