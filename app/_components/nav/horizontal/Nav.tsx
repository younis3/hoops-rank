"use client";

import styles from "./Nav.module.scss";
import Image from "next/image";
import logo from "../../../_assets/images/ararabasketball-logo.png";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import Icon from "@mui/material/Icon";
import HelpIcon from "@mui/icons-material/Help";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();

  const rankingTableNav = useRef<HTMLLIElement>(null);
  const premierLeagueNav = useRef<HTMLLIElement>(null);
  const zachiCupNav = useRef<HTMLLIElement>(null);

  const handleRoute = (page: string) => {
    router.push(page);
  };

  useEffect(() => {
    if (pathname == "/home") {
      rankingTableNav.current?.classList.add(styles.current);
      premierLeagueNav.current?.classList.remove(styles.current);
      zachiCupNav.current?.classList.remove(styles.current);
    } else if (pathname == "/premier-league") {
      premierLeagueNav.current?.classList.add(styles.current);
      rankingTableNav.current?.classList.remove(styles.current);
      zachiCupNav.current?.classList.remove(styles.current);
    } else if (pathname == "/zachi-cup") {
      zachiCupNav.current?.classList.add(styles.current);
      rankingTableNav.current?.classList.remove(styles.current);
      premierLeagueNav.current?.classList.remove(styles.current);
    }
  }, [pathname]);

  return (
    <header className={styles.headerx}>
      <Image
        src={logo}
        width={260}
        height={200}
        alt="player basketball"
        className={styles.logo}
      />
      <div
        className={styles.infoIconWrapper}
        onClick={() => handleRoute("info")}
      >
        <HelpIcon color="action" className={styles.infoIcon} />
      </div>

      <div
        className={styles.playerAddWrapper}
        onClick={() => handleRoute("add-players")}
      >
        <PersonAddIcon color="action" className={styles.infoIcon} />
      </div>

      <div className={styles.menuWrapper1}>
        <ul className={styles.menu}>
          <li>Events</li>
          <li>Gallery</li>
          <li>Videos</li>
        </ul>
      </div>

      <div className={styles.menuWrapper2}>
        <ul className={styles.menu}>
          <li ref={rankingTableNav} onClick={() => handleRoute("home")}>
            Ranking
          </li>
          <li
            ref={premierLeagueNav}
            onClick={() => handleRoute("premier-league")}
          >
            Premier League
          </li>
          <li ref={zachiCupNav} onClick={() => handleRoute("zachi-cup")}>
            Zachi Cup
          </li>
        </ul>
      </div>
    </header>
  );
}
