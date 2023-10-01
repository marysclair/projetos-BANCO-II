import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Registro de ocorrências',
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
      <body className={`${inter.className} bg-neutral-50`}>
        <main className="flex flex-col">
          <header className="h-20 bg-indigo-950 flex items-center justify-center font-semibold text-xl text-neutral-50 tracking-wider uppercase">
            <h1> registro de pontos de ocorrência </h1>
          </header>
          <div className="flex flex-col w-9/12 items-center my-12 mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
