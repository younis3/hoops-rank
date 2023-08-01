"use client";

import styles from "./Nav.module.scss";
import Image from "next/image";
import logo from "../../../_assets/images/ararabasketball-logo.png";

export default function Nav() {
  return (
    <header className={styles.headerx}>
      <Image
        src={logo}
        width={310}
        height={300}
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
