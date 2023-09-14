import React from "react";
import styles from "./info.module.scss";

const page = () => {
  const W_VALUE = 10;
  const LEG_W_VALUE = 15;
  const CUP_W_VALUE = 40;
  const MVP_VALUE = 10;
  const ATT_VALUE = 5;
  return (
    <div className={styles.pageWrapper}>
      <h2>
        <span>EXP: </span>Total Points
        <span className={styles.ar}>عدد النقاط الاجمالي</span>
      </h2>

      <h2>
        <span>W: </span> Total Wins
        <span className={styles.ar}>عدد الكلي للانتصارات في المباريات</span>
        <span className={styles.scoreVal}>+{W_VALUE}EXP</span>
      </h2>

      <h2>
        <span>LegW: </span>Total League Wins
        <span className={styles.ar}>فوز في معرخوت</span>
        <span className={styles.scoreVal}>+{LEG_W_VALUE}EXP</span>
      </h2>

      <h2>
        <span>CupW: </span>Zachi Cup Wins
        <span className={styles.ar}>فوز في كأس الزاتشي</span>
        <span className={styles.scoreVal}>+{CUP_W_VALUE}EXP</span>
      </h2>

      <h2>
        <span>MVP: </span>Total MVP Titles
        <span className={styles.ar}>عدد القاب افضل لاعب</span>
        <span className={styles.scoreVal}>+{MVP_VALUE}EXP</span>
      </h2>

      <h2>
        <span>Att: </span> Total Appearances{" "}
        <span className={styles.ar}>حضور</span>
        <span className={styles.scoreVal}>+{ATT_VALUE}EXP</span>
      </h2>
    </div>
  );
};

export default page;
