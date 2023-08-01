"use client";

import styles from "./NavMobile.module.scss";
import Image from "next/image";
import logo from "../../../_assets/images/ararabasketball-logo.png";

export default function NavMobile() {
  return (
    <header className={styles.header}>
      <Image
        src={logo}
        width={280}
        height={200}
        alt="player basketball"
        className={styles.logo}
      />
      <div className={styles.menuWrapper}>
        <ul className={styles.menu}>
          <li>Ranking</li>
          <li>Premier League</li>
          <li>Zachi Cup</li>
          <li>Events</li>
          <li>Gallery</li>
          <li>Videos</li>
        </ul>
      </div>
    </header>
  );
}
