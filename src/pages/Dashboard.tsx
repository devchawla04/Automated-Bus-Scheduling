import React from 'react'
import './Dashboard.css'

interface DashboardStats {
  totalBuses: number
  activeBuses: number
  totalRoutes: number
  activeCrews: number
}

export const Dashboard: React.FC = () => {
  const stats: DashboardStats = {
    totalBuses: 3500,
    activeBuses: 2800,
    totalRoutes: 180,
    activeCrews: 4200
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Buses</h3>
          <p className="stat-number">{stats.totalBuses}</p>
        </div>
        <div className="stat-card">
          <h3>Active Buses</h3>
          <p className="stat-number">{stats.activeBuses}</p>
        </div>
        <div className="stat-card">
          <h3>Total Routes</h3>
          <p className="stat-number">{stats.totalRoutes}</p>
        </div>
        <div className="stat-card">
          <h3>Active Crews</h3>
          <p className="stat-number">{stats.activeCrews}</p>
        </div>
      </div>
      
      <div className="recent-activities">
        <h2>Recent Activities</h2>
        <div className="activity-list">
          <div className="activity-item">
            <span>Bus DL-1PC-1234 assigned to Route 45</span>
            <span className="time">2 hours ago</span>
          </div>
          <div className="activity-item">
            <span>Crew duty schedule updated for Route 23</span>
            <span className="time">4 hours ago</span>
          </div>
          <div className="activity-item">
            <span>New route optimization completed</span>
            <span className="time">6 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}