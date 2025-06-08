import { createContext, useContext, useState } from "react"
import { TabsContextType, TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps } from "../../../utils/types"


const TabsContext = createContext<TabsContextType | undefined>(undefined)

function useTabsContext() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs components must be used within a TabsProvider")
  }
  return context
}

export function Tabs({ defaultValue, children, className = "" }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className = "" }: TabsListProps) {
  return <div className={`flex gap-2 ${className}`}>{children}</div>
}

export function TabsTrigger({
  value,
  children,
  className = "",
  activeClassName = "bg-background-blue text-white",
  inactiveClassName = "bg-background-medium text-text-medium hover:text-white",
  onClick
}: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useTabsContext()
  const isActive = activeTab === value

  return (
    <button
      onClick={() => { if (onClick) onClick(); setActiveTab(value); }}
      className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition-colors ${isActive ? activeClassName : inactiveClassName} ${className}`}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children, className = "" }: TabsContentProps) {
  const { activeTab } = useTabsContext()

  if (activeTab !== value) return null

  return <div className={className}>{children}</div>
}
