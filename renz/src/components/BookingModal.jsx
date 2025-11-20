import React, { useState } from 'react';
import { X, Clock } from 'lucide-react';

export default function BookingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [selectedTime, setSelectedTime] = useState(null);

  // Mock Data simulating Backend Availability
  const timeSlots = [
    { time: '09:00 AM', status: 'available' },
    { time: '09:30 AM', status: 'booked' },   // Greyed out
    { time: '10:00 AM', status: 'available' },
    { time: '10:30 AM', status: 'blocked' },  // Doctor Break
    { time: '11:00 AM', status: 'available' },
    { time: '11:30 AM', status: 'available' },
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between' }}>
          <h3 style={{ fontWeight: 'bold' }}>New Appointment</h3>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={20}/></button>
        </div>

        <div style={{ padding: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">Select Patient</label>
            <select className="form-control">
              <option>Select a patient...</option>
              <option>John Smith (ID: 101)</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Doctor</label>
              <select className="form-control"><option>Dr. Johnson</option></select>
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input type="date" className="form-control" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <Clock size={14}/> Available Time Slots
            </label>
            <div className="slots-grid">
              {timeSlots.map((slot, idx) => (
                <button key={idx}
                  disabled={slot.status !== 'available'}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`slot-btn ${selectedTime === slot.time ? 'selected' : ''}`}
                >
                  {slot.time}
                  {slot.status === 'booked' && <span style={{ display:'block', fontSize:'0.6rem', color:'red' }}>BOOKED</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: '1rem 1.5rem', background: '#f9fafb', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', border: '1px solid #ccc', background: 'white', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
          <button className="btn btn-primary">Confirm</button>
        </div>
      </div>
    </div>
  );
}