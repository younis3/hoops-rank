"use client";

const CURRENT_SEASON = 2;

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ContextProps {
  CURRENT_SEASON: number;
  season: string;
  setSeason: Dispatch<SetStateAction<string>>;
}

const SeasonSelectionContext = createContext<ContextProps>({
  CURRENT_SEASON: 0,
  season: "",
  setSeason: (): string => "1",
});

export const SeasonSelectionContextProvider = ({ children }: any) => {
  const [season, setSeason] = useState(CURRENT_SEASON.toString());
  return (
    <SeasonSelectionContext.Provider
      value={{ CURRENT_SEASON, season, setSeason }}
    >
      {children}
    </SeasonSelectionContext.Provider>
  );
};

export const useSeasonSelectionContext = () =>
  useContext(SeasonSelectionContext);
