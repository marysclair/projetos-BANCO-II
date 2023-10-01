'use client'

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

interface MapComponentProps {
  onClick: (pointMarker: google.maps.LatLngLiteral) => void
  positions: google.maps.LatLngLiteral[] | []
}

export function MapComponent({ onClick, positions }: MapComponentProps) {
  function handleCreatePoint(event: google.maps.MapMouseEvent) {
    if (event) {
      onClick({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      })
    }
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAUpu33pF3rodJFCMkwPRDriGbFAqzDrgs',
  })

  return (
    <div className="w-full h-[32rem]">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={{ lat: -6.89031, lng: -38.5539 }}
          zoom={15}
          onClick={(event) => {
            handleCreatePoint(event)
          }}
        >
          {positions.length > 0 &&
            positions.map((position: google.maps.LatLngLiteral) => {
              return <Marker key={position.lat} position={position} />
            })}
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  )
}
