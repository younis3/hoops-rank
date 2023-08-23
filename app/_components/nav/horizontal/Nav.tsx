"use client";

import styles from "./Nav.module.scss";
import Image from "next/image";
import logo from "../../../_assets/images/ararabasketball-logo.png";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();

  const handleRoute = (page: string) => {
    router.push(page);
  };

  return (
    <header className={styles.headerx}>
      <Image
        src={logo}
        width={310}
        height={300}
        alt="player basketball"
        className={styles.logo}
      />
      <div className={styles.menuWrapper1}>
        <ul className={styles.menu}>
          <li>Events</li>
          <li>Gallery</li>
          <li>Videos</li>
        </ul>
      </div>
      <div className={styles.menuWrapper2}>
        <ul className={styles.menu}>
          <li onClick={() => handleRoute("home")}>Ranking</li>
          <li onClick={() => handleRoute("premier-league")}>Premier League</li>
          <li onClick={() => handleRoute("zachi-cup")}>Zachi Cup</li>
        </ul>
      </div>
    </header>
  );
}
