import React, { useState } from 'react';
import { Eye, Calendar, XCircle, Clock, CheckCircle, AlertCircle, Trash2, Plus, MapPin, Search, Phone, Mail, X } from 'lucide-react';
import CalendarWidget from '../components/CalendarWidget';
import BookingModal from '../components/BookingModal';

export default function Appointments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Extended Mock Data with more details
  const [appointments] = useState([
    { 
      id: 1, 
      time: '09:00 AM', 
      duration: '30 min',
      patient: 'John Smith', 
      phone: '555-0101',
      email: 'john.smith@email.com',
      doc: 'Dr. Johnson', 
      type: 'General Checkup', 
      notes: 'Annual checkup, patient reports feeling well',
      status: 'Confirmed' 
    },
    { 
      id: 2, 
      time: '10:30 AM', 
      duration: '45 min',
      patient: 'Sarah Williams', 
      phone: '555-0102',
      email: 'sarah.w@email.com',
      doc: 'Dr. Davis', 
      type: 'Pediatric Review', 
      notes: 'Follow-up on previous treatment',
      status: 'Pending' 
    },
    { 
      id: 3, 
      time: '02:00 PM', 
      duration: '60 min',
      patient: 'Mike Brown', 
      phone: '555-0103',
      email: 'mike.brown@email.com',
      doc: 'Dr. Miller', 
      type: 'Heart Screening', 
      notes: 'Pre-surgical screening required',
      status: 'Completed' 
    },
  ]);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [selectedAppointments, setSelectedAppointments] = useState(new Set());

  // Filter appointments based on search and filters
  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.notes.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    
    const hour = parseInt(apt.time.split(':')[0]);
    const period = apt.time.split(' ')[1];
    const hour24 = period === 'AM' && hour !== 12 ? hour : period === 'PM' && hour !== 12 ? hour + 12 : hour;
    
    const matchesTime = timeFilter === 'all' || 
                       (timeFilter === 'morning' && hour24 >= 6 && hour24 < 12) ||
                       (timeFilter === 'afternoon' && hour24 >= 12 && hour24 < 18) ||
                       (timeFilter === 'evening' && hour24 >= 18);
    
    return matchesSearch && matchesStatus && matchesTime;
  });

  // Toggle appointment selection
  const toggleSelection = (id) => {
    const newSelection = new Set(selectedAppointments);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedAppointments(newSelection);
  };

  // Action handlers with modal
  const handleViewAppointment = (appointment) => {
    setModalContent({
      type: 'view',
      title: 'Appointment Details',
      content: (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <div>
            <strong>Patient:</strong> {appointment.patient}
          </div>
          <div>
            <strong>Time:</strong> {appointment.time}
          </div>
          <div>
            <strong>Duration:</strong> {appointment.duration}
          </div>
          <div>
            <strong>Doctor:</strong> {appointment.doc}
          </div>
          <div>
            <strong>Type:</strong> {appointment.type}
          </div>
          <div>
            <strong>Phone:</strong> {appointment.phone}
          </div>
          <div>
            <strong>Email:</strong> {appointment.email}
          </div>
          <div>
            <strong>Notes:</strong> {appointment.notes}
          </div>
        </div>
      )
    });
  };

  const handleRescheduleAppointment = (appointment) => {
    setModalContent({
      type: 'confirm',
      title: 'Reschedule Appointment',
      message: `Reschedule appointment for ${appointment.patient} on ${appointment.time}?`,
      onConfirm: () => {
        setModalContent({
          type: 'success',
          title: 'Appointment Rescheduled',
          message: `Appointment for ${appointment.patient} has been rescheduled.`
        });
      }
    });
  };

  const handleCancelAppointment = (appointment) => {
    setModalContent({
      type: 'confirm',
      title: 'Cancel Appointment',
      message: `Cancel appointment for ${appointment.patient} on ${appointment.time}? This action cannot be undone.`,
      onConfirm: () => {
        setModalContent({
          type: 'success',
          title: 'Appointment Cancelled',
          message: `Appointment for ${appointment.patient} has been cancelled.`
        });
      }
    });
  };

  const handleBulkComplete = () => {
    setModalContent({
      type: 'confirm',
      title: 'Mark Appointments Complete',
      message: `Mark ${selectedAppointments.size} appointment(s) as complete?`,
      onConfirm: () => {
        setSelectedAppointments(new Set());
        setModalContent({
          type: 'success',
          title: 'Appointments Completed',
          message: `${selectedAppointments.size} appointment(s) have been marked as complete.`
        });
      }
    });
  };

  const handleBulkCancel = () => {
    setModalContent({
      type: 'confirm',
      title: 'Cancel Appointments',
      message: `Cancel ${selectedAppointments.size} appointment(s)? This action cannot be undone.`,
      onConfirm: () => {
        setSelectedAppointments(new Set());
        setModalContent({
          type: 'success',
          title: 'Appointments Cancelled',
          message: `${selectedAppointments.size} appointment(s) have been cancelled.`
        });
      }
    });
  };

  return (
    <div className="animate-fade-in"> {/* 1. Page Fade In Animation */}
      
      <div className="page-header">
        <div>
          <h2 className="page-title">Appointments</h2>
          <p style={{color: 'var(--text-light)', fontSize: '0.9rem'}}>Manage your schedule</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
          <Plus size={18} /> New Appointment
        </button>
      </div>

      <div className="dashboard-container"> {/* 2. Split Layout */}
        
        {/* LEFT COLUMN: CALENDAR */}
        <div className="left-col animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CalendarWidget />
        </div>

        {/* RIGHT COLUMN: APPOINTMENT LIST */}
        <div className="right-col animate-slide-up" style={{ animationDelay: '0.2s' }}>
          
          {/* Search & Filters (upper right) */}
          <div className="dashboard-filters-card">
            <h4 className="dashboard-filters-title">Search &amp; Filters</h4>
            <div className="dashboard-filters-row">
              <div className="dashboard-filter-group" style={{flex: 1, minWidth: '220px'}}>
                <label>Search</label>
                <div style={{position: 'relative'}}>
                  <Search size={16} style={{position: 'absolute', left: '10px', top: '8px', color: 'var(--text-light)'}} />
                  <input
                    type="text"
                    placeholder="Search patients, types, notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{width: '100%', padding: '8px 12px 8px 36px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.85rem'}}
                  />
                </div>
              </div>
              <div className="dashboard-filter-group">
                <label>Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="dashboard-filter-group">
                <label>Time Range</label>
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                >
                  <option value="all">All Day</option>
                  <option value="morning">Morning (6AM-12PM)</option>
                  <option value="afternoon">Afternoon (12PM-6PM)</option>
                  <option value="evening">Evening (6PM+)</option>
                </select>
              </div>
              <div className="dashboard-filter-group">
                <label>Doctor</label>
                <select>
                  <option>All Doctors</option>
                  <option>Dr. Johnson</option>
                  <option>Dr. Davis</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bulk Actions Bar */}
          {selectedAppointments.size > 0 && (
            <div className="card" style={{ marginBottom: '1rem', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{fontSize: '0.9rem', fontWeight: '600'}}>
                {selectedAppointments.size} appointment{selectedAppointments.size > 1 ? 's' : ''} selected
              </span>
              <div style={{display: 'flex', gap: '0.5rem'}}>
                <button className="btn-outline" style={{padding:'4px 12px', fontSize:'0.8rem'}} onClick={handleBulkComplete}>
                  Mark Complete
                </button>
                <button className="btn-outline" style={{padding:'4px 12px', fontSize:'0.8rem', color: 'var(--danger)', borderColor: 'var(--danger)'}} onClick={handleBulkCancel}>
                  Cancel Selected
                </button>
              </div>
            </div>
          )}
          
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
              <table>
                <thead>
                  <tr>
                    <th style={{width: '40px'}}>
                      <input 
                        type="checkbox" 
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedAppointments(new Set(filteredAppointments.map(apt => apt.id)));
                          } else {
                            setSelectedAppointments(new Set());
                          }
                        }}
                        checked={selectedAppointments.size === filteredAppointments.length && filteredAppointments.length > 0}
                      />
                    </th>
                    <th>Time / Date</th>
                    <th>Patient Info</th>
                    <th>Doctor</th>
                    <th>Status</th>
                    <th style={{textAlign:'right'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{textAlign: 'center', padding: '3rem', color: 'var(--text-light)'}}>
                        <div style={{fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem'}}>No appointments found</div>
                        <div style={{fontSize: '0.9rem'}}>Try adjusting your search or filters</div>
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((apt) => (
                      <tr key={apt.id} style={{backgroundColor: selectedAppointments.has(apt.id) ? '#f0f9ff' : 'transparent'}}>
                        <td>
                          <input 
                            type="checkbox" 
                            checked={selectedAppointments.has(apt.id)}
                            onChange={() => toggleSelection(apt.id)}
                          />
                        </td>
                        <td style={{ fontWeight: '600', color: 'var(--primary-color)' }}>
                          <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
                            <Clock size={14}/> {apt.time}
                          </div>
                          <div style={{fontSize:'0.75rem', color:'var(--text-light)', marginLeft:'20px'}}>
                            {apt.duration} • Today
                          </div>
                        </td>
                        <td>
                          <div style={{fontWeight:'600'}}>{apt.patient}</div>
                          <div style={{fontSize:'0.8rem', color:'var(--text-light)', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px'}}>
                            <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                              <Phone size={12}/> {apt.phone}
                            </span>
                            <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                              <Mail size={12}/> {apt.email}
                            </span>
                          </div>
                          <div style={{fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '2px'}}>
                            {apt.notes}
                          </div>
                        </td>
                        <td style={{color:'var(--text-light)'}}>{apt.doc}</td>
                        <td>
                          <span className={`badge ${
                            apt.status === 'Confirmed' ? 'badge-green' : 
                            apt.status === 'Pending' ? 'badge-blue' : ''
                          }`} style={{
                            background: apt.status === 'Completed' ? '#f1f5f9' : undefined,
                            color: apt.status === 'Completed' ? '#64748b' : undefined,
                            display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content'
                          }}>
                            {apt.status === 'Confirmed' && <CheckCircle size={12}/>}
                            {apt.status === 'Pending' && <Clock size={12}/>}
                            {apt.status === 'Completed' && <Calendar size={12}/>}
                            {apt.status}
                          </span>
                        </td>
                        <td style={{textAlign:'right'}}>
                          <div style={{display: 'flex', gap: '6px', justifyContent: 'flex-end'}}>
                            <button className="btn-outline" style={{padding:'4px 8px', fontSize:'0.8rem', display: 'flex', alignItems: 'center', gap: '4px'}} onClick={() => handleViewAppointment(apt)}>
                              <Eye size={14}/> View
                            </button>
                            <button className="btn-outline" style={{padding:'4px 8px', fontSize:'0.8rem', display: 'flex', alignItems: 'center', gap: '4px'}} onClick={() => handleRescheduleAppointment(apt)}>
                              <Calendar size={14}/> Reschedule
                            </button>
                            <button className="btn-outline" style={{padding:'4px 8px', fontSize:'0.8rem', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--danger)', borderColor: 'var(--danger)'}} onClick={() => handleCancelAppointment(apt)}>
                              <XCircle size={14}/> Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* Custom Modal */}
      {modalContent && (
        <div
          className="modal-backdrop"
          onClick={() => setModalContent(null)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalContent(null)}
              className="modal-close"
            >
              <X size={18} />
            </button>

            <div className="modal-header">
              {modalContent.type === 'confirm' && (
                <div className="modal-icon confirm">
                  <AlertCircle size={20} />
                </div>
              )}
              {modalContent.type === 'success' && (
                <div className="modal-icon success">
                  <CheckCircle size={20} />
                </div>
              )}
              <h3 className="modal-title">{modalContent.title}</h3>
            </div>

            <div className="modal-body">
              {modalContent.type === 'view' && (
                <div className="modal-content-view">{modalContent.content}</div>
              )}

              {modalContent.type === 'confirm' && (
                <p className="modal-text">{modalContent.message}</p>
              )}

              {modalContent.type === 'success' && (
                <p className="modal-text success">{modalContent.message}</p>
              )}
            </div>

            {modalContent.type === 'confirm' && (
              <div className="modal-actions">
                <button
                  onClick={() => setModalContent(null)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={modalContent.onConfirm}
                  className="btn-primary"
                >
                  Confirm
                </button>
              </div>
            )}

            {modalContent.type === 'success' && (
              <div className="modal-actions">
                <button
                  onClick={() => setModalContent(null)}
                  className="btn-primary"
                >
                  OK
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}