'use client'

import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from '@react-google-maps/api'
import { useEffect, useState } from 'react'

interface Point {
  id: string
  titulo: string
  tipo: string
  data: string
  hora: string
  position: google.maps.LatLngLiteral
}

interface MapComponentProps {
  onClick: (pointMarker: google.maps.LatLngLiteral) => void
  points: Point[] | []
}

export function MapComponent({ onClick, points }: MapComponentProps) {
  const [point, setPoint] = useState<google.maps.LatLngLiteral | null>(null)
  const [idPoint, setIdPoint] = useState<string | null>(null)

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

  function toggleVisibility(idPointMarker: string | null) {
    if (idPoint === idPointMarker) {
      return
    }
    setIdPoint(idPointMarker)
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    const day = date.getUTCDate()
    const month = date.getUTCMonth() + 1
    const year = date.getUTCFullYear()
    const formattedDay = day.toString().padStart(2, '0')
    const formattedMonth = month.toString().padStart(2, '0')
    const formattedYear = year.toString()
    return `${formattedDay}-${formattedMonth}-${formattedYear}`
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
    <div className="w-full h-[32rem]">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={point ? { ...point } : { lat: -6.89031, lng: -38.5539 }}
          zoom={17}
          onClick={(event) => {
            handleCreatePoint(event)
          }}
        >
          {points.length > 0 ? (
            points.map((point: Point) => {
              return (
                <Marker
                  key={point.id}
                  position={point.position}
                  onClick={() => toggleVisibility(point.id)}
                >
                  {idPoint === point.id && (
                    <InfoWindow onCloseClick={() => toggleVisibility(null)}>
                      <div className="p-2 w-[160px]">
                        <h2 className="font-bold mb-1">
                          {point.titulo.toLocaleUpperCase()}
                        </h2>
                        <p>Tipo: {point.tipo}</p>
                        <p>
                          {formatDate(point.data)} - {point.hora}
                        </p>
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              )
            })
          ) : (
            <Marker position={point as google.maps.LatLngLiteral} />
          )}
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  )
}
