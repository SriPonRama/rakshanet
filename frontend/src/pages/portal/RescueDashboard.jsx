import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { DashboardLayout } from '../../components/dashboards/DashboardLayout.jsx';
import { incidentService } from '../../services/incidentService.js';
import { useAuth } from '../../hooks/useAuth.jsx';

export const RescueDashboard = () => {
  const { user } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      incidentService.list().then(setIncidents).catch(() => {});
    };
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const assigned = useMemo(
    () => incidents.filter((i) => i.status === 'assigned' || i.status === 'in_progress' || (i.assignedTo && (i.assignedTo === user.id || i.assignedTo?._id === user.id))),
    [incidents, user.id],
  );

  const updateStatus = async (id, status) => {
    setUpdating(true);
    try {
      const updated = await incidentService.updateStatus(id, { status, assignedTo: user.id });
      setIncidents((prev) => prev.map((i) => (i._id === updated._id ? updated : i)));
      setSelected(updated);
    } finally {
      setUpdating(false);
    }
  };

  const center = selected?.location?.coordinates
    ? [selected.location.coordinates[1], selected.location.coordinates[0]]
    : [13.08, 80.27];

  return (
    <DashboardLayout
      title="Rescue Team Portal"
      subtitle="View assigned incidents, navigate to victims and keep the control room updated."
    >
      <div className="grid gap-5 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="card px-4 py-4">
          <h2 className="text-sm font-semibold text-primary">Assigned incidents ({assigned.length})</h2>
          <div className="mt-2 max-h-72 space-y-2 overflow-y-auto text-xs">
            {assigned.map((i) => (
              <button
                key={i._id}
                type="button"
                onClick={() => setSelected(i)}
                className={`flex w-full items-start justify-between rounded-md border px-2 py-1.5 text-left ${
                  selected?._id === i._id
                    ? 'border-primary bg-primary/5'
                    : 'border-slate-100 bg-white'
                }`}
              >
                <div>
                  <p className="font-medium text-primary">{i.title}</p>
                  <p className="mt-1 line-clamp-2 text-[11px] text-slate-600">{i.description}</p>
                </div>
                <span className="ml-2 text-[11px] uppercase tracking-wide text-slate-500">
                  {i.status}
                </span>
              </button>
            ))}
            {assigned.length === 0 && (
              <p className="text-xs text-slate-500">
                No incidents are currently assigned to your team.
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="card px-4 py-4">
            <h2 className="text-sm font-semibold text-primary">Victim location & navigation</h2>
            <div className="mt-2 h-52 w-full overflow-hidden rounded-lg border border-slate-200">
              <MapContainer
                center={center}
                zoom={selected ? 14 : 6}
                scrollWheelZoom={false}
                className="h-full w-full"
                attributionControl={false}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {selected?.location?.coordinates && (
                  <Marker
                    position={[
                      selected.location.coordinates[1],
                      selected.location.coordinates[0],
                    ]}
                  >
                    <Popup>{selected.title}</Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
          </div>

          <div className="card px-4 py-4">
            <h2 className="text-sm font-semibold text-primary">Status updates & contact</h2>
            {selected ? (
              <div className="space-y-3 text-xs text-slate-700">
                <p>
                  <span className="font-semibold text-primary">Current status:</span>{' '}
                  <span className="uppercase">{selected.status}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {['assigned', 'in_progress', 'resolved'].map((status) => (
                    <button
                      key={status}
                      type="button"
                      disabled={updating}
                      onClick={() => updateStatus(selected._id, status)}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                    >
                      Mark {status.replace('_', ' ')}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-slate-600">
                  Victim contact details are available in the mobile app for privacy reasons. Use
                  the control room channel to request direct contact if required.
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                Select an assigned incident on the left to view map and update status.
              </p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

