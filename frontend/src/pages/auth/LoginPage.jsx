import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const user = await login(email, password);
      switch (user.role) {
        case 'citizen':
          navigate('/portal/citizen');
          break;
        case 'rescue':
          navigate('/portal/rescue');
          break;
        case 'authority':
          navigate('/portal/authority');
          break;
        case 'ngo':
          navigate('/portal/ngo');
          break;
        case 'admin':
          navigate('/portal/admin');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to login. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-56px-64px)] items-center justify-center bg-background px-4 py-10">
      <div className="card w-full max-w-md px-6 py-8">
        <h1 className="mb-2 text-xl font-semibold text-primary">Sign in to RakshaNet</h1>
        <p className="mb-6 text-xs text-slate-500">
          Secure access for citizens, responders, authorities, NGOs and administrators.
        </p>
        {error && (
          <div className="mb-4 rounded-md border border-emergency/30 bg-emergency/5 px-3 py-2 text-xs text-emergency">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">Email</label>
            <input
              type="email"
              required
              className="block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">Password</label>
            <input
              type="password"
              required
              className="block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/40"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-soft transition hover:bg-[#071533] disabled:cursor-not-allowed disabled:opacity-80"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <Link to="/forgot-password" className="hover:text-primary">
            Forgot password?
          </Link>
          <span>
            New user?{' '}
            <Link to="/signup" className="font-medium text-primary hover:text-emergency">
              Create account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

