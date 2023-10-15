'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MapComponent } from '@/components/MapComponent'

interface Point {
  id: string
  titulo: string
  tipo: string
  data: string
  hora: string
  position: google.maps.LatLngLiteral
}

export default function Home() {
  const [positions, setPositions] = useState<Point[] | []>([])

  useEffect(() => {
    fetch('http://localhost:4444/ocorrencias')
      .then((res) => res.json())
      .then((res) => {
        const pontos = res.map(function (elemento: any) {
          return {
            id: elemento.id,
            titulo: elemento.titulo,
            tipo: elemento.tipo,
            data: elemento.data,
            hora: elemento.hora,
            position: {
              lat: elemento.localizacaoGeografica.coordinates[0],
              lng: elemento.localizacaoGeografica.coordinates[1],
            },
          }
        })
        console.log(pontos)
        setPositions(pontos)
      })
  }, [])

  return (
    <>
      <MapComponent onClick={() => console.log('clicou')} points={positions} />
      <Link
        href="/ocorrencia/"
        className="bg-indigo-950 text-neutral-50 mt-12 py-2 px-8 w-auto rounded-3xl hover:bg-indigo-900 ease-in-out duration-300 font-semibold"
      >
        Cadastrar uma nova ocorrência
      </Link>
    </>
  )
}
