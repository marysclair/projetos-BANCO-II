'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css/navigation'
import 'swiper/css'
import 'src/app/slide.css'
import { Ocurrence } from '@/components/Ocurrence'
import { useEffect, useState } from 'react'
import OcurrencePoint from '@/interfaces/OcurrencePoint'

export default function Ocorrencias() {
  const [ocurrPoint, setOcurrPoint] = useState<OcurrencePoint[] | []>([])

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
        setOcurrPoint(pontos)
      })
  }, [])

  return (
    <div className="grid grid-cols-[30%_60%] gap-28 w-full">
      <div className="text-primary border-l-neutral-50 border-l-2 pl-4">
        {ocurrPoint.map((point) => {
          return <Ocurrence key={point.id} ocurrPoint={point} />
        })}
      </div>
      <div className="bg-neutral-50">
        <Swiper
          className="px-12"
          modules={[Navigation]}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          <SwiperSlide>
            <iframe
              className="p-4"
              width="800"
              height="480"
              src="https://charts.mongodb.com/charts-project-0-lrory/embed/charts?id=65400bce-ef90-4aa0-85be-57735397aac9&maxDataAge=300&theme=light&autoRefresh=true"
            ></iframe>
          </SwiperSlide>
          <SwiperSlide>
            <iframe
              className="p-4"
              width="800"
              height="480"
              src="https://charts.mongodb.com/charts-project-0-lrory/embed/charts?id=654279e8-3fb5-40bd-813d-dc064e5ed055&maxDataAge=3600&theme=light&autoRefresh=true"
            ></iframe>
          </SwiperSlide>
          <SwiperSlide>
            <iframe
              className="p-4"
              width="800"
              height="480"
              src="https://charts.mongodb.com/charts-project-0-lrory/embed/charts?id=654693de-e494-4b10-8e5e-df084e6635c3&maxDataAge=300&theme=light&autoRefresh=true"
            ></iframe>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}
