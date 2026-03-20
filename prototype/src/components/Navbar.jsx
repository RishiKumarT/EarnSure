import { Bell, LogOut, ShieldCheck, LayoutDashboard, FileText, Activity } from "lucide-react";

export default function Navbar({ activeTab, setActiveTab, onLogout, unreadNotifications }) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "myplan", label: "My Plan", icon: <ShieldCheck size={18} /> },
    { id: "claims", label: "Claims", icon: <FileText size={18} /> },
    { id: "risk", label: "Risk Assessment", icon: <Activity size={18} /> },
  ];

  return (
    <nav className="navbar flex-between">
      <div className="nav-brand text-gradient">
        <ShieldCheck size={28} />
        EarnSure
      </div>

      <div className="nav-links">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeTab === item.id ? "active" : ""}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.id === "claims" && unreadNotifications > 0 && (
              <span className="badge">{unreadNotifications}</span>
            )}
            {item.icon}
            {item.label}
          </div>
        ))}
      </div>

      <div className="nav-actions">
        <button className="icon-btn" title="Notifications" onClick={() => setActiveTab("claims")}>
          {unreadNotifications > 0 && <span className="badge">{unreadNotifications}</span>}
          <Bell size={20} />
        </button>
        <button className="icon-btn text-danger" onClick={onLogout} title="Logout">
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
}
