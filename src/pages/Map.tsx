import IndoorMapWrapper from "@/components/IndoorMapWrapper";
import useMapData from "@/hooks/useMapData";
import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  MapDataContextType,
  Navigation,
  NavigationContextType,
} from "../utils/types";

export const NavigationContext = createContext<NavigationContextType | null>(null);
export const MapDataContext = createContext<MapDataContextType | null>(null);

function Map() {
  let [searchParams, setSearchParams] = useSearchParams();
  const defaultPosition = "v35";
  const startPosition = searchParams.get("position") || defaultPosition;
  const [navigation, setNavigation] = useState<Navigation>({
    start: startPosition,
    end: "",
  });
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const navigationValue: NavigationContextType = {
    navigation,
    setNavigation,
    isEditMode,
    setIsEditMode,
  };

  useEffect(() => {
    setSearchParams({ position: navigation.start });
  }, [navigation.start]);

  const mapData = useMapData();

  return (
    <MapDataContext.Provider value={mapData}>
      <NavigationContext.Provider value={navigationValue}>
        <div className="flex bg-gray-100 text-gray-800 w-full h-screen">
          <main className="flex w-full justify-center flex-grow flex-col md:p-10 p-2">
            <div className="center w-full h-full">
              <IndoorMapWrapper />
            </div>
          </main>
        </div>
      </NavigationContext.Provider>
    </MapDataContext.Provider>
  );
}

export default Map;
