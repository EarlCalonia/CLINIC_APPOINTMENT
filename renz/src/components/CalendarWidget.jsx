import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarWidget() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10)); // November 2025
  const [selectedDay, setSelectedDay] = useState(19);
  
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptySlots = Array.from({ length: firstDayOfMonth }); 
  const apptDays = [5, 12, 15, 19, 24]; 

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];

  const navigateMonth = (direction) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDay(today.getDate());
  };

  return (
    <div className="calendar-widget card" style={{ transition: 'transform 0.2s' }}>
      <div className="cal-header">
        <span style={{color: 'var(--primary-color)', fontSize:'1.1rem', fontWeight: '600'}}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <div style={{ display: 'flex', gap: '5px' }}>
          <button 
            onClick={goToToday}
            style={{background:'var(--accent-color)', border:'none', cursor:'pointer', padding:'4px 8px', borderRadius:'4px', color:'white', fontSize:'0.75rem', fontWeight:'600'}}
          >
            Today
          </button>
          <button 
            onClick={() => navigateMonth(-1)}
            style={{background:'none', border:'none', cursor:'pointer', padding:'4px', borderRadius:'4px', display:'flex'}}
            className="hover:bg-blue-50"
          >
            <ChevronLeft size={20} color="var(--text-light)"/>
          </button>
          <button 
            onClick={() => navigateMonth(1)}
            style={{background:'none', border:'none', cursor:'pointer', padding:'4px', borderRadius:'4px', display:'flex'}}
          >
            <ChevronRight size={20} color="var(--text-light)"/>
          </button>
        </div>
      </div>

      <div className="cal-grid">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
          <div key={d} className="day-name">{d}</div>
        ))}
        {emptySlots.map((_, i) => <div key={`empty-${i}`} className="day-cell empty"></div>)}
        {days.map(day => (
          <div 
            key={day} 
            className={`day-cell 
              ${day === selectedDay ? 'active' : ''} 
              ${apptDays.includes(day) ? 'has-appt' : ''}
            `}
            onClick={() => setSelectedDay(day)}
            style={{cursor: 'pointer'}}
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Quick Stats */}
      <div style={{marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', fontSize: '0.8rem'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '4px'}}>
          <span style={{color: 'var(--text-light)'}}>Total Appointments:</span>
          <span style={{fontWeight: '600', color: 'var(--primary-color)'}}>{apptDays.length}</span>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <span style={{color: 'var(--text-light)'}}>Selected:</span>
          <span style={{fontWeight: '600'}}>{selectedDay ? `Nov ${selectedDay}` : 'None'}</span>
        </div>
      </div>
    </div>
  );
}