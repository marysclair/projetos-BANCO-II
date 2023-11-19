import { ButtonEdit } from '../components/ButtonEdit'
import OcurrenceProps from '@/interfaces/OcurenceProps'
import { ButtonDelete } from './ButtonDelete'
import { formatDate } from '@/lib/utils'

export function Ocurrence({ ocurrPoint }: OcurrenceProps) {
  return (
    <div className="bg-neutral-50 w-full rounded-xl py-4 px-6 shadow-xl">
      <div className="flex justify-between mb-4">
        <ButtonEdit ocurrPoint={ocurrPoint} />
        <ButtonDelete ocurrPointId={ocurrPoint.id} />
      </div>
      <h2 className="font-bold mb-1">{ocurrPoint.titulo}</h2>
      <p>Tipo: {ocurrPoint.tipo}</p>
      <p>
        {formatDate(ocurrPoint.data, true)} - {ocurrPoint.hora}
      </p>
    </div>
  )
}
