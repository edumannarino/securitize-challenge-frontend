import { createContext, useState , ReactNode } from "react";

const ModalMessageContext = createContext({message: '', displayModalMessage: (message: string, timeout = 3000) => {} });

type ModelMessageProviderProps = {
  children: ReactNode
}
const ModalMessageProvider = ({ children }: ModelMessageProviderProps) => {
  const [message, setMessage] = useState<string>('')

  const displayModalMessage = (message: string) => {
    setMessage(message)
  }
  const data = { message, displayModalMessage }

  return <ModalMessageContext.Provider value={data}>
    { children }
  </ModalMessageContext.Provider>
}
export { ModalMessageProvider }
export default ModalMessageContext