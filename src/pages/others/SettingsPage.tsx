import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/baseComponents/Tabs/Tabs"
import AccountSettings from "../../components/settings/AccountSettings"
import ProfileSettings from "../../components/settings/ProfileSettings"
import DevicesSettings from "../../components/settings/DevicesSettings"



export default function SettingsPage() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 bg-background-dark">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Ajustes</h1>

      <Tabs defaultValue="profile" className="space-y-6 sm:space-y-8">
        <TabsList className="mb-4 sm:mb-6 flex flex-wrap">
          <TabsTrigger value="profile" activeClassName="bg-background-blue text-white" className="text-sm sm:text-base">
            Perfil
          </TabsTrigger>
          <TabsTrigger
            value="devices"
            activeClassName="bg-background-orange text-white"
            className="text-sm sm:text-base"
          >
            Dispositivos
          </TabsTrigger>
          <TabsTrigger
            value="account"
            activeClassName="bg-background-green text-white"
            className="text-sm sm:text-base"
          >
            Cuenta
          </TabsTrigger>
        </TabsList>

        <div className="bg-background-medium rounded-lg p-4 sm:p-6">
          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>

          <TabsContent value="devices">
            <DevicesSettings />
          </TabsContent>

          <TabsContent value="account">
            <AccountSettings />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
