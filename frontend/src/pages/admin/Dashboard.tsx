import { NavLink, Outlet } from "react-router-dom";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { label: "Overview", path: "/admin/dashboard" },
  { label: "Products", path: "/admin/dashboard/products" },
  { label: "Media", path: "/admin/dashboard/media" },
  { label: "Enquiries", path: "/admin/dashboard/enquiries" },
];

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <section className="mx-auto grid min-h-screen max-w-7xl gap-5 px-4 py-8 md:grid-cols-[240px_1fr]">
      <aside className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
        <p className="text-xs uppercase tracking-widest text-amber-400">Admin Console</p>
        <h2 className="mt-2 text-lg text-white">{user?.fullName || "Administrator"}</h2>
        <nav className="mt-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              end={item.path === "/admin/dashboard"}
              className={({ isActive }) =>
                `block rounded px-3 py-2 text-sm ${
                  isActive ? "bg-amber-500/10 text-amber-400" : "text-zinc-300 hover:bg-zinc-800"
                }`
              }
              to={item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-6">
          <Button variant="secondary" onClick={logout} fullWidth>
            Logout
          </Button>
        </div>
      </aside>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
        <Outlet />
      </div>
    </section>
  );
}

export default Dashboard;