import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/dashboards/DashboardLayout.jsx';
import { incidentService } from '../../services/incidentService.js';
import { resourceService } from '../../services/resourceService.js';

export const NgoDashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [resources, setResources] = useState([]);
  const [creatingShelter, setCreatingShelter] = useState(false);
  const [shelterName, setShelterName] = useState('');
  const [shelterCapacity, setShelterCapacity] = useState(100);

  useEffect(() => {
    const fetchData = () => {
      incidentService.list().then(setIncidents).catch(() => {});
      resourceService.list().then(setResources).catch(() => {});
    };
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const helpRequests = incidents.filter(
    (i) => i.status === 'reported' || i.status === 'in_progress',
  );
  const shelters = resources.filter((r) => r.type?.toLowerCase().includes('shelter'));

  const createShelter = async (e) => {
    e.preventDefault();
    setCreatingShelter(true);
    try {
      await resourceService.create({
        type: 'Shelter',
        quantity: shelterCapacity,
        available: true,
        location: {
          type: 'Point',
          coordinates: [80.27, 13.08],
          name: shelterName,
        },
      });
      setShelterName('');
      const fresh = await resourceService.list();
      setResources(fresh);
    } finally {
      setCreatingShelter(false);
    }
  };

  return (
    <DashboardLayout
      title="NGO Portal"
      subtitle="Coordinate citizen help requests and manage emergency shelters."
    >
      <div className="grid gap-5 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="card px-4 py-4">
          <h2 className="text-sm font-semibold text-primary">Help requests</h2>
          <p className="mt-1 text-xs text-slate-600">
            Filtered view of incidents that may require NGO or community support.
          </p>
          <div className="mt-3 max-h-72 space-y-2 overflow-y-auto text-xs">
            {helpRequests.map((i) => (
              <div
                key={i._id}
                className="flex items-start justify-between rounded-md border border-slate-100 bg-white px-2 py-1.5"
              >
                <div>
                  <p className="font-medium text-primary">{i.title}</p>
                  <p className="mt-1 line-clamp-2 text-[11px] text-slate-600">{i.description}</p>
                </div>
                <span className="ml-2 text-[11px] uppercase tracking-wide text-slate-500">
                  {i.severity}
                </span>
              </div>
            ))}
            {helpRequests.length === 0 && (
              <p className="text-xs text-slate-500">
                No open help requests mapped to NGO support at the moment.
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="card px-4 py-4">
            <h2 className="text-sm font-semibold text-primary">Shelter management</h2>
            <p className="mt-1 text-xs text-slate-600">
              Maintain basic details of shelters managed by your organisation.
            </p>
            <div className="mt-2 max-h-40 space-y-2 overflow-y-auto text-xs">
              {shelters.map((s) => (
                <div
                  key={s._id}
                  className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 px-2 py-1.5"
                >
                  <div>
                    <p className="text-xs font-medium text-primary">
                      {s.location?.name || 'Shelter'}
                    </p>
                    <p className="text-[11px] text-slate-600">
                      Capacity {s.quantity} · {s.available ? 'Available' : 'Full'}
                    </p>
                  </div>
                </div>
              ))}
              {shelters.length === 0 && (
                <p className="text-xs text-slate-500">No shelters registered yet.</p>
              )}
            </div>
          </div>

          <div className="card px-4 py-4">
            <h2 className="text-sm font-semibold text-primary">Add shelter</h2>
            <form className="mt-2 space-y-2 text-xs" onSubmit={createShelter}>
              <div>
                <label className="mb-1 block text-[11px] text-slate-600">Shelter name</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-lg border border-slate-200 px-2 py-1 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary/40"
                  value={shelterName}
                  onChange={(e) => setShelterName(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-slate-600">Capacity</label>
                <input
                  type="number"
                  min={10}
                  className="w-full rounded-lg border border-slate-200 px-2 py-1 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary/40"
                  value={shelterCapacity}
                  onChange={(e) => setShelterCapacity(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                disabled={creatingShelter}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-md shadow-soft hover:bg-[#071533] disabled:opacity-70"
              >
                {creatingShelter ? 'Saving…' : 'Save shelter'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

