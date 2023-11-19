'use client'

import ButtonDeleteProps from '@/interfaces/ButtonDeleteProps'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function ButtonDelete({ ocurrPointId }: ButtonDeleteProps) {
  const router = useRouter()
  async function handleDeleteOcurrence() {
    fetch(`http://localhost:4444/ocorrencias/${ocurrPointId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
      })

    window.alert('Ocorrência removida com sucesso! Redirecionando...')
    location.reload()
  }

  return (
    <button
      className="bg-secondary p-2 rounded-2xl hover:text-neutral-50 ease-in-out duration-300"
      onClick={handleDeleteOcurrence}
    >
      <Trash2 size={16} />
    </button>
  )
}
