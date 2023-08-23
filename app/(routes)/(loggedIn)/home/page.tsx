"use client";

import NavMobile from "@/app/_components/nav/mobile-nav/NavMobile";
import Nav from "../../../_components/nav/horizontal/Nav";
import ScoreTable from "../../../_components/score-table/ScoreTable";
import styles from "./home.module.scss";
import Image from "next/image";

export default function Home() {
  const tableHeaders = ["Name", "Pts", "W", "L", "League W", "Cup W", "MP"];

  return <main className={styles.page}></main>;
}
