"use client";
import React from "react";
import styles from "./playerComp.module.scss";
import { Player } from "../../models/Player";

interface PlayerNameProps {
  player: Player;
  setArray: React.Dispatch<React.SetStateAction<Player[]>>;
  arr: Player[];
  playersSelect: Player[];
  setPlayersSelectMvp: React.Dispatch<React.SetStateAction<Player[]>>;
  playersSelectMvp: Player[];
}

const PlayerComp: React.FC<PlayerNameProps> = ({
  player,
  setArray,
  arr,
  playersSelect,
  setPlayersSelectMvp,
  playersSelectMvp,
}) => {
  const removeP = () => {
    setArray(arr.filter((p: Player) => p.id !== player.id));
    playersSelect.push(player);
    setPlayersSelectMvp(
      playersSelectMvp.filter((p: Player) => p.id !== player.id)
    );
  };
  return (
    <div className={styles.playerComboWrapper}>
      <div className={styles.playerComboContent}>{player.label}</div>
      <button className={styles.playerComboXBtn} onClick={() => removeP()}>
        X
      </button>
    </div>
  );
};

export default PlayerComp;
