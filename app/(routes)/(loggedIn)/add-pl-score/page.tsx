"use client";

import styles from "./add-pl-score.module.scss";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import AddPlayerScoreModal from "@/app/_components/modals/add-player-score-modal/AddPlayerScoreModal";
import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { addDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import moment from "moment";
import { Player } from "../../../models/Player";
import PlayerCombo from "../../../_components/player-combo/playerCombo";

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
  const [playersSelect, setPlayersSelect] = useState<Player[]>([
    { label: "Ahmed Y.", id: 1 },
    { label: "Sadin Y.", id: 2 },
    { label: "Hodifa Y.", id: 3 },
    { label: "Fathi Y.", id: 4 },
    { label: "Sena Y.", id: 5 },
  ]);
  const [playerSelectMvp, setPlayerSelectMvp] = useState<Player[]>([]);
  const [err, setErr] = useState<string>("");
  // const [disableTeam3, setDisableTeam3] = useState<boolean>(true);

  // useEffect(() => {
  //   if (team1.length > 1 && team2.length > 1) {
  //     setDisableTeam3(false);
  //   } else {
  //     setDisableTeam3(true);
  //   }
  // }, [JSON.stringify(team1), JSON.stringify(team2)]);

  // const playersSelect = [
  //   { label: "Ahmed Y.", id: 1 },
  //   { label: "Sadin Y.", id: 2 },
  //   { label: "Hodifa Y.", id: 3 },
  //   { label: "Fathi Y.", id: 4 },
  //   { label: "Sena Y.", id: 5 },
  // ];

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    const todayDate = moment(new Date().getDay());
    if (moment(new Date(date).getDay()) > todayDate) {
      setErr("Error: invalid date!");
      return;
    }

    //add form result to db
    // await addDoc(collection(db, "leagueScores"), {
    //   date:
    //   name: playerName.trim(),
    //   number: playerNum.trim(),
    // }).then(() => {
    //   if (nameInputRef.current) nameInputRef.current.value = "";
    //   nameInputRef.current?.focus();
    //   if (numInputRef.current) numInputRef.current.value = "";
    //   setPlayersArr([]);
    //   getData();
    // });
  };

  return (
    <div className={styles.pageContainer}>
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
                <PlayerCombo
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
              <PlayerCombo
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
              className={styles.scoreInput}
              onChange={(e) => setScoreTeam3(parseInt(e.target.value))}
            />
          </div>

          <div className={styles.addPlayerWrapper} onClick={() => openModal(3)}>
            <PersonAddIcon className={styles.addPlayer} />
          </div>
          <div className={styles.players} id="team3">
            {team3.map((p) => (
              <PlayerCombo
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
            value={mvp?.label}
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
          <h1 className="text-gray-900 text-center mb-2">Add Player</h1>
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
              className="bg-black text-white p-2 cursor-pointer"
              value="Add"
            />
          </form>
        </div>
      </AddPlayerScoreModal>
    </div>
  );
};

export default page;
