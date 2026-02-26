'use client'

/**
 * AquaVenture - Interactive Map Component
 * Leaflet-based map for displaying activity locations
 */

import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { MapPin, Navigation } from 'lucide-react'

// Fix for default marker icons in Leaflet with Next.js
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// Custom marker icon with primary color
const customIcon = L.divIcon({
  className: 'custom-marker',
  html: `
    <div style="
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #007BFF, #28A745);
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
    ">
      <div style="
        transform: rotate(45deg);
        color: white;
        font-size: 16px;
      ">📍</div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
})

L.Marker.prototype.options.icon = defaultIcon

// ============================================
// TYPES
// ============================================

interface MapLocation {
  name: string
  coordinates: {
    lat: number
    lng: number
  }
  description?: string
  type?: 'activity' | 'meeting' | 'landmark'
}

interface MapComponentProps {
  center?: [number, number]
  zoom?: number
  locations?: MapLocation[]
  className?: string
  showCurrentLocation?: boolean
  height?: string
}

// ============================================
// FLY TO COMPONENT
// ============================================

function FlyToLocation({ center }: { center: [number, number] }) {
  const map = useMap()

  useEffect(() => {
    map.flyTo(center, 13, { duration: 1.5 })
  }, [center, map])

  return null
}

// ============================================
// MAP COMPONENT
// ============================================

export const MapComponent: React.FC<MapComponentProps> = ({
  center = [-16.8833, 49.8833], // Default: Sainte-Marie, Madagascar
  zoom = 12,
  locations = [],
  className,
  showCurrentLocation = false,
  height = '400px',
}) => {
  const [isMounted, setIsMounted] = useState(() => {
    // Initialize as mounted on client-side
    if (typeof window !== 'undefined') {
      return true
    }
    return false
  })
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null)

  useEffect(() => {
    // Get current location if requested
    if (showCurrentLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation([position.coords.latitude, position.coords.longitude])
        },
        (error) => {
          console.log('Could not get current location:', error)
        }
      )
    }
  }, [showCurrentLocation])

  if (!isMounted) {
    return (
      <div
        className={cn('bg-muted rounded-2xl flex items-center justify-center', className)}
        style={{ height }}
      >
        <div className="animate-pulse flex flex-col items-center gap-2">
          <MapPin className="w-8 h-8 text-muted-foreground" />
          <span className="text-muted-foreground text-sm">Chargement de la carte...</span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('rounded-2xl overflow-hidden shadow-lg', className)} style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Activity Locations */}
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.coordinates.lat, location.coordinates.lng]}
            icon={customIcon}
          >
            <Popup>
              <div className="p-1 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <Navigation className="w-4 h-4 text-primary" />
                  <span className="font-semibold">{location.name}</span>
                </div>
                {location.description && (
                  <p className="text-sm text-muted-foreground">{location.description}</p>
                )}
                {location.type && (
                  <Badge variant="outline" className="mt-2">
                    {location.type === 'activity' && '🎯 Activité'}
                    {location.type === 'meeting' && '📍 Point de rendez-vous'}
                    {location.type === 'landmark' && '🏛️ Lieu remarquable'}
                  </Badge>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Current Location */}
        {currentLocation && (
          <Marker position={currentLocation} icon={defaultIcon}>
            <Popup>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-nature animate-pulse" />
                <span className="font-medium">Votre position</span>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Fly to center on location change */}
        <FlyToLocation center={center} />
      </MapContainer>
    </div>
  )
}

// ============================================
// ACTIVITY MAP - Specialized for Activities
// ============================================

interface ActivityMapProps {
  location: {
    name: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  activityName: string
  className?: string
}

export const ActivityMap: React.FC<ActivityMapProps> = ({
  location,
  activityName,
  className,
}) => {
  const mapLocations: MapLocation[] = [
    {
      name: location.name,
      coordinates: location.coordinates,
      description: `Lieu de l'activité: ${activityName}`,
      type: 'activity' as const,
    },
  ]

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-primary" />
        <span className="font-medium">{location.name}</span>
      </div>
      <MapComponent
        center={[location.coordinates.lat, location.coordinates.lng]}
        zoom={14}
        locations={mapLocations}
        height="300px"
      />
    </div>
  )
}

export default MapComponent
