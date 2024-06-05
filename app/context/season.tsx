"use client";

const CURRENT_SEASON = 3;

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContextProps {
  CURRENT_SEASON: number;
  season: string;
  setSeason: Dispatch<SetStateAction<string>>;
  leagueScoresCollection: string;
  setLeagueScoresCollection: Dispatch<SetStateAction<string>>;
  playerStatsCollection: string;
  setPlayerStatsCollection: Dispatch<SetStateAction<string>>;
  streakHistoryCollection: string;
  setStreakHistoryCollection: Dispatch<SetStateAction<string>>;
}

const SeasonSelectionContext = createContext<ContextProps>({
  CURRENT_SEASON: 0,
  season: "",
  setSeason: (): string => "1",
  leagueScoresCollection: "",
  setLeagueScoresCollection: (): string => "leagueScores",
  playerStatsCollection: "",
  setPlayerStatsCollection: (): string => "players2024stats",
  streakHistoryCollection: "",
  setStreakHistoryCollection: (): string => "streakHistory2024",
});

export const SeasonSelectionContextProvider = ({ children }: any) => {
  const [season, setSeason] = useState(CURRENT_SEASON.toString());

  //the following code is to determine which collections to load in the app based on season number
  const [leagueScoresCollection, setLeagueScoresCollection] =
    useState("leagueScores");
  const [playerStatsCollection, setPlayerStatsCollection] =
    useState("players2024stats");
  const [streakHistoryCollection, setStreakHistoryCollection] =
    useState("streakHistory2024");

  useEffect(() => {
    if (season === "1") {
      setLeagueScoresCollection("leagueScores");
      setPlayerStatsCollection("players2024stats");
      setStreakHistoryCollection("streakHistory2024");
    } else {
      setLeagueScoresCollection("leagueScores" + "S" + season);
      setPlayerStatsCollection("playerStats" + "S" + season);
      setStreakHistoryCollection("streakHistory" + "S" + season);
    }
  }, [season]);

  return (
    <SeasonSelectionContext.Provider
      value={{
        CURRENT_SEASON,
        season,
        setSeason,
        leagueScoresCollection,
        playerStatsCollection,
        streakHistoryCollection,
        setLeagueScoresCollection,
        setPlayerStatsCollection,
        setStreakHistoryCollection,
      }}
    >
      {children}
    </SeasonSelectionContext.Provider>
  );
};

export const useSeasonSelectionContext = () =>
  useContext(SeasonSelectionContext);
