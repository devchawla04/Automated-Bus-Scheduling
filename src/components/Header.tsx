import React from 'react'
import './Header.css'

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>DTC Bus Management System</h1>
        </div>
        <div className="header-info">
          <span>Delhi Transport Corporation</span>
        </div>
      </div>
    </header>
  )
}