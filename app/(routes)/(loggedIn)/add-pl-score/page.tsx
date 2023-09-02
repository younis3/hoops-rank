"use client";

import styles from "./add-pl-score.module.scss";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const page = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className={styles.pageContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.inputWrapper}>
          <label htmlFor="team1">Team 1</label>
          <input type="text" id="team1" readOnly={true} />
          <PersonAddIcon className={styles.addPlayer} />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="score1">Score Team 1</label>
          <input type="number" id="score1" className={styles.scoreInput} />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="team2">Team 2</label>
          <input type="text" id="team2" readOnly={true} />
          <PersonAddIcon className={styles.addPlayer} />
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
          <PersonAddIcon className={styles.addPlayer} />
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
    </div>
  );
};

export default page;
