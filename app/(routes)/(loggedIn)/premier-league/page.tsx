"use client";

import Image from "next/image";
import styles from "./pl.module.scss";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useUserContext } from "@/app/context/user";
import { useRouter } from "next/navigation";
import GameRes from "../../../_components/game-result/GameRes";
import { db } from "@/app/firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  limit,
  increment,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import {
  W_VALUE,
  LEG_W_VALUE,
  CUP_W_VALUE,
  MVP_VALUE,
  ATT_VALUE,
} from "../../../values";
import { Player } from "@/app/models/Player";
import { Team } from "@/app/models/Team";

const page = () => {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [err, setErr] = useState<string | null>(null);
  const { userRole } = useUserContext();
  const router = useRouter();
  const gamesResultsCollection = collection(db, "leagueScores");

  useEffect(() => {
    getData().then((res) => {
      setData(res);
    });
  }, []);

  const getData = (): Promise<any[]> => {
    const res = (async () => {
      const querySnapshot = await getDocs(gamesResultsCollection);
      let counter: number = 0;
      let resultsArr: any[] = [];
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
          resultsArr.push(result);
        });
      setTotal(counter);
      return resultsArr;
    })();
    return res;
  };

  const removeResCard = async (i: number) => {
    console.log("XXXX", i);

    if (userRole !== "admin") {
      setErr("Error: Only admins can edit or delete scores!");
      return;
    }
    if (!confirm("Are you sure you want to delete this card?")) {
      return;
    } else {
      // confirmed
      const cardToDel = data[i];

      const q = query(
        gamesResultsCollection,
        where("date", "==", cardToDel.date),
        limit(1)
      );

      getDocs(q)
        .then((querySnapshot) => {
          if (querySnapshot.size === 0) {
            console.log("No matching document found.");
          } else {
            const doc = querySnapshot.docs[0];
            console.log("Found document with ID:", doc.id);
            const data = doc.data();
            console.log("Document data:", data);
            deleteDocument("leagueScores", doc.id);
            updateRank(cardToDel);
          }
        })
        .catch((error) => {
          console.error("Error getting documents:", error);
        });
    }
  };

  const deleteDocument = async (collectionName: string, documentId: string) => {
    const docRef = doc(db, "leagueScores", documentId);
    try {
      await deleteDoc(docRef).then(() => {
        console.log(`Document with ID ${documentId} deleted successfully.`);
        getData().then((res) => {
          setData(res);
        });
      });
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const updateRemoveStreak = async (player: Player) => {
    const q = query(
      collection(db, "streakHistory2024"),
      where("playerId", "==", player.id.toString()),
      limit(1)
    );

    let olderStreak: number = 0;
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      //document doesn't exist. return
      return;
    } else {
      //doc found
      olderStreak = querySnapshot.docs[0].data().streakBefore;
    }

    const streakHistoryRef = doc(db, "streakHistory2024", player.id.toString());

    setDoc(
      streakHistoryRef,
      {
        streakBefore: olderStreak,
        currStreak: olderStreak,
        dateUpdated: new Date(),
      },
      { merge: true }
    );
  };

  const updateRank = async (cardToDel: any) => {
    if (cardToDel !== null) {
      let winner: Team = cardToDel.winnerTeam;

      let teamsList;
      if (!cardToDel.team3.length) {
        teamsList = [cardToDel.team1, cardToDel.team2];
      } else {
        teamsList = [cardToDel.team1, cardToDel.team2, cardToDel.team3];
      }

      teamsList.forEach((team) => {
        team.teamPlayers.map((player: Player) => {
          updateRemoveStreak(player); //retrieve older streak before this match from player streak collection

          const w = team.score;
          const legW = cardToDel.winnerTeam.teamPlayers.find(
            (p: Player) => p.id === player.id
          )
            ? 1
            : 0;
          const cupW = 0;
          const mvpCount = player.id === cardToDel.mvp.id ? 1 : 0;
          const att = 1;
          const exp =
            W_VALUE * w +
            LEG_W_VALUE * legW +
            CUP_W_VALUE * cupW +
            MVP_VALUE * mvpCount +
            ATT_VALUE * att;

          const playerRef = doc(db, "players2024stats", player.id.toString());
          setDoc(
            playerRef,
            {
              //mutiplying -1 to decrement the value since firebase doesnt have decrement method yet
              totalWins: increment(w * -1),
              leagueWins: increment(legW * -1),
              cupWins: increment(cupW * -1),
              mvpCount: increment(mvpCount * -1),
              attCount: increment(att * -1),
              exp: increment(exp * -1),
            },
            { merge: true }
          );
        });
      });
    }
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
      {err && (
        <Alert className="mt-4" severity="error">
          {err}
        </Alert>
      )}
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
