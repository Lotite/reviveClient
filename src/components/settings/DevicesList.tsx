import { TdevicesList } from "../../utils/types"
import DeviceItem from "./DeviceItem"




export default function DevicesList({ devices, onDelete }: { devices: TdevicesList; onDelete?: () => void }) {
  return (
    <div className="space-y-3">
      {
        devices.map((device) => <DeviceItem key={device.id} device={device} onDelete={onDelete} />)
      }
    </div>
  )
}
