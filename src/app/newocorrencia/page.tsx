'use client'

import { FormEvent, useState } from 'react'
import { MapComponent } from '@/components/MapComponent'

export default function OcorrenciaPage() {
  const [point, setPoint] = useState<google.maps.LatLngLiteral>()

  function setPointMarker(pointMarker: google.maps.LatLngLiteral) {
    console.log(pointMarker)
    setPoint(pointMarker)
  }

  async function handleCreateOccurrence(event: FormEvent<HTMLFormElement>) {
    console.log('efetuando a criação de ocorrencia')
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const body = {
      titulo: formData.get('title'),
      tipo: formData.get('type'),
      data: formData.get('date'),
      hora: formData.get('time'),
      localizacaoGeografica: [point?.lng, point?.lat],
    }
    console.log(JSON.stringify(body))
    fetch('http://localhost:4444/ocorrencias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
      })

    window.alert('Ocorrência cadastrada com sucesso!')
  }

  return (
    <div className="grid grid-cols-2 gap-28 w-full">
      <div className="py-20">
        <form
          onSubmit={handleCreateOccurrence}
          className="flex flex-col py-10 px-8 gap-6 shadow-lg bg-neutral-50 text-primary rounded-3xl"
        >
          <div className="flex items-center gap-4">
            <label htmlFor="title" className="uppercase w-[20%]">
              Título
            </label>
            <input
              name="title"
              id="title"
              type="text"
              className="border-slate-300 border-[1px] rounded px-2 py-1 w-[60%]"
              required
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
              required
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
              required
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
              required
            />
          </div>
          <button
            type="submit"
            className="bg-secondary mt-4 py-2 px-8 w-auto rounded-3xl hover:text-slate-100 hover:bg-primary ease-in-out duration-300 font-semibold text-center"
          >
            Cadastrar uma nova ocorrência
          </button>
        </form>
      </div>
      <div>
        <MapComponent onClick={setPointMarker} location={null} />
      </div>
    </div>
  )
}
