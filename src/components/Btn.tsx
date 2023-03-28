import { ReactNode } from "react"

type BtnProps = {
  children: ReactNode ,
  align: string,
  title: string
  style: React.CSSProperties,
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Btn = ({ children, align, title, style, onClick}: BtnProps) => {
  return (
    <button 
      className={`border-0 bg-transparent ${align}`}
      title={title}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  )
}