import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Dashboard } from './pages/Dashboard'
import { BusScheduling } from './pages/BusScheduling'
import { RouteManagement } from './pages/RouteManagement'
import { CrewManagement } from './pages/CrewManagement'
import { DutyScheduling } from './pages/DutyScheduling'
import { RouteVisualization } from './pages/RouteVisualization'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="app-content">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/bus-scheduling" element={<BusScheduling />} />
              <Route path="/route-management" element={<RouteManagement />} />
              <Route path="/crew-management" element={<CrewManagement />} />
              <Route path="/duty-scheduling" element={<DutyScheduling />} />
              <Route path="/route-visualization" element={<RouteVisualization />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
