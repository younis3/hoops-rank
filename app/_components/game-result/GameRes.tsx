"use-client";
import React, { useEffect, useState } from "react";
import styles from "./GameRes.module.scss";
import { Team } from "@/app/models/Team";
import { Player } from "@/app/models/Player";
import moment from "moment";
import { Timestamp } from "firebase/firestore";

interface GameResProps {
  teams: Team[];
  winnerTeam: Team;
  mvp: Player;
  date: Timestamp;
}

const GameRes: React.FC<GameResProps> = ({ teams, winnerTeam, mvp, date }) => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const weekday: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const convertDate = (date: Timestamp): string => {
    const timeStamp = new Timestamp(date.seconds, date.nanoseconds);
    const convertedDate = timeStamp.toDate();
    return moment(new Date(convertedDate)).format("DD-MM-YYYY");
  };

  useEffect(() => {
    // console.log(teams);
  }, []);

  return (
    <div className={styles.componentContainer}>
      <div>
        <p className={styles.date}>
          {
            weekday[
              new Timestamp(date.seconds, date.nanoseconds).toDate().getDay()
            ]
          }
        </p>
        <span className="text-white"> | </span>
        <p className={styles.date}>{convertDate(date)}</p>
      </div>
      {teams.length &&
        teams.map((team) =>
          team.teamPlayers.length > 0 ? (
            <div key={Math.random()} className={styles.teamWrapper}>
              {team.id === winnerTeam.id && <p className="pr-1 text-lg">🏆 </p>}

              <div
                className={
                  team.id === winnerTeam.id ? styles.winnerTeam : styles.team
                }
              >
                {team.teamPlayers.map((p, index) => (
                  <p key={p.label + Math.random()} className={styles.player}>
                    {p.label}
                    {index === team.teamPlayers.length - 1 ? "" : ", "}
                  </p>
                ))}
                <p className={styles.teamScore}> ({team.score})</p>
              </div>
            </div>
          ) : (
            ""
          )
        )}
      <div>
        <p className={styles.mvp}>🥇 MVP: {mvp.label}</p>
      </div>
    </div>
  );
};

export default GameRes;
