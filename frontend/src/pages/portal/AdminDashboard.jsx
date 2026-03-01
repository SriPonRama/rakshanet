import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/dashboards/DashboardLayout.jsx';
import { adminService } from '../../services/adminService.js';
import { incidentService } from '../../services/incidentService.js';

export const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [updatingRoleId, setUpdatingRoleId] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      adminService.listUsers().then(setUsers).catch(() => {});
      adminService.listModerationIncidents().then(setIncidents).catch(async () => {
        const all = await incidentService.list();
        setIncidents(all);
      });
    };
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const updateRole = async (id, role) => {
    setUpdatingRoleId(id);
    try {
      const updated = await adminService.updateUserRole(id, role);
      setUsers((prev) => prev.map((u) => (u._id === updated._id ? updated : u)));
    } finally {
      setUpdatingRoleId(null);
    }
  };

  const closeIncident = async (id) => {
    const updated = await incidentService.updateStatus(id, { status: 'closed' });
    setIncidents((prev) => prev.map((i) => (i._id === updated._id ? updated : i)));
  };

  return (
    <DashboardLayout
      title="Super Admin Portal"
      subtitle="Manage users, roles, system oversight and incident moderation."
    >
      <div className="grid gap-5 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="card px-4 py-4">
          <h2 className="text-sm font-semibold text-primary">User management & roles</h2>
          <div className="mt-2 max-h-80 space-y-2 overflow-y-auto text-xs">
            {users.map((u) => (
              <div
                key={u._id}
                className="flex items-center justify-between rounded-md border border-slate-100 bg-white px-2 py-1.5"
              >
                <div>
                  <p className="text-xs font-medium text-primary">{u.name}</p>
                  <p className="text-[11px] text-slate-600">{u.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    className="rounded-lg border border-slate-200 px-2 py-1 text-[11px] outline-none focus:border-primary focus:ring-1 focus:ring-primary/40"
                    value={u.role}
                    disabled={updatingRoleId === u._id}
                    onChange={(e) => updateRole(u._id, e.target.value)}
                  >
                    <option value="citizen">citizen</option>
                    <option value="rescue">rescue</option>
                    <option value="authority">authority</option>
                    <option value="ngo">ngo</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
              </div>
            ))}
            {users.length === 0 && (
              <p className="text-xs text-slate-500">No users found in the system.</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="card px-4 py-4">
            <h2 className="text-sm font-semibold text-primary">Incident moderation</h2>
            <p className="mt-1 text-xs text-slate-600">
              Review and close incidents after validation with field teams.
            </p>
            <div className="mt-2 max-h-52 space-y-2 overflow-y-auto text-xs">
              {incidents.slice(0, 10).map((i) => (
                <div
                  key={i._id}
                  className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 px-2 py-1.5"
                >
                  <div>
                    <p className="text-xs font-medium text-primary">{i.title}</p>
                    <p className="text-[11px] text-slate-600">
                      {i.status} · {i.severity}
                    </p>
                  </div>
                  {i.status !== 'closed' && (
                    <button
                      type="button"
                      onClick={() => closeIncident(i._id)}
                      className="rounded-lg border border-slate-200 px-2 py-1 text-[11px] text-slate-700 hover:bg-slate-100"
                    >
                      Mark closed
                    </button>
                  )}
                </div>
              ))}
              {incidents.length === 0 && (
                <p className="text-xs text-slate-500">No incidents available for moderation.</p>
              )}
            </div>
          </div>

          <div className="card px-4 py-4">
            <h2 className="text-sm font-semibold text-primary">System logs (summary)</h2>
            <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
              <li>• Role changes and admin actions are recorded in the audit log store.</li>
              <li>
                • Authentication events (login/logout) and high-risk AI recommendations are
                monitored.
              </li>
              <li>• Full log streaming can be plugged into ELK/Splunk in production.</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

