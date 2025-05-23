import { LoadingContextType } from "../utils/types"
import { createContext, useContext, useState, type ReactNode } from "react"



const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)

  const showLoading = () => setIsLoading(true)
  const hideLoading = () => setIsLoading(false)

  return <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>{children}</LoadingContext.Provider>
}

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error("useLoading debe usarse dentro de un LoadingProvider")
  }
  return context
}
