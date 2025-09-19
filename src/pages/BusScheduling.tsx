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
  const [buses] = useState<Bus[]>([
    { id: '1', number: 'DL-1PC-1234', route: 'Route 45', status: 'active', driver: 'Raj Kumar', conductor: 'Amit Singh' },
    { id: '2', number: 'DL-1PC-5678', route: 'Route 23', status: 'maintenance', driver: '-', conductor: '-' },
    { id: '3', number: 'DL-1PC-9012', route: 'Route 67', status: 'active', driver: 'Suresh Yadav', conductor: 'Ravi Sharma' },
  ])

  return (
    <div className="bus-scheduling">
      <h1>Bus Scheduling</h1>
      <div className="controls">
        <button className="btn btn-primary">Add New Schedule</button>
        <button className="btn btn-secondary">Import Schedule</button>
      </div>
      
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
                  <button className="btn btn-sm">Edit</button>
                  <button className="btn btn-sm btn-danger">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}