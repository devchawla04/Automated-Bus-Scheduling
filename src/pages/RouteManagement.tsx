import React, { useState } from 'react'
import './RouteManagement.css'

interface Route {
  id: string
  routeNumber: string
  routeName: string
  startPoint: string
  endPoint: string
  distance: number
  estimatedTime: number
  stops: string[]
  status: 'active' | 'inactive' | 'maintenance'
  assignedBuses: number
}

export const RouteManagement: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([
    {
      id: '1',
      routeNumber: 'R-001',
      routeName: 'Connaught Place - ISBT',
      startPoint: 'Connaught Place',
      endPoint: 'ISBT Kashmere Gate',
      distance: 12.5,
      estimatedTime: 45,
      stops: ['Connaught Place', 'Rajiv Chowk', 'Chandni Chowk', 'Red Fort', 'ISBT Kashmere Gate'],
      status: 'active',
      assignedBuses: 8
    },
    {
      id: '2',
      routeNumber: 'R-002',
      routeName: 'Delhi Gate - Nehru Place',
      startPoint: 'Delhi Gate',
      endPoint: 'Nehru Place',
      distance: 18.2,
      estimatedTime: 65,
      stops: ['Delhi Gate', 'ITO', 'Pragati Maidan', 'AIIMS', 'Green Park', 'Nehru Place'],
      status: 'active',
      assignedBuses: 12
    },
    {
      id: '3',
      routeNumber: 'R-003',
      routeName: 'Dwarka - Airport',
      startPoint: 'Dwarka Sector 21',
      endPoint: 'IGI Airport Terminal 3',
      distance: 8.5,
      estimatedTime: 25,
      stops: ['Dwarka Sector 21', 'Dwarka Sector 12', 'Dwarka Mor', 'IGI Airport Terminal 1', 'IGI Airport Terminal 3'],
      status: 'maintenance',
      assignedBuses: 0
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingRoute, setEditingRoute] = useState<Route | null>(null)
  const [formData, setFormData] = useState<Partial<Route>>({})
  const [newStop, setNewStop] = useState('')
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)

  const handleAddNew = () => {
    setFormData({})
    setEditingRoute(null)
    setShowAddForm(true)
  }

  const handleEdit = (route: Route) => {
    setFormData(route)
    setEditingRoute(route)
    setShowAddForm(true)
  }

  const handleDelete = (routeId: string) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      setRoutes(routes.filter(route => route.id !== routeId))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingRoute) {
      setRoutes(routes.map(route => 
        route.id === editingRoute.id ? { ...route, ...formData } : route
      ))
    } else {
      const newRoute: Route = {
        id: Date.now().toString(),
        routeNumber: formData.routeNumber || '',
        routeName: formData.routeName || '',
        startPoint: formData.startPoint || '',
        endPoint: formData.endPoint || '',
        distance: formData.distance || 0,
        estimatedTime: formData.estimatedTime || 0,
        stops: formData.stops || [],
        status: formData.status || 'inactive',
        assignedBuses: 0
      }
      setRoutes([...routes, newRoute])
    }
    
    setShowAddForm(false)
    setFormData({})
    setEditingRoute(null)
  }

  const handleInputChange = (field: keyof Route, value: string | number | string[]) => {
    setFormData({ ...formData, [field]: value })
  }

  const addStop = () => {
    if (newStop.trim()) {
      const currentStops = formData.stops || []
      setFormData({ ...formData, stops: [...currentStops, newStop.trim()] })
      setNewStop('')
    }
  }

  const removeStop = (index: number) => {
    const currentStops = formData.stops || []
    setFormData({ ...formData, stops: currentStops.filter((_, i) => i !== index) })
  }

  const optimizeRoute = (routeId: string) => {
    const route = routes.find(r => r.id === routeId)
    if (route) {
      // Simulate route optimization
      const optimizedTime = Math.max(20, route.estimatedTime - Math.floor(Math.random() * 10))
      setRoutes(routes.map(r => 
        r.id === routeId 
          ? { ...r, estimatedTime: optimizedTime }
          : r
      ))
      alert(`Route optimized! New estimated time: ${optimizedTime} minutes`)
    }
  }

  const viewRouteDetails = (route: Route) => {
    setSelectedRoute(route)
  }

  return (
    <div className="route-management">
      <div className="route-header">
        <h1>Route Management</h1>
        <div className="route-actions">
          <button className="btn btn-primary" onClick={handleAddNew}>
            Add New Route
          </button>
          <button className="btn btn-secondary">
            Import Routes
          </button>
          <button className="btn btn-info">
            Route Analytics
          </button>
        </div>
      </div>

      <div className="route-stats">
        <div className="stat-card">
          <h3>Total Routes</h3>
          <p className="stat-number">{routes.length}</p>
        </div>
        <div className="stat-card">
          <h3>Active Routes</h3>
          <p className="stat-number">{routes.filter(r => r.status === 'active').length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Distance</h3>
          <p className="stat-number">{routes.reduce((sum, r) => sum + r.distance, 0).toFixed(1)} km</p>
        </div>
        <div className="stat-card">
          <h3>Assigned Buses</h3>
          <p className="stat-number">{routes.reduce((sum, r) => sum + r.assignedBuses, 0)}</p>
        </div>
      </div>

      {showAddForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h3>{editingRoute ? 'Edit Route' : 'Add New Route'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Route Number:</label>
                  <input
                    type="text"
                    value={formData.routeNumber || ''}
                    onChange={(e) => handleInputChange('routeNumber', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Route Name:</label>
                  <input
                    type="text"
                    value={formData.routeName || ''}
                    onChange={(e) => handleInputChange('routeName', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Start Point:</label>
                  <input
                    type="text"
                    value={formData.startPoint || ''}
                    onChange={(e) => handleInputChange('startPoint', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>End Point:</label>
                  <input
                    type="text"
                    value={formData.endPoint || ''}
                    onChange={(e) => handleInputChange('endPoint', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Distance (km):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.distance || ''}
                    onChange={(e) => handleInputChange('distance', parseFloat(e.target.value))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Estimated Time (minutes):</label>
                  <input
                    type="number"
                    value={formData.estimatedTime || ''}
                    onChange={(e) => handleInputChange('estimatedTime', parseInt(e.target.value))}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Status:</label>
                <select
                  value={formData.status || 'inactive'}
                  onChange={(e) => handleInputChange('status', e.target.value as Route['status'])}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              <div className="form-group">
                <label>Route Stops:</label>
                <div className="stops-input">
                  <input
                    type="text"
                    value={newStop}
                    onChange={(e) => setNewStop(e.target.value)}
                    placeholder="Enter stop name"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addStop())}
                  />
                  <button type="button" className="btn btn-sm btn-secondary" onClick={addStop}>
                    Add Stop
                  </button>
                </div>
                <div className="stops-list">
                  {(formData.stops || []).map((stop, index) => (
                    <div key={index} className="stop-item">
                      <span>{index + 1}. {stop}</span>
                      <button 
                        type="button" 
                        className="btn btn-sm btn-danger"
                        onClick={() => removeStop(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingRoute ? 'Update' : 'Add'} Route
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

      {selectedRoute && (
        <div className="form-overlay">
          <div className="route-details-container">
            <h3>Route Details: {selectedRoute.routeName}</h3>
            <div className="route-info">
              <div className="info-grid">
                <div><strong>Route Number:</strong> {selectedRoute.routeNumber}</div>
                <div><strong>Distance:</strong> {selectedRoute.distance} km</div>
                <div><strong>Estimated Time:</strong> {selectedRoute.estimatedTime} minutes</div>
                <div><strong>Status:</strong> <span className={`status status-${selectedRoute.status}`}>{selectedRoute.status}</span></div>
                <div><strong>Assigned Buses:</strong> {selectedRoute.assignedBuses}</div>
              </div>
              <div className="stops-detail">
                <h4>Route Stops ({selectedRoute.stops.length})</h4>
                <ol>
                  {selectedRoute.stops.map((stop, index) => (
                    <li key={index}>{stop}</li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="route-details-actions">
              <button className="btn btn-primary" onClick={() => setSelectedRoute(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="routes-table">
        <table className="route-table">
          <thead>
            <tr>
              <th>Route Number</th>
              <th>Route Name</th>
              <th>Distance</th>
              <th>Est. Time</th>
              <th>Stops</th>
              <th>Status</th>
              <th>Buses</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route.id}>
                <td>{route.routeNumber}</td>
                <td>{route.routeName}</td>
                <td>{route.distance} km</td>
                <td>{route.estimatedTime} min</td>
                <td>{route.stops.length}</td>
                <td>
                  <span className={`status status-${route.status}`}>
                    {route.status}
                  </span>
                </td>
                <td>{route.assignedBuses}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-info"
                    onClick={() => viewRouteDetails(route)}
                  >
                    View
                  </button>
                  <button 
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleEdit(route)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-sm btn-warning"
                    onClick={() => optimizeRoute(route.id)}
                  >
                    Optimize
                  </button>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(route.id)}
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