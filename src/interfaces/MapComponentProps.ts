import OcurrencePoint from './OcurrencePoint'

export default interface MapComponentProps {
  onClick: (pointMarker: google.maps.LatLngLiteral) => void
  location: google.maps.LatLngLiteral | null
  positions?: OcurrencePoint[]
}
