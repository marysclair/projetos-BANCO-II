'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapComponent } from '@/components/MapComponent'

export default function Home() {
  const [positions, setPositions] = useState<google.maps.LatLngLiteral[] | []>([
    { lat: -6.887064821511802, lng: -38.547509902424544 },
    { lat: -6.889417797271691, lng: -38.55552831409871 },
    { lat: -6.88542652775848, lng: -38.5524494212183 },
    { lat: -6.891221004438016, lng: -38.54695614471224 },
  ])

  // aqui faz a requisição da api e salva no setPositions
  return (
    <>
      <MapComponent
        onClick={() => console.log('clicou')}
        positions={positions}
      />
      <Link
        href="/ocorrencia/"
        className="bg-indigo-950 text-neutral-50 mt-12 py-2 px-8 w-auto rounded-3xl hover:bg-indigo-900 ease-in-out duration-300 font-semibold"
      >
        Cadastrar uma nova ocorrência
      </Link>
    </>
  )
}
