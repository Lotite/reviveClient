import { useState, useEffect } from "react"
import DevicesList from "./DevicesList"
import { TdevicesList } from "../../utils/types"
import { Button } from "../baseComponents/Button/Button"
import ServerApi from "../../services/ServerApi"
import { useConfirm } from "../../contexts/ConfirmContext"
import { useNotification } from "../../contexts/NotificationContext"


export default function DevicesSettings() {
  const [devices, setDevices] = useState<TdevicesList>([])
  const [isLoading, setIsLoading] = useState(true)
  const confirm = useConfirm();
  const {addNotification} = useNotification();

  useEffect(() => {
    (async()=>{await loadDevices();})()
  }, [])

  const loadDevices = async () => {
    setIsLoading(true);
    const deviesFetch = await ServerApi.getUserDevices(); 
    setDevices(deviesFetch.data!);
    setIsLoading(false);
  }



  const deleteOtherDevices = async () => {
    await confirm({
        title:"Eliminar todos los dispositivos",
        message: "¿Estás seguro de que quieres eliminar todos los dispositivos?",
        type: "warning", 
        confirmText: "Eliminar",
        onConfirm: async () => {
          const response = await ServerApi.deleteOtherDevices();
          if (response.success) {
            addNotification({
              type: "success",
              message: "Dispositivos eliminados correctamente",
            });
            loadDevices();
          } else {
            addNotification({
              type: "error",
              message: "Error al eliminar los dispositivos",
            });
          }
        }
      })
    
    
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold text-white">Dispositivos conectados</h2>
        <Button
          onclick={deleteOtherDevices}
          color="orange"
          className="px-3 py-1.5 text-sm w-full sm:w-auto"
          disabled={devices.length === 0}
        >
          Eliminar todos los dispositivos
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-6 sm:py-8">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-main-orange"></div>
        </div>
      ) : (
        <DevicesList devices={devices} onDelete={loadDevices} />
      )}
    </div>
  )
}
