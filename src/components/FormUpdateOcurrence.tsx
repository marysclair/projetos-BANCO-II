'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import { MapComponent } from './MapComponent'
import FormUpdateOcurrenceProps from '@/interfaces/FormUpdateOcurrenceProps'

export function FormUpdateOcurrence({ ocurrPoint }: FormUpdateOcurrenceProps) {
  const router = useRouter()

  const [changeLocation, setChangeLocation] = useState(false)

  const [point, setPoint] = useState<google.maps.LatLngLiteral>()

  function setPointMarker(pointMarker: google.maps.LatLngLiteral) {
    console.log(pointMarker)
    setPoint(pointMarker)
  }

  async function handleUpdateOccurrence(event: FormEvent<HTMLFormElement>) {
    console.log('efetuando a criação de ocorrencia')
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const body = {
      titulo: formData.get('title') ?? ocurrPoint.titulo,
      tipo: formData.get('type') ?? ocurrPoint.tipo,
      data: formData.get('date') ?? ocurrPoint.data,
      hora: formData.get('time') ?? ocurrPoint.hora,
      localizacaoGeografica: [point?.lat, point?.lng] ?? ocurrPoint.position,
    }
    console.log(JSON.stringify(body))
    fetch(`http://localhost:4444/ocorrencia/${ocurrPoint.id}`, {
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

    window.alert('Ocorrência cadastrada com sucesso! Redirecionando...')
    router.push('/')
  }

  return (
    <form
      className="flex flex-col pb-10 px-8 gap-6 justify-between h-full"
      onSubmit={handleUpdateOccurrence}
    >
      {changeLocation ? (
        <MapComponent onClick={setPointMarker} />
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
              className="border-primary border-2 rounded px-2 py-1 w-[60%]"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="" className="uppercase w-[20%]">
              Tipo
            </label>
            <select
              name="type"
              id="type"
              className="border-primary border-2 rounded p-2"
            >
              <option value="Assalto">Assalto</option>
              <option value="Furto">Furto</option>
              <option value="Outro">Outro</option>
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
              className="border-primary border-2 rounded px-2 py-1 "
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
              className="border-primary border-2 rounded px-2 py-1 "
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
