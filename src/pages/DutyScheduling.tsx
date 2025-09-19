import React, { useState } from 'react'
import './DutyScheduling.css'

interface DutySchedule {
  id: string
  dutyNumber: string
  route: string
  shift: 'morning' | 'afternoon' | 'night'
  startTime: string
  endTime: string
  driverId?: string
  driverName?: string
  conductorId?: string
  conductorName?: string
  busNumber?: string
  date: string
  status: 'scheduled' | 'active' | 'completed' | 'cancelled'
  breakTime: string
  totalHours: number
  restPeriod: number // hours
}

interface CrewMember {
  id: string
  employeeId: string
  name: string
  role: 'driver' | 'conductor'
  shift: 'morning' | 'afternoon' | 'night'
  status: 'available' | 'assigned' | 'on-break' | 'off-duty'
}

export const DutyScheduling: React.FC = () => {
  const [duties, setDuties] = useState<DutySchedule[]>([
    {
      id: '1',
      dutyNumber: 'D001',
      route: 'Route 45',
      shift: 'morning',
      startTime: '06:00',
      endTime: '14:00',
      driverId: 'DTC001',
      driverName: 'Raj Kumar Singh',
      conductorId: 'DTC002',
      conductorName: 'Amit Singh Rawat',
      busNumber: 'DL-1PC-1234',
      date: '2025-09-19',
      status: 'active',
      breakTime: '10:00-10:30',
      totalHours: 8,
      restPeriod: 16
    },
    {
      id: '2',
      dutyNumber: 'D002',
      route: 'Route 67',
      shift: 'afternoon',
      startTime: '14:00',
      endTime: '22:00',
      driverId: 'DTC003',
      driverName: 'Suresh Yadav',
      conductorId: 'DTC006',
      conductorName: 'Ravi Sharma',
      busNumber: 'DL-1PC-9012',
      date: '2025-09-19',
      status: 'scheduled',
      breakTime: '18:00-18:30',
      totalHours: 8,
      restPeriod: 10
    },
    {
      id: '3',
      dutyNumber: 'D003',
      route: 'Route 23',
      shift: 'night',
      startTime: '22:00',
      endTime: '06:00',
      date: '2025-09-19',
      status: 'scheduled',
      breakTime: '02:00-02:30',
      totalHours: 8,
      restPeriod: 16
    }
  ])

  const [availableCrew] = useState<CrewMember[]>([
    { id: 'DTC001', employeeId: 'DTC001', name: 'Raj Kumar Singh', role: 'driver', shift: 'morning', status: 'assigned' },
    { id: 'DTC002', employeeId: 'DTC002', name: 'Amit Singh Rawat', role: 'conductor', shift: 'morning', status: 'assigned' },
    { id: 'DTC003', employeeId: 'DTC003', name: 'Suresh Yadav', role: 'driver', shift: 'afternoon', status: 'assigned' },
    { id: 'DTC004', employeeId: 'DTC004', name: 'Priya Sharma', role: 'conductor', shift: 'morning', status: 'available' },
    { id: 'DTC005', employeeId: 'DTC005', name: 'Mohammed Ali', role: 'driver', shift: 'night', status: 'available' },
    { id: 'DTC006', employeeId: 'DTC006', name: 'Ravi Sharma', role: 'conductor', shift: 'afternoon', status: 'assigned' },
    { id: 'DTC007', employeeId: 'DTC007', name: 'Anjali Verma', role: 'conductor', shift: 'night', status: 'available' },
    { id: 'DTC008', employeeId: 'DTC008', name: 'Vikram Singh', role: 'driver', shift: 'morning', status: 'available' }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingDuty, setEditingDuty] = useState<DutySchedule | null>(null)
  const [formData, setFormData] = useState<Partial<DutySchedule>>({})
  const [selectedDate, setSelectedDate] = useState('2025-09-19')
  const [selectedShift, setSelectedShift] = useState<'all' | 'morning' | 'afternoon' | 'night'>('all')
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')

  const handleAddNew = () => {
    setFormData({ date: selectedDate })
    setEditingDuty(null)
    setShowAddForm(true)
  }

  const handleEdit = (duty: DutySchedule) => {
    setFormData(duty)
    setEditingDuty(duty)
    setShowAddForm(true)
  }

  const handleDelete = (dutyId: string) => {
    if (window.confirm('Are you sure you want to delete this duty schedule?')) {
      setDuties(duties.filter(duty => duty.id !== dutyId))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const calculateHours = (start: string, end: string) => {
      const startTime = new Date(`2000-01-01 ${start}`)
      const endTime = new Date(`2000-01-01 ${end}`)
      if (endTime < startTime) endTime.setDate(endTime.getDate() + 1)
      return Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60))
    }

    if (editingDuty) {
      setDuties(duties.map(duty => 
        duty.id === editingDuty.id ? { 
          ...duty, 
          ...formData,
          totalHours: calculateHours(formData.startTime || duty.startTime, formData.endTime || duty.endTime)
        } : duty
      ))
    } else {
      const newDuty: DutySchedule = {
        id: Date.now().toString(),
        dutyNumber: formData.dutyNumber || `D${String(duties.length + 1).padStart(3, '0')}`,
        route: formData.route || '',
        shift: formData.shift || 'morning',
        startTime: formData.startTime || '06:00',
        endTime: formData.endTime || '14:00',
        driverId: formData.driverId,
        driverName: formData.driverName,
        conductorId: formData.conductorId,
        conductorName: formData.conductorName,
        busNumber: formData.busNumber,
        date: formData.date || selectedDate,
        status: 'scheduled',
        breakTime: formData.breakTime || '10:00-10:30',
        totalHours: calculateHours(formData.startTime || '06:00', formData.endTime || '14:00'),
        restPeriod: formData.restPeriod || 16
      }
      setDuties([...duties, newDuty])
    }
    
    setShowAddForm(false)
    setFormData({})
    setEditingDuty(null)
  }

  const handleInputChange = (field: keyof DutySchedule, value: string | number) => {
    if (field === 'driverId') {
      const driver = availableCrew.find(c => c.id === value && c.role === 'driver')
      setFormData({ 
        ...formData, 
        driverId: value as string,
        driverName: driver?.name || ''
      })
    } else if (field === 'conductorId') {
      const conductor = availableCrew.find(c => c.id === value && c.role === 'conductor')
      setFormData({ 
        ...formData, 
        conductorId: value as string,
        conductorName: conductor?.name || ''
      })
    } else {
      setFormData({ ...formData, [field]: value })
    }
  }

  const updateDutyStatus = (dutyId: string, status: DutySchedule['status']) => {
    setDuties(duties.map(duty => 
      duty.id === dutyId ? { ...duty, status } : duty
    ))
  }

  const autoAssignCrew = (dutyId: string) => {
    const duty = duties.find(d => d.id === dutyId)
    if (!duty) return

    const availableDrivers = availableCrew.filter(c => 
      c.role === 'driver' && 
      c.shift === duty.shift && 
      c.status === 'available'
    )
    
    const availableConductors = availableCrew.filter(c => 
      c.role === 'conductor' && 
      c.shift === duty.shift && 
      c.status === 'available'
    )

    if (availableDrivers.length > 0 && availableConductors.length > 0) {
      const driver = availableDrivers[0]
      const conductor = availableConductors[0]
      
      setDuties(duties.map(d => 
        d.id === dutyId ? {
          ...d,
          driverId: driver.id,
          driverName: driver.name,
          conductorId: conductor.id,
          conductorName: conductor.name
        } : d
      ))
      
      alert(`Auto-assigned: Driver ${driver.name} and Conductor ${conductor.name}`)
    } else {
      alert('No available crew for this shift')
    }
  }

  const generateWeeklySchedule = () => {
    const today = new Date(selectedDate)
    const weekDays = []
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(today)
      day.setDate(today.getDate() + i)
      weekDays.push(day.toISOString().split('T')[0])
    }
    
    // Simple auto-generation logic
    const routes = ['Route 45', 'Route 67', 'Route 23', 'Route 89', 'Route 12']
    const shifts: DutySchedule['shift'][] = ['morning', 'afternoon', 'night']
    
    const newDuties: DutySchedule[] = []
    let dutyCounter = duties.length + 1
    
    weekDays.forEach(date => {
      shifts.forEach(shift => {
        routes.forEach(route => {
          const shiftTimes = {
            morning: { start: '06:00', end: '14:00', break: '10:00-10:30' },
            afternoon: { start: '14:00', end: '22:00', break: '18:00-18:30' },
            night: { start: '22:00', end: '06:00', break: '02:00-02:30' }
          }
          
          newDuties.push({
            id: Date.now().toString() + dutyCounter,
            dutyNumber: `D${String(dutyCounter).padStart(3, '0')}`,
            route,
            shift,
            startTime: shiftTimes[shift].start,
            endTime: shiftTimes[shift].end,
            date,
            status: 'scheduled',
            breakTime: shiftTimes[shift].break,
            totalHours: 8,
            restPeriod: shift === 'night' ? 16 : 16
          })
          dutyCounter++
        })
      })
    })
    
    setDuties([...duties, ...newDuties])
    alert(`Generated ${newDuties.length} duty schedules for the week!`)
  }

  const filteredDuties = duties.filter(duty => {
    const dateMatch = duty.date === selectedDate
    const shiftMatch = selectedShift === 'all' || duty.shift === selectedShift
    return dateMatch && shiftMatch
  })

  const stats = {
    totalDuties: filteredDuties.length,
    scheduled: filteredDuties.filter(d => d.status === 'scheduled').length,
    active: filteredDuties.filter(d => d.status === 'active').length,
    completed: filteredDuties.filter(d => d.status === 'completed').length,
    unassigned: filteredDuties.filter(d => !d.driverId || !d.conductorId).length,
    totalHours: filteredDuties.reduce((sum, d) => sum + d.totalHours, 0)
  }

  return (
    <div className="duty-scheduling">
      <div className="duty-header">
        <h1>Duty Scheduling</h1>
        <div className="duty-actions">
          <button className="btn btn-primary" onClick={handleAddNew}>
            Create New Duty
          </button>
          <button className="btn btn-secondary" onClick={generateWeeklySchedule}>
            Generate Weekly Schedule
          </button>
          <button className="btn btn-info">
            Optimize Schedule
          </button>
        </div>
      </div>

      <div className="duty-controls">
        <div className="control-group">
          <label>Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div className="control-group">
          <label>Filter by Shift:</label>
          <select value={selectedShift} onChange={(e) => setSelectedShift(e.target.value as typeof selectedShift)}>
            <option value="all">All Shifts</option>
            <option value="morning">Morning (6 AM - 2 PM)</option>
            <option value="afternoon">Afternoon (2 PM - 10 PM)</option>
            <option value="night">Night (10 PM - 6 AM)</option>
          </select>
        </div>
        <div className="control-group">
          <label>View Mode:</label>
          <select value={viewMode} onChange={(e) => setViewMode(e.target.value as typeof viewMode)}>
            <option value="list">List View</option>
            <option value="calendar">Calendar View</option>
          </select>
        </div>
      </div>

      <div className="duty-stats">
        <div className="stat-card">
          <h3>Total Duties</h3>
          <p className="stat-number">{stats.totalDuties}</p>
        </div>
        <div className="stat-card">
          <h3>Scheduled</h3>
          <p className="stat-number">{stats.scheduled}</p>
        </div>
        <div className="stat-card">
          <h3>Active</h3>
          <p className="stat-number">{stats.active}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat-number">{stats.completed}</p>
        </div>
        <div className="stat-card">
          <h3>Unassigned</h3>
          <p className="stat-number">{stats.unassigned}</p>
        </div>
        <div className="stat-card">
          <h3>Total Hours</h3>
          <p className="stat-number">{stats.totalHours}</p>
        </div>
      </div>

      {showAddForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h3>{editingDuty ? 'Edit Duty Schedule' : 'Create New Duty Schedule'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Duty Number:</label>
                  <input
                    type="text"
                    value={formData.dutyNumber || ''}
                    onChange={(e) => handleInputChange('dutyNumber', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Route:</label>
                  <input
                    type="text"
                    value={formData.route || ''}
                    onChange={(e) => handleInputChange('route', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Date:</label>
                  <input
                    type="date"
                    value={formData.date || ''}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Shift:</label>
                  <select
                    value={formData.shift || 'morning'}
                    onChange={(e) => handleInputChange('shift', e.target.value as DutySchedule['shift'])}
                  >
                    <option value="morning">Morning (6 AM - 2 PM)</option>
                    <option value="afternoon">Afternoon (2 PM - 10 PM)</option>
                    <option value="night">Night (10 PM - 6 AM)</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Start Time:</label>
                  <input
                    type="time"
                    value={formData.startTime || ''}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>End Time:</label>
                  <input
                    type="time"
                    value={formData.endTime || ''}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Assign Driver:</label>
                  <select
                    value={formData.driverId || ''}
                    onChange={(e) => handleInputChange('driverId', e.target.value)}
                  >
                    <option value="">Select Driver</option>
                    {availableCrew.filter(c => c.role === 'driver').map(driver => (
                      <option key={driver.id} value={driver.id}>
                        {driver.name} ({driver.employeeId}) - {driver.shift}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Assign Conductor:</label>
                  <select
                    value={formData.conductorId || ''}
                    onChange={(e) => handleInputChange('conductorId', e.target.value)}
                  >
                    <option value="">Select Conductor</option>
                    {availableCrew.filter(c => c.role === 'conductor').map(conductor => (
                      <option key={conductor.id} value={conductor.id}>
                        {conductor.name} ({conductor.employeeId}) - {conductor.shift}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Bus Number:</label>
                  <input
                    type="text"
                    value={formData.busNumber || ''}
                    onChange={(e) => handleInputChange('busNumber', e.target.value)}
                    placeholder="e.g., DL-1PC-1234"
                  />
                </div>
                <div className="form-group">
                  <label>Break Time:</label>
                  <input
                    type="text"
                    value={formData.breakTime || ''}
                    onChange={(e) => handleInputChange('breakTime', e.target.value)}
                    placeholder="e.g., 10:00-10:30"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingDuty ? 'Update' : 'Create'} Duty
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div className="duty-table">
        <table className="duty-table-element">
          <thead>
            <tr>
              <th>Duty #</th>
              <th>Route</th>
              <th>Shift</th>
              <th>Time</th>
              <th>Driver</th>
              <th>Conductor</th>
              <th>Bus</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDuties.map((duty) => (
              <tr key={duty.id}>
                <td>{duty.dutyNumber}</td>
                <td>{duty.route}</td>
                <td>
                  <span className={`shift-badge shift-${duty.shift}`}>
                    {duty.shift}
                  </span>
                </td>
                <td>{duty.startTime} - {duty.endTime}</td>
                <td>{duty.driverName || 'Unassigned'}</td>
                <td>{duty.conductorName || 'Unassigned'}</td>
                <td>{duty.busNumber || '-'}</td>
                <td>
                  <span className={`status status-${duty.status}`}>
                    {duty.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleEdit(duty)}
                  >
                    Edit
                  </button>
                  {(!duty.driverId || !duty.conductorId) && (
                    <button 
                      className="btn btn-sm btn-info"
                      onClick={() => autoAssignCrew(duty.id)}
                    >
                      Auto Assign
                    </button>
                  )}
                  {duty.status === 'scheduled' && (
                    <button 
                      className="btn btn-sm btn-warning"
                      onClick={() => updateDutyStatus(duty.id, 'active')}
                    >
                      Start
                    </button>
                  )}
                  {duty.status === 'active' && (
                    <button 
                      className="btn btn-sm btn-edit"
                      onClick={() => updateDutyStatus(duty.id, 'completed')}
                    >
                      Complete
                    </button>
                  )}
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(duty.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}