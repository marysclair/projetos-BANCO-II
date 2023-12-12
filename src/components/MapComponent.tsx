'use client'

import MapComponentProps from '@/interfaces/MapComponentProps'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { useEffect, useState } from 'react'

export function MapComponent({
  onClick,
  location,
  positions,
}: MapComponentProps) {
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

  function colorByType(type: string) {
    if (type === 'Assalto') {
      return '#9d174d'
    } else if (type === 'Furto') {
      return '#f43f5e'
    } else {
      return '#4a044e'
    }
  }

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
          {positions ? (
            positions.map((position) => {
              return (
                <MarkerF
                  key={position.id}
                  title={position.titulo}
                  position={position.position}
                  onLoad={(marker) => {
                    const customIcon = (opts) =>
                      Object.assign(
                        {
                          path: 'M12 2C8.13 2 5 5.13 5 9c0 3.78 5.55 11.29 6.23 12.35a1 1 0 0 0 1.54 0C13.45 20.29 19 12.78 19 9c0-3.87-3.13-7-7-7zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z',
                          fillColor: '#1e1e1e',
                          fillOpacity: 1,
                          strokeColor: '#000',
                          strokeWeight: 1,
                          scale: 1.5,
                        },
                        opts,
                      )

                    marker.setIcon(
                      customIcon({
                        fillColor: colorByType(position.tipo),
                        strokeColor: 'white',
                      }),
                    )
                  }}
                />
              )
            })
          ) : (
            <MarkerF
              position={
                point ? { ...point } : { lat: -6.889369, lng: -38.54522 }
              }
            />
          )}
        </GoogleMap>
      ) : (
        <></>
      )}
    </>
  )
}
