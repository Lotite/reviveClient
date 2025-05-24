import { useEffect, useState } from "react"
import { FiInfo, FiCheck, FiAlertTriangle, FiAlertCircle, FiX } from "react-icons/fi"
import Dialog from "../Dialog/Dialog"
import { Button } from "../baseComponents/Button/Button"
import { useConfirmContext } from "../../contexts/ConfirmContext"
import { IconType } from "react-icons"
import { TtailwindColors } from "../../utils/types"


export default function ConfirmDialog() {
  const { isOpen, options, handleConfirm, handleCancel } = useConfirmContext()
  const [isExiting, setIsExiting] = useState(false)
  useEffect(() => {
    if (!isOpen) {
      setIsExiting(false)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      handleCancel()
    }, 300)
  }

  const handleConfirmClick = () => {
    setIsExiting(true)
    setTimeout(() => {
      handleConfirm()
    }, 300)
  }

  const handleCancelClick = () => {
    setIsExiting(true)
    setTimeout(() => {
      handleCancel()
    }, 300)
  }
  if (!options || !isOpen) {
    return null
  }

  const getTypeConfig = () : {icon:IconType,bgColor:string,iconBg:string,confirmColor:TtailwindColors["background"]} => {
    switch (options.type) {
      case "success":
        return {
          icon: FiCheck,
          bgColor: "bg-background-green",
          iconBg: "bg-main-green",
          confirmColor: "green",
        }
      case "warning":
        return {
          icon: FiAlertTriangle,
          bgColor: "bg-background-orange",
          iconBg: "bg-main-orange",
          confirmColor: "orange",
        }
      case "error":
        return {
          icon: FiAlertCircle,
          bgColor: "bg-background-hover-error",
          iconBg: "bg-text-error",
          confirmColor: "medium",
        }
      case "info":
      default:
        return {
          icon: FiInfo,
          bgColor: "bg-background-blue",
          iconBg: "bg-main-blue",
          confirmColor: "blue",
        }
    }
  }

  const { icon: IconComponent, iconBg, confirmColor } = getTypeConfig()

  return (
    <Dialog
      display={isOpen ? "flex" : "hidden"}
      onClose={handleClose}
      backgrounColor="dark"
      classContainer={`max-w-md w-full rounded-lg overflow-hidden transition-all duration-300 transform ${
        isExiting ? "scale-95 opacity-0" : "scale-100 opacity-100"
      }`}
    >
      <div className="flex flex-col">
        <div className="flex items-center p-4 border-b border-background-medium2">
          <div className={`${iconBg} p-2 rounded-full mr-3`}>
            <IconComponent className="text-2xl" />
          </div>
          <h2 className="text-lg font-semibold flex-1">{options.title || "Confirmar"}</h2>
          <button
            onClick={handleClose}
            className="text-text-medium hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <FiX />
          </button>
        </div>
        <div className="p-4">
          <p className="text-text-medium">{options.message}</p>
        </div>
        <div className="flex justify-end gap-3 p-4 border-t border-background-medium2">
          <Button color="medium" onclick={handleCancelClick} className="px-4 py-2">
            {options.cancelText || "Cancelar"}
          </Button>
          <Button color={confirmColor} onclick={handleConfirmClick} className="px-4 py-2">
            {options.confirmText || "Aceptar"}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
