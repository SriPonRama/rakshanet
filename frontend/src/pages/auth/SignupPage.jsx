import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import { ROLES } from '../../utils/constants.js';

const roleOptions = [
  { value: ROLES.CITIZEN, label: 'Citizen' },
  { value: ROLES.RESCUE, label: 'Rescue Team' },
  { value: ROLES.AUTHORITY, label: 'Authority' },
  { value: ROLES.NGO, label: 'NGO' },
];

export const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: ROLES.CITIZEN,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const user = await signup(form);
      switch (user.role) {
        case ROLES.CITIZEN:
          navigate('/portal/citizen');
          break;
        case ROLES.RESCUE:
          navigate('/portal/rescue');
          break;
        case ROLES.AUTHORITY:
          navigate('/portal/authority');
          break;
        case ROLES.NGO:
          navigate('/portal/ngo');
          break;
        case ROLES.ADMIN:
          navigate('/portal/admin');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create account.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-56px-64px)] items-center justify-center bg-background px-4 py-10">
      <div className="card w-full max-w-md px-6 py-8">
        <h1 className="mb-2 text-xl font-semibold text-primary">Create RakshaNet account</h1>
        <p className="mb-6 text-xs text-slate-500">
          Register as a citizen, rescue team member, authority or NGO to access your portal.
        </p>
        {error && (
          <div className="mb-4 rounded-md border border-emergency/30 bg-emergency/5 px-3 py-2 text-xs text-emergency">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">Full name</label>
            <input
              type="text"
              name="name"
              required
              className="block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/40"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">Email</label>
            <input
              type="email"
              name="email"
              required
              className="block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/40"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Password</label>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                className="block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/40"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Role</label>
              <select
                name="role"
                className="block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/40"
                value={form.role}
                onChange={handleChange}
              >
                {roleOptions.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center rounded-lg bg-emergency px-4 py-2 text-sm font-semibold text-white shadow-md shadow-soft transition hover:bg-[#b71c1c] disabled:cursor-not-allowed disabled:opacity-80"
          >
            {submitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>
        <div className="mt-4 text-right text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="font-medium text-primary hover:text-emergency">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

