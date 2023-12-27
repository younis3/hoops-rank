"use client";

import ScoreTable from "@/app/_components/score-table/ScoreTable";
import styles from "./home.module.scss";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useSeasonSelectionContext } from "@/app/context/season";
import { useRouter } from "next/navigation";

export default function Home() {
  // const [selectedOption, setSelectedOption] = useState("2");
  const router = useRouter();

  const { season, setSeason } = useSeasonSelectionContext();

  useEffect(() => {
    console.log(season); // will log the updated value of season whenever it changes
  }, [season]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSeason(event.currentTarget.value); // update the selected option when it changes
    // router.push("/premier-league");
  };

  return (
    <main className={styles.page}>
      <div>
        <div className={styles.selectSeasonWrapper}>
          <select
            className={styles.dropDown}
            value={season}
            onChange={handleSelectChange}
          >
            <option value="2">[Season 2] - [ 5/11/2023 - Present ]</option>
            <option value="1">[Season 1] - [ 29/7/2023 - 4/11/2023 ]</option>
          </select>
        </div>
        <ScoreTable />
      </div>
    </main>
  );
}
