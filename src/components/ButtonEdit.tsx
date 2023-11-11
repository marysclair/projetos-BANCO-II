'use client'
import { Edit, X } from 'lucide-react'
import { useState } from 'react'
import { MapComponent } from './MapComponent'

export function ButtonEdit() {
  const [isVisible, setIsVisible] = useState(false)
  const [changeLocation, setChangeLocation] = useState(false)
  return (
    <>
      <button
        className="bg-secondary p-2 rounded-2xl hover:text-neutral-50 ease-in-out duration-300"
        onClick={() => {
          setIsVisible(!isVisible)
        }}
      >
        <Edit size={16} />
      </button>
      {isVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-slate-900/70 flex justify-center items-center z-[110]">
          <div className="bg-slate-50 rounded-md w-1/2 h-4/5 flex-col flex z-[110] text-primary">
            <button
              onClick={() => {
                setIsVisible(!isVisible)
              }}
              className="ml-auto m-4 hover:rotate-45 ease-in-out duration-300"
            >
              <X />
            </button>
            <form
              className="flex flex-col pb-10 px-8 gap-6 justify-between h-full"
              onSubmit={() => {
                console.log('atualizou')
              }}
            >
              {changeLocation ? (
                <MapComponent
                  onClick={() => {
                    console.log('oi')
                  }}
                  points={[]}
                />
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
                      className="border-primary border-2 rounded p-2"
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
                      className="border-primary border-2 rounded px-2 py-1 "
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
                      className="border-primary border-2 rounded px-2 py-1 "
                      required
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
          </div>
        </div>
      )}
    </>
  )
}
