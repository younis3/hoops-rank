"use client";

import styles from "./add-pl-score.module.scss";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import AddPlayerScoreModal from "@/app/_components/modals/add-player-score-modal/AddPlayerScoreModal";
import { useState } from "react";

const page = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className={styles.pageContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.inputWrapper}>
          <label htmlFor="team1">Team 1</label>
          {/* <input type="text" id="team1" readOnly={true} /> */}
          <div
            className={styles.addPlayerWrapper}
            onClick={() => setIsModalVisible(true)}
          >
            <PersonAddIcon className={styles.addPlayer} />
          </div>
          <div className={styles.players} id="team1"></div>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="score1">Score Team 1</label>
          <input type="number" id="score1" className={styles.scoreInput} />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="team2">Team 2</label>
          {/* <input type="text" id="team2" readOnly={true} /> */}
          <div
            className={styles.addPlayerWrapper}
            onClick={() => setIsModalVisible(true)}
          >
            <PersonAddIcon className={styles.addPlayer} />
          </div>
          <div className={styles.players} id="team2"></div>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="score2">Score Team 2</label>
          <input type="number" id="score2" className={styles.scoreInput} />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="mvp">MVP</label>
          <input
            type="text"
            id="mvp"
            readOnly={true}
            className={styles.mvpInput}
          />
          <div
            className={styles.addPlayerWrapper}
            onClick={() => setIsModalVisible(true)}
          >
            <EmojiEventsIcon className={styles.addPlayerMVP} />
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" className={styles.dateInput} />
        </div>
        <div className={`${styles.inputWrapper} ${styles.submitWrapper}`}>
          <input
            type="submit"
            id="submit"
            className={styles.submit}
            value="Add"
          />
        </div>
      </form>
      <AddPlayerScoreModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      >
        <div className={styles.modalWrapper}>
          <h1 className="text-gray-900 text-center mb-2">Add Player</h1>
          <form action="submit" className="flex items-center justify-center">
            <label htmlFor="search" className="text-black text-sm">
              Choose Player
            </label>
            <input
              type="text"
              id="search"
              className="text-black outline-none border-solide hover:border-dotted border-2 border-black-500 p-1 ml-2 mr-2 w-[44vw]"
            />
            <input
              type="submit"
              className="bg-black text-white p-2 cursor-pointer"
            />
          </form>
        </div>
      </AddPlayerScoreModal>
    </div>
  );
};

export default page;
