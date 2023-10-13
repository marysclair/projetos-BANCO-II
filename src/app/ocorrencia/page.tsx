'use client'

import { FormEvent, useState } from 'react'
import { MapComponent } from '@/components/MapComponent'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function OcorrenciaPage() {
  const router = useRouter()

  const [point, setPoint] = useState<google.maps.LatLngLiteral>()

  function setPointMarker(pointMarker: google.maps.LatLngLiteral) {
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
      localizacaoGeografica: [point?.lat, point?.lng],
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

    window.alert('Ocorência cadastrada com sucesso! Redirecionando...')
    router.push('/')
  }

  return (
    <div>
      <div className="w-full flex h-[511.992px] items-center justify-center gap-32">
        <div className="w-[550px]">
          <form
            onSubmit={handleCreateOccurrence}
            className="flex flex-col py-10 px-8 gap-6 bg-indigo-950 text-neutral-50 rounded-3xl"
          >
            <div className="flex items-center gap-4">
              <label htmlFor="title" className="uppercase w-[20%]">
                Título
              </label>
              <input
                name="title"
                id="title"
                type="text"
                className="border-none rounded-3xl px-2 py-1 w-[60%] text-indigo-950"
                required
              />
            </div>
            {/* <div className="flex justify-between"> */}
            <div className="flex items-center gap-4">
              <label htmlFor="" className="uppercase w-[20%]">
                Tipo
              </label>
              <select
                name="type"
                id="type"
                className="border-none rounded-3xl px-2 py-1 text-indigo-950"
                required
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
                className="border-none rounded-3xl px-2 py-1 text-indigo-950"
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
                className="border-none rounded-3xl px-2 py-1 text-indigo-950"
                required
              />
            </div>
            {/* </div> */}
            <button
              type="submit"
              className="bg-neutral-50 text-indigo-950 mt-4 py-2 px-8 w-auto rounded-3xl hover:text-neutral-50 hover:bg-indigo-900 ease-in-out duration-300 font-semibold text-center"
            >
              Cadastrar uma nova ocorrência
            </button>
          </form>
        </div>
        <div className="w-[550px]">
          <MapComponent onClick={setPointMarker} positions={[]} />
        </div>
      </div>
      <div className="flex">
        <Link
          href="/"
          className="bg-indigo-950 text-neutral-50 mt-12 py-2 px-8 w-auto rounded-3xl hover:bg-indigo-900 ease-in-out duration-300 font-semibold ml-auto"
        >
          Voltar
        </Link>
      </div>
    </div>
  )
}
