import React, { useState } from 'react'
import Map from '../components/Map'
import './RouteVisualization.css'

interface BusLocation {
  id: string
  busNumber: string
  route: string
  latitude: number
  longitude: number
  status: 'active' | 'idle' | 'maintenance'
  speed?: number
  direction?: number
}

interface BusStop {
  id: string
  name: string
  latitude: number
  longitude: number
  routes: string[]
}

interface RouteData {
  id: string
  name: string
  coordinates: [number, number][]
  color: string
  stops: BusStop[]
}

export const RouteVisualization: React.FC = () => {
  // Sample Delhi bus routes with real coordinates
  const routes: RouteData[] = [
    {
      id: 'route-45',
      name: 'Route 45: Connaught Place - ISBT',
      color: '#007bff',
      coordinates: [
        [28.6315, 77.2167], // Connaught Place
        [28.6289, 77.2065], // Rajiv Chowk
        [28.6562, 77.2410], // Chandni Chowk
        [28.6562, 77.2410], // Red Fort
        [28.6667, 77.2299]  // ISBT Kashmere Gate
      ],
      stops: []
    },
    {
      id: 'route-67',
      name: 'Route 67: Delhi Gate - Nehru Place',
      color: '#28a745',
      coordinates: [
        [28.6389, 77.2445], // Delhi Gate
        [28.6280, 77.2419], // ITO
        [28.6139, 77.2673], // Pragati Maidan
        [28.5678, 77.2074], // AIIMS
        [28.5562, 77.2066], // Green Park
        [28.5494, 77.2507]  // Nehru Place
      ],
      stops: []
    },
    {
      id: 'route-23',
      name: 'Route 23: Dwarka - Airport',
      color: '#ffc107',
      coordinates: [
        [28.5921, 77.0460], // Dwarka Sector 21
        [28.5921, 77.0460], // Dwarka Sector 12
        [28.5729, 77.0479], // Dwarka Mor
        [28.5562, 77.0999], // IGI Airport Terminal 1
        [28.5562, 77.0999]  // IGI Airport Terminal 3
      ],
      stops: []
    }
  ]

  // Sample bus stops
  const busStops: BusStop[] = [
    { id: 'stop-1', name: 'Connaught Place', latitude: 28.6315, longitude: 77.2167, routes: ['Route 45'] },
    { id: 'stop-2', name: 'Rajiv Chowk Metro', latitude: 28.6289, longitude: 77.2065, routes: ['Route 45'] },
    { id: 'stop-3', name: 'Chandni Chowk', latitude: 28.6562, longitude: 77.2410, routes: ['Route 45'] },
    { id: 'stop-4', name: 'ISBT Kashmere Gate', latitude: 28.6667, longitude: 77.2299, routes: ['Route 45'] },
    { id: 'stop-5', name: 'Delhi Gate', latitude: 28.6389, longitude: 77.2445, routes: ['Route 67'] },
    { id: 'stop-6', name: 'ITO', latitude: 28.6280, longitude: 77.2419, routes: ['Route 67'] },
    { id: 'stop-7', name: 'AIIMS', latitude: 28.5678, longitude: 77.2074, routes: ['Route 67'] },
    { id: 'stop-8', name: 'Nehru Place', latitude: 28.5494, longitude: 77.2507, routes: ['Route 67'] },
    { id: 'stop-9', name: 'Dwarka Sector 21', latitude: 28.5921, longitude: 77.0460, routes: ['Route 23'] },
    { id: 'stop-10', name: 'IGI Airport T3', latitude: 28.5562, longitude: 77.0999, routes: ['Route 23'] }
  ]

  // Sample live bus locations
  const [busLocations] = useState<BusLocation[]>([
    { id: 'bus-1', busNumber: 'DL-1PC-1234', route: 'Route 45', latitude: 28.6315, longitude: 77.2167, status: 'active', speed: 25 },
    { id: 'bus-2', busNumber: 'DL-1PC-5678', route: 'Route 67', latitude: 28.6280, longitude: 77.2419, status: 'active', speed: 30 },
    { id: 'bus-3', busNumber: 'DL-1PC-9012', route: 'Route 23', latitude: 28.5921, longitude: 77.0460, status: 'idle', speed: 0 },
    { id: 'bus-4', busNumber: 'DL-1PC-3456', route: 'Route 45', latitude: 28.6562, longitude: 77.2410, status: 'active', speed: 20 },
    { id: 'bus-5', busNumber: 'DL-1PC-7890', route: 'Route 67', latitude: 28.5678, longitude: 77.2074, status: 'maintenance', speed: 0 }
  ])

  const [selectedRoute, setSelectedRoute] = useState<string>('all')
  const [showBuses, setShowBuses] = useState(true)
  const [showStops, setShowStops] = useState(true)
  const [showRoutes, setShowRoutes] = useState(true)

  const handleBusClick = (bus: BusLocation) => {
    alert(`Bus ${bus.busNumber} - ${bus.route}\nStatus: ${bus.status}\nSpeed: ${bus.speed || 0} km/h`)
  }

  const handleStopClick = (stop: BusStop) => {
    alert(`${stop.name}\nRoutes: ${stop.routes.join(', ')}`)
  }

  const filteredRoutes = selectedRoute === 'all' 
    ? routes 
    : routes.filter(route => route.name.includes(selectedRoute))

  const filteredBuses = selectedRoute === 'all'
    ? busLocations
    : busLocations.filter(bus => bus.route.includes(selectedRoute))

  const filteredStops = selectedRoute === 'all'
    ? busStops
    : busStops.filter(stop => stop.routes.some(route => route.includes(selectedRoute)))

  return (
    <div className="route-visualization">
      <div className="viz-header">
        <h1>Route Visualization</h1>
        <div className="viz-controls">
          <div className="control-group">
            <label>Filter by Route:</label>
            <select value={selectedRoute} onChange={(e) => setSelectedRoute(e.target.value)}>
              <option value="all">All Routes</option>
              <option value="45">Route 45</option>
              <option value="67">Route 67</option>
              <option value="23">Route 23</option>
            </select>
          </div>
          <div className="toggle-controls">
            <label className="toggle-item">
              <input 
                type="checkbox" 
                checked={showBuses} 
                onChange={(e) => setShowBuses(e.target.checked)} 
              />
              Show Buses
            </label>
            <label className="toggle-item">
              <input 
                type="checkbox" 
                checked={showStops} 
                onChange={(e) => setShowStops(e.target.checked)} 
              />
              Show Stops
            </label>
            <label className="toggle-item">
              <input 
                type="checkbox" 
                checked={showRoutes} 
                onChange={(e) => setShowRoutes(e.target.checked)} 
              />
              Show Routes
            </label>
          </div>
        </div>
      </div>

      <div className="viz-stats">
        <div className="stat-card">
          <h3>Active Buses</h3>
          <p className="stat-number">{filteredBuses.filter(b => b.status === 'active').length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Stops</h3>
          <p className="stat-number">{filteredStops.length}</p>
        </div>
        <div className="stat-card">
          <h3>Routes Shown</h3>
          <p className="stat-number">{filteredRoutes.length}</p>
        </div>
        <div className="stat-card">
          <h3>Avg Speed</h3>
          <p className="stat-number">
            {Math.round(filteredBuses.filter(b => b.speed && b.speed > 0).reduce((sum, b) => sum + (b.speed || 0), 0) / filteredBuses.filter(b => b.speed && b.speed > 0).length) || 0} km/h
          </p>
        </div>
      </div>

      <div className="map-section">
        <Map
          center={[28.6139, 77.2090]} // Delhi center
          zoom={11}
          busLocations={filteredBuses}
          routes={filteredRoutes}
          stops={filteredStops}
          showBuses={showBuses}
          showRoutes={showRoutes}
          showStops={showStops}
          height="600px"
          onBusClick={handleBusClick}
          onStopClick={handleStopClick}
        />
        
        <div className="map-legend">
          <div className="legend-item">
            <div className="legend-icon legend-bus"></div>
            <span>Live Buses</span>
          </div>
          <div className="legend-item">
            <div className="legend-icon legend-stop"></div>
            <span>Bus Stops</span>
          </div>
          <div className="legend-item">
            <div className="legend-icon legend-route"></div>
            <span>Bus Routes</span>
          </div>
        </div>
      </div>

      <div className="bus-status-panel">
        <h3>Live Bus Status</h3>
        <div className="bus-list">
          {filteredBuses.map(bus => (
            <div key={bus.id} className={`bus-item status-${bus.status}`}>
              <div className="bus-info">
                <strong>{bus.busNumber}</strong>
                <span>{bus.route}</span>
              </div>
              <div className="bus-status">
                <span className={`status-badge status-${bus.status}`}>{bus.status}</span>
                <span className="speed">{bus.speed || 0} km/h</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}