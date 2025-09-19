import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import './Map.css'

// Fix for default marker icons in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

// Custom icons for different map features
const busIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="30" height="30">
      <rect x="10" y="20" width="80" height="60" rx="10" fill="#007bff" stroke="#fff" stroke-width="3"/>
      <rect x="20" y="30" width="25" height="20" fill="#87ceeb" stroke="#fff" stroke-width="2"/>
      <rect x="55" y="30" width="25" height="20" fill="#87ceeb" stroke="#fff" stroke-width="2"/>
      <circle cx="25" cy="75" r="8" fill="#333"/>
      <circle cx="75" cy="75" r="8" fill="#333"/>
      <text x="50" y="40" text-anchor="middle" fill="white" font-size="8" font-weight="bold">BUS</text>
    </svg>
  `),
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15]
})

const stopIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="20" height="20">
      <circle cx="50" cy="50" r="40" fill="#28a745" stroke="#fff" stroke-width="4"/>
      <circle cx="50" cy="50" r="15" fill="#fff"/>
    </svg>
  `),
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10]
})

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

interface MapProps {
  center?: [number, number]
  zoom?: number
  busLocations?: BusLocation[]
  routes?: RouteData[]
  stops?: BusStop[]
  showBuses?: boolean
  showRoutes?: boolean
  showStops?: boolean
  height?: string
  className?: string
  onBusClick?: (bus: BusLocation) => void
  onStopClick?: (stop: BusStop) => void
}

export const Map: React.FC<MapProps> = ({
  center = [28.6139, 77.2090], // Delhi coordinates
  zoom = 12,
  busLocations = [],
  routes = [],
  stops = [],
  showBuses = true,
  showRoutes = true,
  showStops = true,
  height = '400px',
  className = '',
  onBusClick,
  onStopClick
}) => {
  return (
    <div className={`map-container ${className}`} style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Render bus routes */}
        {showRoutes && routes.map((route) => (
          <Polyline
            key={route.id}
            positions={route.coordinates}
            color={route.color}
            weight={4}
            opacity={0.7}
          >
            <Popup>
              <div>
                <strong>{route.name}</strong>
                <br />
                Stops: {route.stops.length}
              </div>
            </Popup>
          </Polyline>
        ))}

        {/* Render bus stops */}
        {showStops && stops.map((stop) => (
          <Marker
            key={stop.id}
            position={[stop.latitude, stop.longitude]}
            icon={stopIcon}
            eventHandlers={{
              click: () => onStopClick?.(stop)
            }}
          >
            <Popup>
              <div>
                <strong>{stop.name}</strong>
                <br />
                Routes: {stop.routes.join(', ')}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Render live buses */}
        {showBuses && busLocations.map((bus) => (
          <Marker
            key={bus.id}
            position={[bus.latitude, bus.longitude]}
            icon={busIcon}
            eventHandlers={{
              click: () => onBusClick?.(bus)
            }}
          >
            <Popup>
              <div>
                <strong>Bus {bus.busNumber}</strong>
                <br />
                Route: {bus.route}
                <br />
                Status: {bus.status}
                {bus.speed && (
                  <>
                    <br />
                    Speed: {bus.speed} km/h
                  </>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Map