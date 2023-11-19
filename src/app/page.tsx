'use client'

import Image from 'next/image'
import heroImage from '../../public/hero-image-lg.png'
import funkyBg from '../../public/funky-background.png'
import funkyBgSm from '../../public/funky-background-sm.png'

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-20 w-full text-slate-200">
      <div className="flex flex-col h-[70vh] justify-center">
        <h1 className="font-bold text-5xl mb-4 leading-tight">
          Registre ocorrências, acompanhe o progresso e tome decisões informadas
        </h1>
        <p className="leading-relaxed text-lg border-b-slate-300 border-b-2 pb-4">
          <span className="font-bold text-secondary">
            - tudo em um só lugar.
          </span>{' '}
          Nosso aplicativo simplifica o registro de ocorrências policiais e
          oferece insights poderosos. Mantenha-se informado e seguro com uma
          interface intuitiva que permite relatar incidentes e acompanhar seu
          progresso em tempo real. Visualize dados precisos e relevantes para
          uma compreensão rápida e eficaz das ocorrências em sua região.
        </p>
      </div>
      <div className="flex flex-col h-[70vh] justify-center items-center">
        <Image
          src={heroImage}
          alt="hand with a phone"
          className="relative z-10"
        ></Image>
        <Image
          src={funkyBg}
          alt="funky background"
          className="absolute z-0 top-1/2 left-1/2 transform h-[80vh] w-[42vw] -translate-y-1/2"
        ></Image>
        <Image
          src={funkyBgSm}
          alt="funky background small"
          className="absolute top-3/4 left-[60%] transform z-20 -translate-y-1/2"
        ></Image>
      </div>
    </div>
  )
}
