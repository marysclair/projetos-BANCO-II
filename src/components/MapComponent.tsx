'use client'

import MapComponentProps from '@/interfaces/MapComponentProps'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { useEffect, useState } from 'react'

export function MapComponent({ onClick, location }: MapComponentProps) {
  const [point, setPoint] = useState<google.maps.LatLngLiteral | null>(location)

  function handleCreatePoint(event: google.maps.MapMouseEvent) {
    if (event) {
      onClick({
        lat: event?.latLng?.lat() as number,
        lng: event?.latLng?.lng() as number,
      })
      setPoint({
        lat: event?.latLng?.lat() as number,
        lng: event?.latLng?.lng() as number,
      })
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setPoint(pos)
      })
    }
  }, [])

  useEffect(() => {
    console.log(point)
  }, [point])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAUpu33pF3rodJFCMkwPRDriGbFAqzDrgs',
  })

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={point ? { ...point } : { lat: -6.889369, lng: -38.54522 }}
          zoom={17}
          onClick={(event) => {
            handleCreatePoint(event)
          }}
        >
          <MarkerF
            position={point ? { ...point } : { lat: -6.889369, lng: -38.54522 }}
          />
        </GoogleMap>
      ) : (
        <></>
      )}
    </>
  )
}
