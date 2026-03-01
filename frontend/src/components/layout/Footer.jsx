export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-[#0A1F44]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-slate-300 md:flex-row md:items-center md:justify-between md:px-8">
        <p>© {new Date().getFullYear()} RakshaNet – Smart Disaster Response Platform.</p>
        <p className="text-[11px]">
          Built for rapid, coordinated emergency response across citizens, authorities, NGOs and
          rescue teams.
        </p>
      </div>
    </footer>
  );
};

