import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Lock, Mail } from 'lucide-react';
import '../styles/Login.css';

export default function Login() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // --- MOCK LOGIN LOGIC ---
    // In a real app, you would send an API request here.
    // For now, we just redirect to the Dashboard.
    console.log("Logging in with:", formData);
    navigate('/'); // Brings you to the Admin Dashboard
  };

  return (
    <div className="login-page">
      
      {/* Left Side: Branding */}
      <div className="login-brand-section">
        <div className="brand-logo">CALONIA</div>
        <p className="brand-subtitle">
          Centralized Appointment & Logistics Operations Network Interface Application
        </p>
        <div style={{marginTop: '2rem', opacity: 0.7, fontSize: '0.9rem'}}>
          &copy; 2025 Clinic Administration System
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="login-form-section">
        <div className="login-card animate-slide-up">
          <div className="login-header">
            <h2>Staff Portal</h2>
            <p>Please enter your credentials to access the system.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label className="login-label">Email Address</label>
              <div style={{position: 'relative'}}>
                <Mail size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}} />
                <input 
                  type="email" 
                  required
                  className="login-input"
                  placeholder="staff@calonia.com"
                  style={{paddingLeft: '2.5rem'}}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="login-form-group">
              <label className="login-label">Password</label>
              <div style={{position: 'relative'}}>
                <Lock size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}} />
                <input 
                  type="password" 
                  required
                  className="login-input"
                  placeholder="••••••••"
                  style={{paddingLeft: '2.5rem'}}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <div style={{textAlign: 'right', marginBottom: '1.5rem'}}>
              <a href="#" style={{fontSize: '0.85rem', color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '500'}}>Forgot Password?</a>
            </div>

            <button type="submit" className="login-btn">
              <LogIn size={20} /> Sign In
            </button>
          </form>

          <div className="login-footer">
            Authorized personnel only. <br/> 
            Contact IT support for access issues.
          </div>
        </div>
      </div>
    </div>
  );
}