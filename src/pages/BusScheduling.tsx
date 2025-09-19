import React, { useState } from 'react'
import './BusScheduling.css'

interface Bus {
  id: string
  number: string
  route: string
  status: 'active' | 'maintenance' | 'idle'
  driver: string
  conductor: string
}

export const BusScheduling: React.FC = () => {
  const [buses, setBuses] = useState<Bus[]>([
    { id: '1', number: 'DL-1PC-1234', route: 'Route 45', status: 'active', driver: 'Raj Kumar', conductor: 'Amit Singh' },
    { id: '2', number: 'DL-1PC-5678', route: 'Route 23', status: 'maintenance', driver: '-', conductor: '-' },
    { id: '3', number: 'DL-1PC-9012', route: 'Route 67', status: 'active', driver: 'Suresh Yadav', conductor: 'Ravi Sharma' },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingBus, setEditingBus] = useState<Bus | null>(null)
  const [formData, setFormData] = useState<Partial<Bus>>({})

  const handleAddNew = () => {
    setFormData({})
    setEditingBus(null)
    setShowAddForm(true)
  }

  const handleEdit = (bus: Bus) => {
    setFormData(bus)
    setEditingBus(bus)
    setShowAddForm(true)
  }

  const handleRemove = (busId: string) => {
    if (window.confirm('Are you sure you want to remove this bus?')) {
      setBuses(buses.filter(bus => bus.id !== busId))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingBus) {
      // Update existing bus
      setBuses(buses.map(bus => 
        bus.id === editingBus.id ? { ...bus, ...formData } : bus
      ))
    } else {
      // Add new bus
      const newBus: Bus = {
        id: Date.now().toString(),
        number: formData.number || '',
        route: formData.route || '',
        status: formData.status || 'idle',
        driver: formData.driver || '-',
        conductor: formData.conductor || '-'
      }
      setBuses([...buses, newBus])
    }
    
    setShowAddForm(false)
    setFormData({})
    setEditingBus(null)
  }

  const handleInputChange = (field: keyof Bus, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <div className="bus-scheduling">
      <h1>Bus Scheduling</h1>
      <div className="controls">
        <button className="btn btn-primary" onClick={handleAddNew}>
          Add New Schedule
        </button>
        <button className="btn btn-secondary">Import Schedule</button>
      </div>

      {showAddForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h3>{editingBus ? 'Edit Bus' : 'Add New Bus'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Bus Number:</label>
                <input
                  type="text"
                  value={formData.number || ''}
                  onChange={(e) => handleInputChange('number', e.target.value)}
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
              <div className="form-group">
                <label>Status:</label>
                <select
                  value={formData.status || 'idle'}
                  onChange={(e) => handleInputChange('status', e.target.value as Bus['status'])}
                >
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="idle">Idle</option>
                </select>
              </div>
              <div className="form-group">
                <label>Driver:</label>
                <input
                  type="text"
                  value={formData.driver || ''}
                  onChange={(e) => handleInputChange('driver', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Conductor:</label>
                <input
                  type="text"
                  value={formData.conductor || ''}
                  onChange={(e) => handleInputChange('conductor', e.target.value)}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingBus ? 'Update' : 'Add'} Bus
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
      
      <div className="bus-list">
        <table className="bus-table">
          <thead>
            <tr>
              <th>Bus Number</th>
              <th>Route</th>
              <th>Status</th>
              <th>Driver</th>
              <th>Conductor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.id}>
                <td>{bus.number}</td>
                <td>{bus.route}</td>
                <td>
                  <span className={`status status-${bus.status}`}>
                    {bus.status}
                  </span>
                </td>
                <td>{bus.driver}</td>
                <td>{bus.conductor}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-info"
                    onClick={() => handleEdit(bus)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => handleRemove(bus.id)}
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