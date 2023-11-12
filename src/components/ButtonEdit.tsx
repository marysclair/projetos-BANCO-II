'use client'
import { Edit, X } from 'lucide-react'
import { useState } from 'react'

import ButtonEditProps from '@/interfaces/ButtonEditProps'
import { FormUpdateOcurrence } from './FormUpdateOcurrence'

export function ButtonEdit({ ocurrPoint }: ButtonEditProps) {
  const [isVisible, setIsVisible] = useState(false)

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
            <FormUpdateOcurrence ocurrPoint={ocurrPoint} />
          </div>
        </div>
      )}
    </>
  )
}
