import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

export const Sidebar: React.FC = () => {
  const location = useLocation()
  
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/bus-scheduling', label: 'Bus Scheduling', icon: '🚌' },
    { path: '/route-management', label: 'Route Management', icon: '🗺️' },
    { path: '/crew-management', label: 'Crew Management', icon: '👥' },
    { path: '/duty-scheduling', label: 'Duty Scheduling', icon: '📅' },
    { path: '/route-visualization', label: 'Route Visualization', icon: '🛣️' },
  ]

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item.path} className="menu-item">
              <Link 
                to={item.path} 
                className={`menu-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}