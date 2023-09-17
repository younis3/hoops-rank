import React from "react";
import styles from "./info.module.scss";
import {
  W_VALUE,
  LEG_W_VALUE,
  CUP_W_VALUE,
  MVP_VALUE,
  ATT_VALUE,
} from "../../../values";

const page = () => {
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
