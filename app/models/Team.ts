import { Player } from "./Player";

export interface Team {
    id: number;
    teamPlayers: Player[];
    score: number;
  }