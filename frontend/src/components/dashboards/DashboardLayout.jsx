export const DashboardLayout = ({ title, subtitle, children, right }) => {
  return (
    <div className="page-section">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-primary">{title}</h1>
            {subtitle && <p className="mt-1 text-xs text-slate-600">{subtitle}</p>}
          </div>
          {right && <div className="text-xs text-slate-600">{right}</div>}
        </div>
        {children}
      </div>
    </div>
  );
};

