"use client";

import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDocs,
  increment,
  where,
  query,
  limit,
} from "firebase/firestore";

import styles from "./add-pl-score.module.scss";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import AddPlayerScoreModal from "../../../_components/modals/add-player-score-modal/AddPlayerScoreModal";
import { useContext, useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { db } from "@/app/firebase";
import moment, { max } from "moment";
import { Player } from "../../../models/Player";
import { Team } from "../../../models/Team";

import PlayerComp from "../../../_components/player-comp/playerComp";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/context/user";
import {
  W_VALUE,
  LEG_W_VALUE,
  CUP_W_VALUE,
  MVP_VALUE,
  ATT_VALUE,
} from "../../../values";
import { useSeasonSelectionContext } from "@/app/context/season";

const page = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<Player | null>(null);
  const [modalNum, setModalNum] = useState<number>(1);
  const [team1, setTeam1] = useState<Player[]>([]);
  const [team2, setTeam2] = useState<Player[]>([]);
  const [team3, setTeam3] = useState<Player[]>([]);
  const [scoreTeam1, setScoreTeam1] = useState<number>(0);
  const [scoreTeam2, setScoreTeam2] = useState<number>(0);
  const [scoreTeam3, setScoreTeam3] = useState<number>(0);
  const [mvp, setMvp] = useState<Player | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [playersSelect, setPlayersSelect] = useState<Player[]>([]);
  const [playerSelectMvp, setPlayerSelectMvp] = useState<Player[]>([]);
  const [err, setErr] = useState<string>("");
  const router = useRouter();

  const { userRole } = useUserContext();

  const leagueScoresCollection = collection(db, "leagueScores");
  const playersCollection = collection(db, "players");
  const { CURRENT_SEASON, season } = useSeasonSelectionContext();

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(playersCollection);
      querySnapshot.forEach((playerDoc) => {
        const player: Player = {
          id: playerDoc.data().id,
          label: playerDoc.data().name,
        };
        playersSelect.push(player);
      });
    })();
  }, []);

  const openModal = (teamNum: number) => {
    // if (teamNum === 3 && (team2.length < 2 || team1.length < 2)) return;
    setModalNum(teamNum);
    setIsModalVisible(true);
  };

  const hanldleModalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (modalNum !== 4) {
      if (playerName === null) {
        return;
      }

      if (
        team1?.find((e) => e.id === playerName.id) ||
        team2?.find((e) => e.id === playerName.id) ||
        team3?.find((e) => e.id === playerName.id)
      ) {
        return;
      }
    }
    if (playerName) {
      if (modalNum === 1) {
        if (team1.length < 6) {
          //limit 6 players per team
          playerName.teamNum = 1;
          team1.push(playerName);
          playerSelectMvp.push(playerName); //add to mvp select array
        }
      } else if (modalNum === 2) {
        if (team2.length < 6) {
          playerName.teamNum = 2;
          team2.push(playerName);
          playerSelectMvp.push(playerName);
        }
      } else if (modalNum === 3) {
        if (team3.length < 6) {
          playerName.teamNum = 3;
          team3.push(playerName);
          playerSelectMvp.push(playerName);
        }
      } else if (modalNum === 4) {
        setMvp(playerName);
      }

      setPlayersSelect(
        playersSelect.filter((p: Player) => p.id !== playerName.id)
      );
    }

    setPlayerName(null);
    setIsModalVisible(false);
  };

  const updateStreak = async (player: Player, legW: number) => {
    const q = query(
      collection(db, "streakHistory2024"),
      where("playerId", "==", player.id.toString()),
      limit(1)
    );

    let isNew: boolean;
    let currStreakOld: number = 0;
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      //document doesn't exist. create new
      isNew = true;
    } else {
      isNew = false;
      currStreakOld = querySnapshot.docs[0].data().currStreak;
    }

    const streakHistoryRef = doc(db, "streakHistory2024", player.id.toString());

    if (isNew) {
      setDoc(
        streakHistoryRef,
        {
          playerName: player.label,
          playerId: player.id,
          streakBefore: 0,
          currStreak: legW === 1 ? 1 : 0,
          dateUpdated: new Date(),
        },
        { merge: true }
      );
    } else {
      setDoc(
        streakHistoryRef,
        {
          streakBefore: currStreakOld,
          currStreak: legW === 1 ? increment(legW) : 0,
          dateUpdated: new Date(),
        },
        { merge: true }
      );
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userRole !== "admin") {
      setErr("Only Admins can update scores!");
      openModal(5);
      return;
    }

    if (CURRENT_SEASON.toString() !== season) {
      setErr("Selected season has already ended!");
      openModal(5);
      return;
    }

    if (scoreTeam1 < 0 || scoreTeam2 < 0 || scoreTeam3 < 0) {
      setErr("Invalid Score!");
      return;
    }
    if (!team1.length || !team2.length) {
      setErr("Error: teams are not valid!");
      return;
    }
    if (team1.length < 2 && team2.length < 2 && team3.length > 0) {
      setErr("Invalid team 3!");
      return;
    }

    //check if selected date is valid
    const todayDate = new Date();

    if (date > todayDate) {
      setErr("Error: invalid date!");
      return;
    }

    if (!team3.length) {
      setScoreTeam3(0);
    }

    const teamOne: Team = { id: 1, teamPlayers: team1, score: scoreTeam1 };
    const teamTwo: Team = { id: 2, teamPlayers: team2, score: scoreTeam2 };
    const teamThree: Team = { id: 3, teamPlayers: team3, score: scoreTeam3 };

    //check winner
    let winner: Team | null;

    let teamsList;
    if (!team3.length) {
      teamsList = [teamOne, teamTwo];
    } else {
      teamsList = [teamOne, teamTwo, teamThree];
    }

    winner = teamsList.reduce((max, current) =>
      max.score > current.score ? max : current
    );

    //check if max score is tied with another team
    let arr = teamsList.filter((t) => t.score === winner?.score);
    if (arr.length > 1) {
      winner = null;
    }

    //update players stats in db
    teamsList.forEach((team) => {
      team.teamPlayers.map((player) => {
        const w = team.score;
        const legW = winner?.teamPlayers?.find((p) => p === player) ? 1 : 0;
        const cupW = 0;
        const mvpCount = player === mvp ? 1 : 0;
        const att = 1;
        const exp =
          W_VALUE * w +
          LEG_W_VALUE * legW +
          CUP_W_VALUE * cupW +
          MVP_VALUE * mvpCount +
          ATT_VALUE * att;

        updateStreak(player, legW); //update player wins streak in streak history collection

        const playerRef = doc(db, "players2024stats", player.id.toString());
        setDoc(
          playerRef,
          {
            playerName: player.label,
            totalWins: increment(w),
            leagueWins: increment(legW),
            cupWins: increment(cupW),
            mvpCount: increment(mvpCount),
            attCount: increment(att),
            exp: increment(exp),
            latestAtt: new Date(),
            playerId: player.id,
          },
          { merge: true }
        );
      });
    });

    //add team scores result to db
    await addDoc(leagueScoresCollection, {
      team1: teamOne,
      team2: teamTwo,
      team3: teamThree,
      winnerTeam: winner,
      mvp: mvp,
      date: date,
    }).then(() => {
      router.push("premier-league");
    });
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className="text-center text-black mt-4"> - Season {season} - </h1>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.inputWrapper}>
          <label htmlFor="team1">Team 1</label>
          <div className={styles.inputWrapper}>
            <label htmlFor="score1" className={styles.scoreLabel}>
              Score:
            </label>
            <input
              type="number"
              id="score1"
              className={styles.scoreInput}
              onChange={(e) => setScoreTeam1(parseInt(e.target.value))}
            />
          </div>
          <div className={styles.addPlayerWrapper} onClick={() => openModal(1)}>
            <PersonAddIcon className={styles.addPlayer} />
          </div>
          <div className={styles.players} id="team1">
            {team1 && team1.length ? (
              team1.map((p) => (
                <PlayerComp
                  key={Math.random + "i" + p.label}
                  player={p}
                  setArray={setTeam1}
                  arr={team1}
                  playersSelect={playersSelect}
                  playersSelectMvp={playerSelectMvp}
                  setPlayersSelectMvp={setPlayerSelectMvp}
                />
              ))
            ) : (
              <p></p>
            )}
          </div>
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="team2">Team 2</label>
          <div className={styles.inputWrapper}>
            <label htmlFor="score2" className={styles.scoreLabel}>
              Score:
            </label>
            <input
              type="number"
              id="score2"
              className={styles.scoreInput}
              onChange={(e) => setScoreTeam2(parseInt(e.target.value))}
            />
          </div>
          <div className={styles.addPlayerWrapper} onClick={() => openModal(2)}>
            <PersonAddIcon className={styles.addPlayer} />
          </div>

          <div className={styles.players} id="team2">
            {team2.map((p) => (
              <PlayerComp
                key={Math.random + "i" + p.label}
                player={p}
                setArray={setTeam2}
                arr={team2}
                playersSelect={playersSelect}
                playersSelectMvp={playerSelectMvp}
                setPlayersSelectMvp={setPlayerSelectMvp}
              />
            ))}
          </div>
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="team3">Team 3</label>
          <div className={styles.inputWrapper}>
            <label htmlFor="score3" className={styles.scoreLabel}>
              Score:
            </label>
            <input
              type="number"
              id="score3"
              disabled={team3.length === 0 ? true : false}
              className={styles.scoreInput}
              onChange={(e) => setScoreTeam3(parseInt(e.target.value))}
            />
          </div>

          <div className={styles.addPlayerWrapper} onClick={() => openModal(3)}>
            <PersonAddIcon className={styles.addPlayer} />
          </div>
          <div className={styles.players} id="team3">
            {team3.map((p) => (
              <PlayerComp
                key={Math.random + "i" + p.label}
                player={p}
                setArray={setTeam3}
                arr={team3}
                playersSelect={playersSelect}
                playersSelectMvp={playerSelectMvp}
                setPlayersSelectMvp={setPlayerSelectMvp}
              />
            ))}
          </div>
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="mvp">MVP</label>
          <input
            type="text"
            id="mvp"
            readOnly={true}
            className={styles.mvpInput}
            value={mvp ? mvp.label : ""}
          />
          <div className={styles.addPlayerWrapper} onClick={() => openModal(4)}>
            <EmojiEventsIcon className={styles.addPlayerMVP} />
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            className={styles.dateInput}
            value={moment(new Date(date)).format("YYYY-MM-DD")}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </div>
        <div className={`${styles.inputWrapper} ${styles.submitWrapper}`}>
          <input
            type="submit"
            id="submit"
            className={styles.submit}
            value="Submit"
          />
        </div>
      </form>
      <AddPlayerScoreModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      >
        <div className={styles.modalWrapper}>
          {modalNum <= 4 && (
            <h1 className="text-gray-900 text-center mb-2">Add Player</h1>
          )}
          {modalNum <= 4 && (
            <form
              action="submit"
              onSubmit={hanldleModalSubmit}
              className="flex items-center justify-center"
            >
              <Autocomplete
                disablePortal
                id="addPlayersAutoComplete"
                options={modalNum === 4 ? playerSelectMvp : playersSelect}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                key={Math.random()}
                sx={{ width: 300 }}
                value={playerName}
                onChange={(event, newValue) => setPlayerName(newValue)}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.label}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Search" value={playerName} />
                )}
              />
              <input
                type="submit"
                className="bg-black text-white p-4 ml-2 cursor-pointer rounded-lg"
                value="Add"
              />
            </form>
          )}

          {modalNum === 5 && <h1 className={styles.err}>{err}</h1>}
        </div>
      </AddPlayerScoreModal>
    </div>
  );
};

export default page;
