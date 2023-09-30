"use client";

import Image from "next/image";
import styles from "./pl.module.scss";
import maintenance from "../../../_assets/images/maintenance.png";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useUserContext } from "@/app/context/user";
import { useRouter } from "next/navigation";
import GameRes from "../../../_components/game-result/GameRes";
import { db } from "@/app/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";

const page = () => {
  const [data, setData] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [err, setErr] = useState<string | null>(null);
  const { userRole } = useUserContext();
  const router = useRouter();
  const gamesResultsCollection = collection(db, "leagueScores");

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(gamesResultsCollection);
      let counter: number = 0;
      querySnapshot.docs
        .sort((a, b) => b.data().date - a.data().date)
        .forEach((gameRes, index) => {
          const result: {} = {
            team1: gameRes.data().team1,
            team2: gameRes.data().team2,
            team3: gameRes.data().team3,
            winnerTeam: gameRes.data().winnerTeam,
            mvp: gameRes.data().mvp,
            date: gameRes.data().date,
          };
          counter++;
          data.push(result);
        });
      setTotal(counter);
      setRefresh(!refresh);
    })();
  }, []);

  const removeResCard = async (i: number) => {
    console.log("XXXX");

    if (userRole !== "admin") {
      setErr("Only Admins can add new players!");
      return;
    }
    // const cardToDel = data[i];
    // await deleteDoc(doc(db, "leagueScores", cardToDel));
  };

  return (
    <div className={styles.page}>
      <div className={styles.totalAndBtnWrapper}>
        <div className={styles.total}>
          <p>
            Total <span>{total}</span>
          </p>
        </div>
        <div
          className={styles.addBtn}
          onClick={() => router.push("/add-pl-score")}
        >
          <PostAddIcon color="action" className={styles.addIcon} />
        </div>
      </div>
      {err && <Alert severity="error">{err}</Alert>}
      <div className={styles.results}>
        {data?.map((res, i) => (
          <GameRes
            key={Math.random()}
            teams={[res.team1, res.team2, res.team3]}
            winnerTeam={res.winnerTeam}
            mvp={res.mvp}
            date={res.date}
            removeResCard={() => removeResCard(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
