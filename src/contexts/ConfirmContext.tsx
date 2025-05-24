import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { ConfirmContextType, ConfirmOptions } from "../utils/types"

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined)

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<ConfirmOptions | null>(null)
  const [resolveRef, setResolveRef] = useState<((value: boolean) => void) | null>(null)

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    setOptions(options)
    setIsOpen(true)

    return new Promise<boolean>((resolve) => {
      setResolveRef(() => resolve)
    })
  }, [])

  const handleConfirm = useCallback(() => {
    if (options?.onConfirm) {
      options.onConfirm()
    }
    if (resolveRef) {
      resolveRef(true)
    }
    setIsOpen(false)
  }, [options, resolveRef])

  const handleCancel = useCallback(() => {
    if (options?.onCancel) {
      options.onCancel()
    }
    if (resolveRef) {
      resolveRef(false)
    }
    setIsOpen(false)
  }, [options, resolveRef])

  return (
    <ConfirmContext.Provider
      value={{
        confirm,
        isOpen,
        options,
        handleConfirm,
        handleCancel,
      }}
    >
      {children}
    </ConfirmContext.Provider>
  )
}


export function useConfirm() {
  const context = useContext(ConfirmContext)
  if (context === undefined) {
    throw new Error("useConfirm debe usarse dentro de un ConfirmProvider")
  }
  return context.confirm
}
export function useConfirmContext() {
  const context = useContext(ConfirmContext)
  if (context === undefined) {
    throw new Error("useConfirmContext debe usarse dentro de un ConfirmProvider")
  }
  return context
}