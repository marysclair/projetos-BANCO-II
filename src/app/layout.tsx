import './globals.css'
import { Inter } from 'next/font/google'
import { Menu } from '@/components/Menu'
import { Home } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CrimeTalk',
  description:
    'Website desenvolvido para a disciplina de Banco de Dados II 2023.2 no qual permite registrar e visualizar pontos de ocorrência policiais cadastrados',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-primary text-neutral-50`}>
        <main className="flex flex-col">
          <header className="h-28 flex items-center justify-between tracking-wider py-6 px-32">
            <div className="flex gap-1 items-center transition ease-in-out delay-150 hover:text-secondary duration-300">
              <Home size={20} />
              <a href="/" className="text-secondary font-semibold text-xl">
                <span className="text-terciary">Crime</span>Talk
              </a>
            </div>
            <div className="flex gap-12 font-medium ">
              <Menu />
            </div>
          </header>
          <div className="flex flex-col w-10/12 items-center my-12 mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
