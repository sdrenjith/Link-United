import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Overview", path: "/admin/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { 
    label: "Home", 
    icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
    subItems: [
      { label: "Hero Slider", path: "/admin/dashboard/home-sliders" },
      { label: "Notifications", path: "/admin/dashboard/announcements" },
    ]
  },
  { 
    label: "Products", 
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    subItems: [
      { label: "Manage Products", path: "/admin/dashboard/products" },
      { label: "Sliders", path: "/admin/dashboard/sliders" },
    ]
  },
  { label: "Media", path: "/admin/dashboard/media", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { label: "Enquiries", path: "/admin/dashboard/enquiries", icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" },
];

function Dashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Determine if specific accordions should be initially open (if user is on a nested route)
  const isProductsActive = location.pathname.includes("/admin/dashboard/products") || location.pathname.includes("/admin/dashboard/sliders");
  const isHomeActive = location.pathname.includes("/admin/dashboard/home-sliders") || location.pathname.includes("/admin/dashboard/announcements");
  
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    Products: isProductsActive,
    Home: isHomeActive
  });

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="flex h-screen w-full bg-[#030303] overflow-hidden selection:bg-gold-500/30">
      
      {/* Sleek Glassmorphic Sidebar */}
      <aside className="w-[260px] lg:w-[280px] h-full flex flex-col border-r border-white/5 bg-white/[0.01] backdrop-blur-2xl relative z-20">
        
        {/* Top Branding Area */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Link United International"
              className="h-16 w-auto"
              style={{ filter: "drop-shadow(0 0 10px rgba(201,151,58,0.35))" }}
            />
          </div>
          <p className="mt-2 font-sans text-[9px] uppercase tracking-[0.2em] text-zinc-500">
            Admin Console
          </p>
        </div>

        {/* User Context */}
        <div className="px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
              <span className="text-gold-400 text-sm font-semibold">
                {user?.fullName?.charAt(0) || "A"}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-200">{user?.fullName || "Administrator"}</p>
              <p className="text-[10px] text-zinc-500">System Access</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.label} className="space-y-1">
              {item.subItems ? (
                /* Accordion Parent */
                <>
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={`flex items-center justify-between w-full rounded-lg px-3 py-2.5 text-sm transition-all duration-200 group relative ${
                      openMenus[item.label]
                        ? "text-zinc-200 bg-white/[0.03]"
                        : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <svg className={`h-5 w-5 ${openMenus[item.label] ? "text-gold-400" : "text-zinc-500 group-hover:text-zinc-300"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                      </svg>
                      {item.label}
                    </div>
                    <svg
                      className={`h-4 w-4 text-zinc-500 transition-transform duration-300 ${openMenus[item.label] ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {openMenus[item.label] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-11 pr-3 py-1 space-y-1">
                          {item.subItems.map((sub) => (
                            <NavLink
                              key={sub.path}
                              to={sub.path}
                              end={sub.path === "/admin/dashboard/products"}
                              className={({ isActive }) =>
                                `block w-full rounded-md px-3 py-2 text-xs font-medium transition-all duration-200 ${
                                  isActive
                                    ? "bg-gold-400/10 text-gold-400 shadow-[inset_2px_0_0_rgba(201,151,58,1)]"
                                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]"
                                }`
                              }
                            >
                              {sub.label}
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                /* Standard Link */
                <NavLink
                  to={item.path!}
                  end={item.path === "/admin/dashboard"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 group relative ${
                      isActive 
                        ? "bg-gold-400/10 text-gold-400 font-medium" 
                        : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Left Active Indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-gold-400 rounded-r-full shadow-[0_0_10px_rgba(201,151,58,0.5)]" />
                      )}
                      
                      <svg className={`h-5 w-5 ${isActive ? "text-gold-400" : "text-zinc-500 group-hover:text-zinc-300"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon!} />
                      </svg>
                      {item.label}
                    </>
                  )}
                </NavLink>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/5 mt-auto">
          <button 
            onClick={logout}
            className="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm text-zinc-400 hover:bg-white/5 hover:text-red-400 transition-colors duration-200 group"
          >
             <svg className="h-5 w-5 text-zinc-500 group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
             </svg>
             Secure Logout
          </button>
        </div>

      </aside>

      {/* Main Full-Viewport Content Area */}
      <main className="flex-1 h-full overflow-y-auto relative z-10">
        <div className="min-h-full p-8 md:p-12 w-full max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>

    </div>
  );
}

export default Dashboard;