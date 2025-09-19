import React, { useState, useEffect } from 'react'
import Map from '../components/Map'
import './Dashboard.css'

interface DashboardStats {
  totalBuses: number
  activeBuses: number
  totalRoutes: number
  activeCrews: number
}

interface Activity {
  id: string
  message: string
  time: string
  type: 'info' | 'success' | 'warning'
}

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalBuses: 3500,
    activeBuses: 2800,
    totalRoutes: 180,
    activeCrews: 4200
  })

  const [activities, setActivities] = useState<Activity[]>([
    { id: '1', message: 'Bus DL-1PC-1234 assigned to Route 45', time: '2 hours ago', type: 'success' },
    { id: '2', message: 'Crew duty schedule updated for Route 23', time: '4 hours ago', type: 'info' },
    { id: '3', message: 'New route optimization completed', time: '6 hours ago', type: 'success' },
    { id: '4', message: 'Bus DL-1PC-5678 requires maintenance check', time: '8 hours ago', type: 'warning' },
  ])

  // Sample live bus data for dashboard map
  const [liveBuses] = useState([
    { id: 'bus-1', busNumber: 'DL-1PC-1234', route: 'Route 45', latitude: 28.6315, longitude: 77.2167, status: 'active' as const, speed: 25 },
    { id: 'bus-2', busNumber: 'DL-1PC-5678', route: 'Route 67', latitude: 28.6280, longitude: 77.2419, status: 'active' as const, speed: 30 },
    { id: 'bus-3', busNumber: 'DL-1PC-9012', route: 'Route 23', latitude: 28.5921, longitude: 77.0460, status: 'idle' as const, speed: 0 },
    { id: 'bus-4', busNumber: 'DL-1PC-3456', route: 'Route 45', latitude: 28.6562, longitude: 77.2410, status: 'active' as const, speed: 20 },
  ])

  const [refreshing, setRefreshing] = useState(false)

  const refreshStats = async () => {
    setRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalBuses: stats.totalBuses + Math.floor(Math.random() * 10) - 5,
        activeBuses: stats.activeBuses + Math.floor(Math.random() * 20) - 10,
        totalRoutes: stats.totalRoutes,
        activeCrews: stats.activeCrews + Math.floor(Math.random() * 50) - 25
      })
      setRefreshing(false)
    }, 1000)
  }

  const addActivity = (message: string, type: Activity['type'] = 'info') => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      message,
      time: 'Just now',
      type
    }
    setActivities(prev => [newActivity, ...prev.slice(0, 4)])
  }

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
        'Bus schedule updated automatically',
        'New driver assigned to Route 15',
        'Route optimization in progress',
        'System backup completed'
      ]
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      addActivity(randomMessage, 'info')
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button 
          className={`btn btn-secondary ${refreshing ? 'refreshing' : ''}`}
          onClick={refreshStats}
          disabled={refreshing}
        >
          {refreshing ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Buses</h3>
          <p className="stat-number">{stats.totalBuses}</p>
          <span className="stat-trend">Fleet capacity</span>
        </div>
        <div className="stat-card">
          <h3>Active Buses</h3>
          <p className="stat-number">{stats.activeBuses}</p>
          <span className="stat-trend">{Math.round((stats.activeBuses / stats.totalBuses) * 100)}% operational</span>
        </div>
        <div className="stat-card">
          <h3>Total Routes</h3>
          <p className="stat-number">{stats.totalRoutes}</p>
          <span className="stat-trend">Network coverage</span>
        </div>
        <div className="stat-card">
          <h3>Active Crews</h3>
          <p className="stat-number">{stats.activeCrews}</p>
          <span className="stat-trend">On duty personnel</span>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="live-tracking">
          <h2>Live Bus Tracking</h2>
          <div className="map-container-dashboard">
            <Map
              center={[28.6139, 77.2090]}
              zoom={12}
              busLocations={liveBuses}
              showBuses={true}
              showRoutes={false}
              showStops={false}
              height="350px"
              className="dashboard-map"
            />
          </div>
          <div className="tracking-summary">
            <div className="tracking-stat">
              <span className="stat-label">Buses Tracked:</span>
              <span className="stat-value">{liveBuses.length}</span>
            </div>
            <div className="tracking-stat">
              <span className="stat-label">Active:</span>
              <span className="stat-value">{liveBuses.filter(b => b.status === 'active').length}</span>
            </div>
            <div className="tracking-stat">
              <span className="stat-label">Avg Speed:</span>
              <span className="stat-value">
                {Math.round(liveBuses.filter(b => b.speed > 0).reduce((sum, b) => sum + b.speed, 0) / liveBuses.filter(b => b.speed > 0).length) || 0} km/h
              </span>
            </div>
          </div>
        </div>
        
        <div className="recent-activities">
          <div className="activities-header">
            <h2>Recent Activities</h2>
            <button 
              className="btn btn-sm btn-primary"
              onClick={() => addActivity('Manual activity added', 'success')}
            >
              Add Test Activity
            </button>
          </div>
          <div className="activity-list">
            {activities.map((activity) => (
              <div key={activity.id} className={`activity-item activity-${activity.type}`}>
                <div className="activity-content">
                  <span className="activity-message">{activity.message}</span>
                  <span className="activity-type">{activity.type}</span>
                </div>
                <span className="time">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}