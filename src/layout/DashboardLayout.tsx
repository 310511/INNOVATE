import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414l5-5A1 1 0 0110 9.586V18a1 1 0 001 1h4a1 1 0 001-1v-8.586a1 1 0 011.414-.586l5 5a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
    },
    {
      name: "My Pitches",
      path: "/dashboard/pitches",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path
            fillRule="evenodd"
            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 4a1 1 0 001-1v6a1 1 0 102 0v-6a1 1 0 001 1h2a1 1 0 100-2H8a1 1 0 00-1 1zM10 15a1 1 0 001-1v-1a1 1 0 00-1-1h-1a1 1 0 00-1 1v1a1 1 0 001 1h1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Recorded Sessions",
      path: "/dashboard/recorded",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L7 11H5v2H3v-2H1v-2h2V7h2V5h2V3h2V1h-2V0h-2v1H7v2H5V5zm9.9 9.9A7 7 0 115.05 4.05L7 7H5v2H3v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h-2V7h-2v-2H9v-2h2V1h2v1h2v2h2v2h-2v2h-2v2h-2v2h-2v2h-2v-2H7v-2h-2v-2h2V7h2V5h2V3h2V1h-2V0h-2v1H7v2H5V5z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "AI Judges",
      path: "/dashboard/judges",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 004-4v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2a4 4 0 004 4h8z" />
        </svg>
      ),
    },
    {
      name: "Score",
      path: "/dashboard/score",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M18 9.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          <path d="M4 18.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM18 18.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM8 18.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM18 13.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM8 13.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM18 4.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM8 4.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM4 9.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      ),
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.63-1.56-3 0a1.5 1.5 0 00-1.5 1.5c0 1.026 1.742 1.97 3 1.97 1.258 0 3-.944 3-1.97a1.5 1.5 0 00-1.5-1.5zm-1 5a1 1 0 110-2 1 1 0 010 2z"
            clipRule="evenodd"
          />
          <path d="M8 7a4 4 0 118 0 4 4 0 01-8 0z" />
          <path d="M12 14a3 3 0 110-6 3 3 0 010 6zm0 2a5 5 0 110-10 5 5 0 010 10z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-[70px]">
      <div className="flex">
        
        {/* Sidebar */}
        <aside className="w-64 bg-slate-800 fixed top-[70px] left-0 h-[calc(100vh-70px)] p-4 overflow-y-auto">
          <nav className="space-y-2">
            {menu.map((item) => (
             <NavLink
  key={item.path}
  to={item.path}
  end={item.path === "/dashboard"}
  className={({ isActive }) =>
    `flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer
    ${isActive ? "bg-cyan-600 text-white" : "hover:bg-slate-700"}`
  }
>
  {item.icon}
  <span>{item.name}</span>
</NavLink>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="ml-64 flex-1 p-6 h-[calc(100vh-70px)] overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
