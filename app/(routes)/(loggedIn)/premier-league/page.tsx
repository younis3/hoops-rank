"use client";

import Image from "next/image";
import styles from "./pl.module.scss";
import maintenance from "../../../_assets/images/maintenance.png";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useUserContext } from "@/app/context/user";
import { useRouter } from "next/navigation";
import GameRes from "../../../_components/game-result/GameRes";
import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const page = () => {
  const [data, setData] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const { userRole } = useUserContext();
  const router = useRouter();
  const gamesResultsCollection = collection(db, "leagueScores");

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(gamesResultsCollection);
      querySnapshot.docs
        .sort((a, b) => b.data().date - a.data().date)
        .forEach((playerDoc, index) => {
          const result: {} = {
            team1: playerDoc.data().team1,
            team2: playerDoc.data().team2,
            team3: playerDoc.data().team3,
            winnerTeam: playerDoc.data().winnerTeam,
            mvp: playerDoc.data().mvp,
            date: playerDoc.data().date,
          };
          data.push(result);
        });
      setRefresh(!refresh);
    })();
  }, []);

  return (
    <div className={styles.page}>
      <div
        className={styles.addBtn}
        onClick={() => router.push("/add-pl-score")}
      >
        <PostAddIcon color="action" className={styles.addIcon} />
      </div>
      <div className={styles.results}>
        {data?.map((res) => (
          <GameRes
            key={Math.random()}
            teams={[res.team1, res.team2, res.team3]}
            winnerTeam={res.winnerTeam}
            mvp={res.mvp}
            date={res.date}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
