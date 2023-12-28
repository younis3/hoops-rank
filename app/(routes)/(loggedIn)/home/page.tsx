"use client";

import ScoreTable from "@/app/_components/score-table/ScoreTable";
import styles from "./home.module.scss";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useSeasonSelectionContext } from "@/app/context/season";

export default function Home() {
  const { season, setSeason } = useSeasonSelectionContext();
  const [tableKey, setTableKey] = useState<number>(0);

  useEffect(() => {
    setTableKey((tableKey) => tableKey + 1);
  }, [season]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSeason(event.currentTarget.value); // update the selected option when it changes
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
        <ScoreTable key={tableKey} />
      </div>
    </main>
  );
}
