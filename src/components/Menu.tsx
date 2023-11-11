'use client'

export function Menu() {
  return (
    <>
      <a
        href="/newocorrencia"
        className={
          window.location.pathname.includes('/newocorrencia')
            ? 'hover:text-secondary ease-in-out duration-300 text-secondary'
            : 'hover:text-secondary ease-in-out duration-300 text-neutral-50'
        }
      >
        Cadastrar ocorrências
      </a>

      <a
        href="/ocorrencias"
        className={
          window.location.pathname.includes('/ocorrencias')
            ? 'hover:text-secondary ease-in-out duration-300 text-secondary'
            : 'hover:text-secondary ease-in-out duration-300 text-neutral-50'
        }
      >
        Visualizar ocorrências
      </a>
    </>
  )
}
