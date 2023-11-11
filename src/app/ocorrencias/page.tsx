'use client'
import { Trash2 } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css/navigation'
import 'swiper/css'
import 'src/app/slide.css'
import { ButtonEdit } from '@/components/ButtonEdit'

export default function Ocorrencias() {
  return (
    <div className="grid grid-cols-[450px_800px]  gap-28 w-full">
      <div className="text-primary border-l-neutral-50 border-l-2 pl-4">
        <div className="bg-neutral-50 w-full rounded-xl py-4 px-6 shadow-xl">
          <div className="flex justify-between mb-4">
            <ButtonEdit />
            <button className="bg-secondary p-2 rounded-2xl hover:text-neutral-50 ease-in-out duration-300">
              <Trash2 size={16} />
            </button>
          </div>
          <h2 className="font-bold mb-1">Lorem, ipsum dolor.</h2>
          <p>Tipo: Lorem.</p>
          <p>20/10/2023 - 08:00</p>
        </div>
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
