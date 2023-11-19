export function formatDate(dateString: string, option: boolean) {
  const date = new Date(dateString)
  const day = date.getUTCDate().toString().padStart(2, '0')
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const year = date.getUTCFullYear()

  switch (option) {
    case true:
      return `${day}/${month}/${year}`
    case false:
      return `${year}-${month}-${day}`
  }
}

export function inverterCoordenadas(objeto: google.maps.LatLngLiteral) {
  const { lat, lng } = objeto
  return { lat: lng, lng: lat }
}
