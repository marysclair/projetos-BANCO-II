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
            id: elemento._id,
            titulo: elemento.titulo,
            tipo: elemento.tipo,
            data: elemento.data,
            hora: elemento.hora,
            position: {
              lat: elemento.localizacaoGeografica.coordinates[1],
              lng: elemento.localizacaoGeografica.coordinates[0],
            },
          }
        })
        setOcurrPoint(pontos)
        console.log(pontos)
      })
  }, [])

  return (
    <div className="grid grid-cols-[30%_60%] gap-28 w-full">
      <div className="text-primary flex flex-col gap-4 border-l-neutral-50 border-l-2 pl-4 h-[65vh] overflow-auto pr-8 scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100">
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
              src="https://charts.mongodb.com/charts-project-0-okkyl/embed/charts?id=65593564-0673-4d07-8cbc-776ee6c757e5&maxDataAge=60&theme=light&autoRefresh=true"
            ></iframe>
          </SwiperSlide>
          <SwiperSlide>
            <iframe
              className="p-4"
              width="800"
              height="480"
              src="https://charts.mongodb.com/charts-project-0-okkyl/embed/charts?id=65592f14-e021-46b4-80a9-ede4bf105b70&maxDataAge=60&theme=light&autoRefresh=true"
            ></iframe>
          </SwiperSlide>
          <SwiperSlide>
            <iframe
              className="p-4"
              width="800"
              height="480"
              src="https://charts.mongodb.com/charts-project-0-okkyl/embed/charts?id=6559367e-7fe5-4dfa-8ecd-aab5fab9b7cd&maxDataAge=60&theme=light&autoRefresh=true"
            ></iframe>
          </SwiperSlide>
          <SwiperSlide>
            <iframe
              className="p-4"
              width="800"
              height="480"
              src="https://charts.mongodb.com/charts-project-0-okkyl/embed/charts?id=65592e5c-29ce-403e-8fe4-7a7153930e99&maxDataAge=60&theme=light&autoRefresh=true"
            ></iframe>
          </SwiperSlide>
          <SwiperSlide>
            <iframe
              width="800"
              height="480"
              src="https://charts.mongodb.com/charts-project-0-okkyl/embed/charts?id=65593847-e021-41fe-81a4-ede4bff88453&maxDataAge=60&theme=light&autoRefresh=true"
            ></iframe>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}
