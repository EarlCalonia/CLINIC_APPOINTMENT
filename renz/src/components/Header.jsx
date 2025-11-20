import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, LogOut } from 'lucide-react';
import '../styles/Header.css';

const NavItem = ({ icon, label, to }) => {
  const location = useLocation();
  // Checks if the current path matches the link (for highlighting)
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <Link to={to} className={`nav-item ${isActive ? 'active' : ''}`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you would clear tokens here (e.g., localStorage.clear())
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="logo-container">
        <div className="logo">CALONIA</div>
      </div>
      
      {/* Middle: Navigation Links */}
      <div className="nav-links">
        <NavItem to="/" icon={<LayoutDashboard size={18}/>} label="Dashboard" />
        <NavItem to="/appointments" icon={<Calendar size={18}/>} label="Appointments" />
        <NavItem to="/patients" icon={<Users size={18}/>} label="Patients" />
        <NavItem to="/doctors" icon={<Users size={18}/>} label="Doctors" />
      </div>

      {/* Right: Profile & Logout Section */}
      <div className="nav-right">
        <div className="user-profile">
          <div className="avatar">A</div>
          <div className="user-info">
            <span className="user-name">Admin Staff</span>
            <span className="user-role">Administrator</span>
          </div>
        </div>

        <div className="divider"></div>

        <button className="logout-btn" onClick={handleLogout} title="Sign Out">
          <LogOut size={18} />
        </button>
      </div>
    </nav>
  );
}