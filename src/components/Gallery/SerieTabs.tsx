import { useState } from "react";
import {  TserieInfo } from "../../utils/types";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../baseComponents/Tabs/Tabs";
import { Button } from "../baseComponents/Button/Button";
import { EpisodeItem } from "./EpisodeItem";

export function SerieTabs({ serieInfo }: { serieInfo: TserieInfo }) {
  const [activeTab, setActiveTab] = useState("T0");
  const [episodesToShow, setEpisodesToShow] = useState<{ [key: string]: number }>({ T0: 10 });

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Reinicia episodios visibles a 10 al cambiar de temporada
    setEpisodesToShow({ [tabId]: 10 });
  };

  const handleShowMore = () => {
    setEpisodesToShow((prev) => ({
      ...prev,
      [activeTab]: (prev[activeTab] || 10) + 10,
    }));
  };

  return (
    <>
      {serieInfo === undefined ? (
        <div className="flex items-center w-full h-[400px] justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-main-blue border-t-transparent rounded-full animate-spin"></div>
            <span className="text-text-medium text-sm">
              Cargando Temporadas...
            </span>
          </div>
        </div>
      ) : serieInfo.length === 0 ? (
        <div className="w-full h-[400px] flex items-center">
          <h1 className="text-5xl text-center w-full">No se encontraron temporadas</h1>
        </div>
      ) : (
        <Tabs defaultValue="T0" className="w-full min-h-[400px] h-fit">
          <TabsList className="flex scroll flex-row overflow-x-auto pb-5 thin-scrollbar">
            {serieInfo.map((_, index) => (
              <TabsTrigger
                key={index}
                value={`T${index}`}
                className="bg-transparent border-b-2 min-w-40 text-white rounded-none"
                activeClassName="text-main-green border-main-orange"
                onClick={() => handleTabChange(`T${index}`)}
              >
                {serieInfo[index].season.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {serieInfo.map((temporada, index) => {
            const tabKey = `T${index}`;
            const visibleCount = episodesToShow[tabKey] || 10;
            const totalEpisodes = temporada.episodes.length;
            const visibleEpisodes = temporada.episodes.slice(0, visibleCount);

            return (
              <TabsContent
                key={tabKey}
                value={tabKey}
                className="flex flex-col h-fit min-h-[400px] scroll pr-5 overflow-y-auto thin-scrollbar"
              >
                {visibleEpisodes.map((episode, i) => (
                  <EpisodeItem key={i} episode={episode} />
                ))}

                {visibleCount < totalEpisodes && activeTab === tabKey && (
                  <Button
                    onclick={handleShowMore}
                    className="mt-4 self-center px-4 py-2"
                  >
                    Mostrar más episodios
                  </Button>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      )}
    </>
  );
}
