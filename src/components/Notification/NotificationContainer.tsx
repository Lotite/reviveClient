import { useState, useEffect } from "react"
import { FiInfo, FiCheck, FiAlertTriangle, FiX, FiAlertCircle } from "react-icons/fi"
import { useNotification } from "../../contexts/NotificationContext"
import { NotificationItemProps } from "../../utils/types"

export default function NotificationContainer() {
  const { notifications, removeNotification } = useNotification()

  return (
    <div className="fixed top-4 right-4  flex z-[9999] flex-col gap-3 max-w-md w-full">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} onRemove={removeNotification} />
      ))}
    </div>
  )
}



function NotificationItem({ notification, onRemove }: NotificationItemProps) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const duration = notification.duration || 5000
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleRemove()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const handleRemove = () => {
    setIsExiting(true)
    setTimeout(() => {
      onRemove(notification.id)
    }, 300)
  }
  const getTypeConfig = () => {
    switch (notification.type) {
      case "success":
        return {
          icon: <FiCheck className="text-xl" />,
          bgColor: "bg-background-green",
          borderColor: "border-main-green",
          textColor: "text-white",
          iconBg: "bg-main-green",
        }
      case "warning":
        return {
          icon: <FiAlertTriangle className="text-xl" />,
          bgColor: "bg-background-orange",
          borderColor: "border-main-orange",
          textColor: "text-white",
          iconBg: "bg-main-orange",
        }
      case "error":
        return {
          icon: <FiAlertCircle className="text-xl" />,
          bgColor: "bg-background-hover-error",
          borderColor: "border-text-error",
          textColor: "text-white",
          iconBg: "bg-text-error",
        }
      case "info":
      default:
        return {
          icon: <FiInfo className="text-xl" />,
          bgColor: "bg-background-blue",
          borderColor: "border-main-blue",
          textColor: "text-white",
          iconBg: "bg-main-blue",
        }
    }
  }

  const { icon, bgColor, borderColor, textColor, iconBg } = getTypeConfig()

  return (
    <div
      className={`
        flex items-start rounded-lg border shadow-lg overflow-hidden
        transition-all duration-300 transform
        ${isExiting ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"}
        ${bgColor} ${borderColor} ${textColor}
      `}
      role="alert"
      aria-live="assertive"
    >
      <div className={`${iconBg} p-4 flex items-center justify-center`}>{icon}</div>

      <div className="flex-1 p-4 pr-2">
        {notification.title && <h4 className="font-semibold mb-1">{notification.title}</h4>}
        <p className="text-sm opacity-90">{notification.message}</p>
      </div>

      <button
        onClick={handleRemove}
        className="p-4 text-white opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Cerrar notificación"
      >
        <FiX />
      </button>
    </div>
  )
}
