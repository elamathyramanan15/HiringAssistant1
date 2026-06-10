import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, FileText, Users,
  Calendar, BarChart2, Settings, LogOut, Sparkles
} from "lucide-react";

const navItems = [
  { label: "Dashboard",        icon: LayoutDashboard, to: "/" },
  { label: "Job Descriptions", icon: FileText,         to: "/jobs" },
  { label: "Candidates",       icon: Users,            to: "/candidates" },
  { label: "Interviews",       icon: Calendar,         to: "/interviews" },
  { label: "Analytics",        icon: BarChart2,        to: "/analytics" },
  { label: "Settings",         icon: Settings,         to: "/settings" },
];

export default function Sidebar() {
  return (
    <aside style={{
      width: "220px", minHeight: "100vh", background: "#ffffff",
      display: "flex", flexDirection: "column", flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ display:"flex", alignItems:"center", gap:"10px", padding:"24px 18px 32px" }}>
        <div style={{
          width:"34px", height:"34px", background:"#7C3AED",
          borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center"
        }}>
          <Sparkles size={18} color="#fff" />
        </div>
        <span style={{ color:"#000000", fontSize:"16px", fontWeight:600 }}>Hire AI</span>
      </div>

      {/* Nav Links */}
      <nav style={{ flex:1, display:"flex", flexDirection:"column", gap:"2px", padding:"0 10px" }}>
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            end
            style={({ isActive }) => ({
              display:"flex", alignItems:"center", gap:"10px",
              padding:"10px 12px", borderRadius:"8px", textDecoration:"none",
              fontSize:"14px",
              background: isActive ? "#7C3AED" : "transparent",
              color: isActive ? "#ffffff" : "#000000",
            })}
          >
            {({ isActive }) => (
              <>
                <Icon size={18} color={isActive ? "#fff" : "#000000"} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Sign Out */}
      <div style={{ padding:"16px", borderTop:"1px solid rgba(255,255,255,0.1)" }}>
        <button style={{
          display:"flex", alignItems:"center", gap:"10px",
          color:"#A5B4FC", background:"none", border:"none",
          fontSize:"14px", cursor:"pointer", padding:"8px 12px",
          borderRadius:"8px", width:"100%",
        }}>
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}