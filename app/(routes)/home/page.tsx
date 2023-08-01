"use client";

import NavMobile from "@/app/_components/nav/mobile-nav/NavMobile";
import Nav from "../../_components/nav/horizontal/Nav";
import ScoreTable from "../../_components/score-table/ScoreTable";
import styles from "./home.module.scss";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.page}>
      <Nav />
      {/* <NavMobile /> */}
    </main>
  );
}
