import { Link } from 'react-router-dom';

export const ForgotPasswordPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-56px-64px)] items-center justify-center bg-background px-4 py-10">
      <div className="card w-full max-w-md px-6 py-8">
        <h1 className="mb-2 text-xl font-semibold text-primary">Forgot password</h1>
        <p className="mb-4 text-xs text-slate-500">
          For this prototype, password resets are managed by your authority or system
          administrator. Please contact your local disaster management office to regain access.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-md shadow-soft hover:bg-[#071533]"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
};

