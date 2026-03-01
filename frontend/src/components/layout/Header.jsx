import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#0A1F44] shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emergency text-sm font-semibold text-white">
            RN
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">RakshaNet</span>
            <span className="text-xs text-slate-300">Smart Disaster Response</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-white md:flex">
          <a href="#features" className="hover:text-warning">
            Features
          </a>
          <a href="#portals" className="hover:text-warning">
            Portals
          </a>
          <a href="#map" className="hover:text-warning">
            Live Map
          </a>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-xs text-slate-300 md:inline">
                {user.name} · {user.role}
              </span>
              <button
                type="button"
                onClick={logout}
                className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-emergency px-3 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-[#b71c1c]"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

