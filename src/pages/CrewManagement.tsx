import React, { useState } from 'react'
import './CrewManagement.css'

interface CrewMember {
  id: string
  employeeId: string
  name: string
  role: 'driver' | 'conductor'
  phone: string
  email: string
  licenseNumber?: string
  licenseExpiry?: string
  joiningDate: string
  status: 'active' | 'inactive' | 'on-leave' | 'training'
  assignedRoute?: string
  shift: 'morning' | 'afternoon' | 'night'
  experience: number // years
  rating: number // 1-5
}

export const CrewManagement: React.FC = () => {
  const [crewMembers, setCrewMembers] = useState<CrewMember[]>([
    {
      id: '1',
      employeeId: 'DTC001',
      name: 'Raj Kumar Singh',
      role: 'driver',
      phone: '+91-9876543210',
      email: 'raj.kumar@dtc.gov.in',
      licenseNumber: 'DL-0120110012345',
      licenseExpiry: '2026-03-15',
      joiningDate: '2020-01-15',
      status: 'active',
      assignedRoute: 'Route 45',
      shift: 'morning',
      experience: 8,
      rating: 4.5
    },
    {
      id: '2',
      employeeId: 'DTC002',
      name: 'Amit Singh Rawat',
      role: 'conductor',
      phone: '+91-9876543211',
      email: 'amit.singh@dtc.gov.in',
      joiningDate: '2021-06-10',
      status: 'active',
      assignedRoute: 'Route 45',
      shift: 'morning',
      experience: 3,
      rating: 4.2
    },
    {
      id: '3',
      employeeId: 'DTC003',
      name: 'Suresh Yadav',
      role: 'driver',
      phone: '+91-9876543212',
      email: 'suresh.yadav@dtc.gov.in',
      licenseNumber: 'DL-0120110012346',
      licenseExpiry: '2025-12-20',
      joiningDate: '2019-03-22',
      status: 'active',
      assignedRoute: 'Route 67',
      shift: 'afternoon',
      experience: 12,
      rating: 4.8
    },
    {
      id: '4',
      employeeId: 'DTC004',
      name: 'Priya Sharma',
      role: 'conductor',
      phone: '+91-9876543213',
      email: 'priya.sharma@dtc.gov.in',
      joiningDate: '2022-09-05',
      status: 'training',
      shift: 'morning',
      experience: 1,
      rating: 3.8
    },
    {
      id: '5',
      employeeId: 'DTC005',
      name: 'Mohammed Ali',
      role: 'driver',
      phone: '+91-9876543214',
      email: 'mohammed.ali@dtc.gov.in',
      licenseNumber: 'DL-0120110012347',
      licenseExpiry: '2024-08-10',
      joiningDate: '2018-11-12',
      status: 'on-leave',
      assignedRoute: 'Route 23',
      shift: 'night',
      experience: 15,
      rating: 4.6
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCrew, setEditingCrew] = useState<CrewMember | null>(null)
  const [formData, setFormData] = useState<Partial<CrewMember>>({})
  const [selectedCrew, setSelectedCrew] = useState<CrewMember | null>(null)
  const [filterRole, setFilterRole] = useState<'all' | 'driver' | 'conductor'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | CrewMember['status']>('all')

  const handleAddNew = () => {
    setFormData({})
    setEditingCrew(null)
    setShowAddForm(true)
  }

  const handleEdit = (crew: CrewMember) => {
    setFormData(crew)
    setEditingCrew(crew)
    setShowAddForm(true)
  }

  const handleDelete = (crewId: string) => {
    if (window.confirm('Are you sure you want to remove this crew member?')) {
      setCrewMembers(crewMembers.filter(crew => crew.id !== crewId))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingCrew) {
      setCrewMembers(crewMembers.map(crew => 
        crew.id === editingCrew.id ? { ...crew, ...formData } : crew
      ))
    } else {
      const newCrew: CrewMember = {
        id: Date.now().toString(),
        employeeId: formData.employeeId || '',
        name: formData.name || '',
        role: formData.role || 'conductor',
        phone: formData.phone || '',
        email: formData.email || '',
        licenseNumber: formData.licenseNumber,
        licenseExpiry: formData.licenseExpiry,
        joiningDate: formData.joiningDate || new Date().toISOString().split('T')[0],
        status: formData.status || 'active',
        assignedRoute: formData.assignedRoute,
        shift: formData.shift || 'morning',
        experience: formData.experience || 0,
        rating: formData.rating || 3.0
      }
      setCrewMembers([...crewMembers, newCrew])
    }
    
    setShowAddForm(false)
    setFormData({})
    setEditingCrew(null)
  }

  const handleInputChange = (field: keyof CrewMember, value: string | number) => {
    setFormData({ ...formData, [field]: value })
  }

  const viewCrewDetails = (crew: CrewMember) => {
    setSelectedCrew(crew)
  }

  const updateStatus = (crewId: string, status: CrewMember['status']) => {
    setCrewMembers(crewMembers.map(crew => 
      crew.id === crewId ? { ...crew, status } : crew
    ))
  }

  const filteredCrew = crewMembers.filter(crew => {
    const roleMatch = filterRole === 'all' || crew.role === filterRole
    const statusMatch = filterStatus === 'all' || crew.status === filterStatus
    return roleMatch && statusMatch
  })

  const getExpiringLicenses = () => {
    const oneMonthFromNow = new Date()
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1)
    
    return crewMembers.filter(crew => 
      crew.role === 'driver' && 
      crew.licenseExpiry && 
      new Date(crew.licenseExpiry) <= oneMonthFromNow
    )
  }

  const stats = {
    totalCrew: crewMembers.length,
    drivers: crewMembers.filter(c => c.role === 'driver').length,
    conductors: crewMembers.filter(c => c.role === 'conductor').length,
    activeCrew: crewMembers.filter(c => c.status === 'active').length,
    onLeave: crewMembers.filter(c => c.status === 'on-leave').length,
    inTraining: crewMembers.filter(c => c.status === 'training').length,
    expiringLicenses: getExpiringLicenses().length
  }

  return (
    <div className="crew-management">
      <div className="crew-header">
        <h1>Crew Management</h1>
        <div className="crew-actions">
          <button className="btn btn-primary" onClick={handleAddNew}>
            Add New Crew
          </button>
          <button className="btn btn-secondary">
            Import Crew Data
          </button>
          <button className="btn btn-warning">
            License Alerts ({stats.expiringLicenses})
          </button>
        </div>
      </div>

      <div className="crew-stats">
        <div className="stat-card">
          <h3>Total Crew</h3>
          <p className="stat-number">{stats.totalCrew}</p>
        </div>
        <div className="stat-card">
          <h3>Drivers</h3>
          <p className="stat-number">{stats.drivers}</p>
        </div>
        <div className="stat-card">
          <h3>Conductors</h3>
          <p className="stat-number">{stats.conductors}</p>
        </div>
        <div className="stat-card">
          <h3>Active</h3>
          <p className="stat-number">{stats.activeCrew}</p>
        </div>
        <div className="stat-card">
          <h3>On Leave</h3>
          <p className="stat-number">{stats.onLeave}</p>
        </div>
        <div className="stat-card">
          <h3>In Training</h3>
          <p className="stat-number">{stats.inTraining}</p>
        </div>
      </div>

      <div className="crew-filters">
        <div className="filter-group">
          <label>Filter by Role:</label>
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value as typeof filterRole)}>
            <option value="all">All Roles</option>
            <option value="driver">Drivers</option>
            <option value="conductor">Conductors</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Filter by Status:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on-leave">On Leave</option>
            <option value="training">Training</option>
          </select>
        </div>
      </div>

      {showAddForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h3>{editingCrew ? 'Edit Crew Member' : 'Add New Crew Member'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Employee ID:</label>
                  <input
                    type="text"
                    value={formData.employeeId || ''}
                    onChange={(e) => handleInputChange('employeeId', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Full Name:</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Role:</label>
                  <select
                    value={formData.role || 'conductor'}
                    onChange={(e) => handleInputChange('role', e.target.value as CrewMember['role'])}
                  >
                    <option value="driver">Driver</option>
                    <option value="conductor">Conductor</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Shift:</label>
                  <select
                    value={formData.shift || 'morning'}
                    onChange={(e) => handleInputChange('shift', e.target.value as CrewMember['shift'])}
                  >
                    <option value="morning">Morning (6 AM - 2 PM)</option>
                    <option value="afternoon">Afternoon (2 PM - 10 PM)</option>
                    <option value="night">Night (10 PM - 6 AM)</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              {formData.role === 'driver' && (
                <div className="form-row">
                  <div className="form-group">
                    <label>License Number:</label>
                    <input
                      type="text"
                      value={formData.licenseNumber || ''}
                      onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>License Expiry:</label>
                    <input
                      type="date"
                      value={formData.licenseExpiry || ''}
                      onChange={(e) => handleInputChange('licenseExpiry', e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label>Joining Date:</label>
                  <input
                    type="date"
                    value={formData.joiningDate || ''}
                    onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Experience (years):</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.experience || ''}
                    onChange={(e) => handleInputChange('experience', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Status:</label>
                  <select
                    value={formData.status || 'active'}
                    onChange={(e) => handleInputChange('status', e.target.value as CrewMember['status'])}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="on-leave">On Leave</option>
                    <option value="training">Training</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Assigned Route:</label>
                  <input
                    type="text"
                    value={formData.assignedRoute || ''}
                    onChange={(e) => handleInputChange('assignedRoute', e.target.value)}
                    placeholder="e.g., Route 45"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingCrew ? 'Update' : 'Add'} Crew Member
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

      {selectedCrew && (
        <div className="form-overlay">
          <div className="crew-details-container">
            <h3>Crew Details: {selectedCrew.name}</h3>
            <div className="crew-info">
              <div className="info-grid">
                <div><strong>Employee ID:</strong> {selectedCrew.employeeId}</div>
                <div><strong>Role:</strong> {selectedCrew.role}</div>
                <div><strong>Phone:</strong> {selectedCrew.phone}</div>
                <div><strong>Email:</strong> {selectedCrew.email}</div>
                <div><strong>Shift:</strong> {selectedCrew.shift}</div>
                <div><strong>Experience:</strong> {selectedCrew.experience} years</div>
                <div><strong>Rating:</strong> ⭐ {selectedCrew.rating}/5</div>
                <div><strong>Status:</strong> <span className={`status status-${selectedCrew.status}`}>{selectedCrew.status}</span></div>
                {selectedCrew.licenseNumber && (
                  <>
                    <div><strong>License:</strong> {selectedCrew.licenseNumber}</div>
                    <div><strong>License Expiry:</strong> {selectedCrew.licenseExpiry}</div>
                  </>
                )}
                <div><strong>Joining Date:</strong> {selectedCrew.joiningDate}</div>
                <div><strong>Assigned Route:</strong> {selectedCrew.assignedRoute || 'Not assigned'}</div>
              </div>
            </div>
            <div className="crew-details-actions">
              <button className="btn btn-primary" onClick={() => setSelectedCrew(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="crew-table">
        <table className="crew-table-element">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Shift</th>
              <th>Route</th>
              <th>Status</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCrew.map((crew) => (
              <tr key={crew.id}>
                <td>{crew.employeeId}</td>
                <td>{crew.name}</td>
                <td>
                  <span className={`role-badge role-${crew.role}`}>
                    {crew.role}
                  </span>
                </td>
                <td>{crew.phone}</td>
                <td>{crew.shift}</td>
                <td>{crew.assignedRoute || '-'}</td>
                <td>
                  <span className={`status status-${crew.status}`}>
                    {crew.status}
                  </span>
                </td>
                <td>⭐ {crew.rating}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-info"
                    onClick={() => viewCrewDetails(crew)}
                  >
                    View
                  </button>
                  <button 
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleEdit(crew)}
                  >
                    Edit
                  </button>
                  {crew.status === 'active' && (
                    <button 
                      className="btn btn-sm btn-warning"
                      onClick={() => updateStatus(crew.id, 'on-leave')}
                    >
                      Leave
                    </button>
                  )}
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(crew.id)}
                  >
                    Remove
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