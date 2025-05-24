import { FiSmartphone, FiMonitor, FiTablet, FiClock, FiCalendar } from "react-icons/fi"
import type { Tdevice } from "../../utils/types"
import { Button } from "../baseComponents/Button/Button"
import ServerApi from "../../services/ServerApi";
import { useConfirm } from "../../contexts/ConfirmContext";
import { useNotification } from "../../contexts/NotificationContext";


export default function DeviceItem({ device, onDelete }: { device: Tdevice; onDelete?: () => void }) {
  const sessionDeviceId = sessionStorage.getItem("device") || ""

  const isCurrentDevice = device.id == sessionDeviceId
  const confirm = useConfirm()
  const { addNotification } = useNotification()



  const getDeviceType = (deviceName: string): "movil" | "ordenador" => {
    const mobilePhrases = [
      "iphone",
      "android",
      "samsung",
      "xiaomi",
      "huawei",
      "oppo",
      "vivo",
      "realme",
      "oneplus",
      "pixel",
      "ipad",
      "tablet",
      "phone",
    ]
    const computerPhrases = [
      "windows",
      "mac",
      "macbook",
      "pc",
      "desktop",
      "linux",
      "ubuntu",
      "fedora",
      "debian",
      "mint",
      "chrome",
      "chromebook",
    ]

    const lowerName = deviceName.toLowerCase()

    for (const phrase of mobilePhrases) {
      if (lowerName.includes(phrase)) {
        return "movil"
      }
    }

    for (const phrase of computerPhrases) {
      if (lowerName.includes(phrase)) {
        return "ordenador"
      }
    }

    return "ordenador"
  }

  const deviceType = getDeviceType(device.device_name)

 

  const getTimeAgo = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffMs = now.getTime() - date.getTime()
      const diffSecs = Math.floor(diffMs / 1000)
      const diffMins = Math.floor(diffSecs / 60)
      const diffHours = Math.floor(diffMins / 60)
      const diffDays = Math.floor(diffHours / 24)

      if (diffDays > 0) {
        return `Hace ${diffDays} ${diffDays === 1 ? "día" : "días"}`
      } else if (diffHours > 0) {
        return `Hace ${diffHours} ${diffHours === 1 ? "hora" : "horas"}`
      } else if (diffMins > 0) {
        return `Hace ${diffMins} ${diffMins === 1 ? "minuto" : "minutos"}`
      } else {
        return "Hace unos segundos"
      }
    } catch (error) {
      return "Tiempo desconocido"
    }
  }


  const DeviceIcon = () => {
    switch (deviceType) {
      case "movil":
        return device.device_name.toLowerCase().includes("ipad") ||
          device.device_name.toLowerCase().includes("tablet") ? (
          <FiTablet className="text-lg sm:text-xl" />
        ) : (
          <FiSmartphone className="text-lg sm:text-xl" />
        )
      case "ordenador":
        return <FiMonitor className="text-lg sm:text-xl" />
      default:
        return <FiMonitor className="text-lg sm:text-xl" />
    }
  }


  const deleteDevice = async () => {

    const confirmDelete = await confirm(
      {title:"Eliminar dispositivo", message: "¿Estás seguro de que quieres eliminar este dispositivo? Esta acción es permanente.", type:"warning", confirmText: "Eliminar"}
    )
    if (confirmDelete) {

      const response = await ServerApi.deleteDevice(device.id)
      if (response.success) {
        addNotification({
          type: "success",
          message: "Se eliminó el dispositivo correctamente",
          duration: 3000,
        })
        if (onDelete) {
          onDelete()
        }
        return
      }
      addNotification({
        type: "error",
        message: response.message,
        duration: 3000,
      })
    }
  }

  return (
    <div className="p-3 sm:p-4 border border-background-medium2 rounded-md bg-background-dark">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-background-medium rounded-md text-text-white">
          <DeviceIcon />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-medium text-sm sm:text-base">{device.device_name}</h3>
          <div className="mt-1 sm:mt-2 space-y-1 text-xs sm:text-sm">
            <div className="flex items-center text-text-medium">
              <FiClock className="mr-1.5 flex-shrink-0" />
              <span>Última sesión: {getTimeAgo(device.last_active_timestamp)}</span>
            </div>
            <div className="flex items-center text-text-medium">
              <FiCalendar className="mr-1.5 flex-shrink-0" />
              <span>Registrado: {device.register_at}</span>
            </div>
          </div>
        </div>
        <div>
          {!isCurrentDevice && (
            <Button
              onclick={deleteDevice}
              className="bg-red-600 hover:bg-red-700 active:bg-red-900 px-3"
            >
              Eliminar
            </Button>
          )}
          {isCurrentDevice && (
            <div className="px-6 text-xl py-1 bg-background-green rounded text-center font-semibold">
              Actual
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
