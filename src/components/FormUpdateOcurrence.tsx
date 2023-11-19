'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import { MapComponent } from './MapComponent'
import FormUpdateOcurrenceProps from '@/interfaces/FormUpdateOcurrenceProps'
import { formatDate, inverterCoordenadas } from '@/lib/utils'

export function FormUpdateOcurrence({ ocurrPoint }: FormUpdateOcurrenceProps) {
  const router = useRouter()

  const [changeLocation, setChangeLocation] = useState(false)
  const [titulo, setTitulo] = useState(ocurrPoint.titulo ?? '')
  const [tipo, setTipo] = useState(ocurrPoint.tipo ?? '')
  const [data, setData] = useState(formatDate(ocurrPoint.data, false) ?? '')
  const [hora, setHora] = useState(ocurrPoint.hora ?? '')

  const [point, setPoint] = useState<google.maps.LatLngLiteral>(
    ocurrPoint.position,
  )

  function setPointMarker(pointMarker: google.maps.LatLngLiteral) {
    console.log(pointMarker)
    setPoint(pointMarker)
  }

  async function handleUpdateOccurrence(event: FormEvent<HTMLFormElement>) {
    console.log('efetuando a criação de ocorrencia')
    console.log([point?.lat, point?.lng], inverterCoordenadas(point))
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const body = {
      titulo: formData.get('title') ?? ocurrPoint.titulo,
      tipo: formData.get('type') ?? ocurrPoint.tipo,
      data: formData.get('date') ?? ocurrPoint.data,
      hora: formData.get('time') ?? ocurrPoint.hora,
      localizacaoGeografica: [point?.lng, point?.lat],
    }
    console.log(JSON.stringify(body))
    fetch(`http://localhost:4444/ocorrencias/${ocurrPoint.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
      })

    window.alert('Ocorrência atualizada com sucesso! Redirecionando...')
    location.reload()
  }

  return (
    <form
      className="flex flex-col pb-10 px-8 gap-6 justify-between h-full"
      onSubmit={handleUpdateOccurrence}
    >
      {changeLocation ? (
        <MapComponent onClick={setPointMarker} location={ocurrPoint.position} />
      ) : (
        <>
          <div className="flex items-center gap-4">
            <label htmlFor="title" className="uppercase w-[20%]">
              Título
            </label>
            <input
              name="title"
              id="title"
              type="text"
              className="border-slate-300 border-[1px] rounded px-2 py-1 w-[60%]"
              value={titulo}
              onChange={(e) => {
                setTitulo(e.target.value)
              }}
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="" className="uppercase w-[20%]">
              Tipo
            </label>
            <select
              name="type"
              id="type"
              className="border-slate-300 border-[1px] rounded p-2"
              value={tipo}
              onChange={(e) => {
                setTipo(e.target.value)
              }}
            >
              <option value="Assalto">Assalto</option>
              <option value="Furto">Furto</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="date" className="uppercase w-[20%]">
              Data
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="border-slate-300 border-[1px] rounded px-2 py-1 "
              value={data}
              onChange={(e) => {
                setData(e.target.value)
              }}
            />
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="time" className="uppercase w-[20%]">
              Hora
            </label>
            <input
              type="time"
              name="time"
              id="time"
              className="border-slate-300 border-[1px] rounded px-2 py-1 "
              value={hora}
              onChange={(e) => {
                setHora(e.target.value)
              }}
            />
          </div>
        </>
      )}
      <div className="flex items-center gap-4">
        {changeLocation ? (
          <button
            type="button"
            onClick={() => {
              setChangeLocation(!changeLocation)
            }}
            className="ml-auto font-semibold bg-terciary text-neutral-50 px-4 py-2 rounded-md hover:shadow-md"
          >
            Voltar
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setChangeLocation(!changeLocation)
            }}
            className="bg-terciary font-semibold text-neutral-50 px-4 py-2 rounded-md hover:shadow-md"
          >
            Alterar localização
          </button>
        )}
      </div>
      <button
        type="submit"
        className="bg-secondary py-2 px-8 w-auto rounded-3xl hover:text-slate-100 hover:bg-primary ease-in-out duration-300 font-semibold text-center"
      >
        Atualizar ocorrência
      </button>
    </form>
  )
}
