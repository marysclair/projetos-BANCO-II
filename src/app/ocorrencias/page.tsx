'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css/navigation'
import 'swiper/css'
import 'src/app/slide.css'
import { Ocurrence } from '@/components/Ocurrence'
import { ChangeEvent, useEffect, useState } from 'react'
import OcurrencePoint from '@/interfaces/OcurrencePoint'
import { MapComponent } from '@/components/MapComponent'
import { Clock, MapPin } from 'lucide-react'

export default function Ocorrencias() {
  const [ocurrPoint, setOcurrPoint] = useState<OcurrencePoint[] | []>([])
  const [ocurrPointFiltro, setOcurrPointFiltro] = useState<
    OcurrencePoint[] | []
  >([])
  const [horario, setHorario] = useState<string>('')
  const [tipo, setTipo] = useState<string>('')

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
        setOcurrPointFiltro(pontos)
        console.log(pontos)
      })
  }, [])

  async function filterPoint(selectValue: string, tipoOcorrencia?: string) {
    const url = tipoOcorrencia
      ? `http://localhost:4444/ocorrencias?horario=${selectValue}&tipo=${tipoOcorrencia}`
      : `http://localhost:4444/ocorrencias?horario=${selectValue}`
    console.log(url, tipo)
    if (selectValue.length !== 0) {
      fetch(url)
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
          setOcurrPointFiltro(pontos)
          console.log(pontos)
        })
    }
  }

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    setHorario(event.target.value)
    const selectValue = event.target.value
    if (selectValue.length !== 0) {
      console.log('executou')
      await filterPoint(selectValue)
    } else {
      console.log('executou 1')
      setOcurrPointFiltro(ocurrPoint)
      setTipo('')
    }
  }

  async function handleChangeFilter(tipoOcorrencia?: string) {
    setTipo(tipoOcorrencia as string)
    if (tipoOcorrencia) {
      await filterPoint(horario, tipoOcorrencia)
    } else {
      await filterPoint(horario)
    }
  }

  return (
    <div className="grid grid-cols-[30%_60%] gap-28 w-full">
      <div className="text-primary flex flex-col gap-4 px-6 border-l-neutral-50 border-l-2 pl-4 h-[67vh] overflow-auto pr-8 scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100">
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
            <div className="w-[700px] h-[480px] py-4 ps-6 pe-4 flex gap-8">
              <div className="w-[550px]">
                <MapComponent
                  onClick={() => console.log('clicou')}
                  positions={ocurrPointFiltro}
                  location={null}
                />
                <div></div>
              </div>
              <div className="flex flex-col justify-center text-primary ">
                <h3 className="font-bold mb-8 text-center">Filtrar por</h3>
                <div className="flex gap-2 items-center mb-2">
                  <Clock />
                  <label className="font-medium">Intervalo de horário</label>
                </div>
                <select
                  name="horarios"
                  id="horarios"
                  className="border-slate-300 border-[1px] rounded p-2 w-full"
                  value={horario}
                  onChange={handleChange}
                >
                  <option value="">Sem filtro</option>
                  <option value="0:00">00:00-00:59</option>
                  <option value="1:00">01:00-01:59</option>
                  <option value="2:00">02:00-02:59</option>
                  <option value="3:00">03:00-03:59</option>
                  <option value="4:00">04:00-04:59</option>
                  <option value="5:00">05:00-05:59</option>
                  <option value="6:00">06:00-06:59</option>
                  <option value="7:00">07:00-07:59</option>
                  <option value="8:00">08:00-08:59</option>
                  <option value="9:00">09:00-09:59</option>
                  <option value="10:00">10:00-10:59</option>
                  <option value="11:00">11:00-11:59</option>
                  <option value="12:00">12:00-12:59</option>
                  <option value="13:00">13:00-13:59</option>
                  <option value="14:00">14:00-14:59</option>
                  <option value="15:00">15:00-15:59</option>
                  <option value="16:00">16:00-16:59</option>
                  <option value="17:00">17:00-17:59</option>
                  <option value="18:00">18:00-18:59</option>
                  <option value="19:00">19:00-19:59</option>
                  <option value="20:00">20:00-20:59</option>
                  <option value="21:00">21:00-21:59</option>
                  <option value="22:00">22:00-22:59</option>
                  <option value="23:00">23:00-23:59</option>
                </select>
                <div className="mt-16 flex flex-col gap-4 mx-auto font-semibold">
                  <button
                    className={
                      horario
                        ? `flex items-center gap-2 hover:text-rose-500`
                        : `flex items-center gap-2  disabled:font-light`
                    }
                    disabled={horario.length === 0}
                    onClick={() => {
                      handleChangeFilter('Furto')
                    }}
                  >
                    <MapPin className="text-rose-500" />
                    Furto
                  </button>
                  <button
                    className={
                      horario
                        ? `flex items-center gap-2 hover:text-pink-800`
                        : `flex items-center gap-2  disabled:font-light`
                    }
                    disabled={horario.length === 0}
                    onClick={() => {
                      handleChangeFilter('Assalto')
                    }}
                  >
                    <MapPin className="text-pink-800" />
                    Assalto
                  </button>
                  <button
                    className={
                      horario
                        ? `flex items-center gap-2 hover:text-fuchsia-950`
                        : `flex items-center gap-2  disabled:font-light`
                    }
                    disabled={horario.length === 0}
                    onClick={() => {
                      handleChangeFilter('Outros')
                    }}
                  >
                    <MapPin className="text-fuchsia-950" />
                    Outros
                  </button>
                  <button
                    onClick={() => {
                      handleChangeFilter()
                    }}
                  >
                    Todos os tipos
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <iframe
              className="py-4 px-6"
              width="700"
              height="480"
              src="https://charts.mongodb.com/charts-project-0-okkyl/embed/charts?id=65593564-0673-4d07-8cbc-776ee6c757e5&maxDataAge=60&theme=light&autoRefresh=true"
            ></iframe>
          </SwiperSlide>
          <SwiperSlide>
            <iframe
              className="py-4 px-6"
              width="700"
              height="480"
              src="https://charts.mongodb.com/charts-project-0-okkyl/embed/charts?id=65592f14-e021-46b4-80a9-ede4bf105b70&maxDataAge=60&theme=light&autoRefresh=true"
            ></iframe>
          </SwiperSlide>
          <SwiperSlide>
            <iframe
              className="py-4 px-6"
              width="700"
              height="480"
              src="https://charts.mongodb.com/charts-project-0-okkyl/embed/charts?id=6559367e-7fe5-4dfa-8ecd-aab5fab9b7cd&maxDataAge=60&theme=light&autoRefresh=true"
            ></iframe>
          </SwiperSlide>
          <SwiperSlide>
            <iframe
              className="py-4 px-6"
              width="700"
              height="480"
              src="https://charts.mongodb.com/charts-project-0-okkyl/embed/charts?id=65592e5c-29ce-403e-8fe4-7a7153930e99&maxDataAge=60&theme=light&autoRefresh=true"
            ></iframe>
          </SwiperSlide>
          <SwiperSlide>
            <iframe
              className="py-4 px-6"
              width="700"
              height="480"
              src="https://charts.mongodb.com/charts-project-0-okkyl/embed/charts?id=65593847-e021-41fe-81a4-ede4bff88453&maxDataAge=60&theme=light&autoRefresh=true"
            ></iframe>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}
