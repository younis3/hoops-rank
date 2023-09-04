"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./add-players.module.scss";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "@/app/firebase";

interface Player {
  name: string;
  number: string;
}

const page = () => {
  const [playerName, setPlayerName] = useState<string>("");
  const [playerNum, setPlayerNum] = useState<string>("");
  const [playersArr, setPlayersArr] = useState<Player[]>([]);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const numInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (playerName !== "" && playerNum !== "") {
      //check if player already exists in db
      const q = query(
        collection(db, "players"),
        where("number", "==", playerNum)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        //number already exists!
        return;
      }
      await addDoc(collection(db, "players"), {
        name: playerName.trim(),
        number: playerNum.trim(),
      }).then(() => {
        if (nameInputRef.current) nameInputRef.current.value = "";
        nameInputRef.current?.focus();
        if (numInputRef.current) numInputRef.current.value = "";
        setPlayersArr([]);
        getData();
      });
    }
  };

  const getData = async () => {
    const q = query(collection(db, "players"), orderBy("name"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const player = { name: doc.data().name, number: doc.data().number };
      setPlayersArr((playersArr) => [...playersArr, player]);
    });
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className="text-center mt-6">Add New Player</h1>
      <form onSubmit={handleSubmit} className="flex flex-col m-3">
        <label htmlFor="playerName">Player Name: </label>
        <input
          type="text"
          id="playerName"
          className="outline-none p-2 border-2 border-solid mt-1"
          ref={nameInputRef}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <label htmlFor="playerNumber" className="mt-3">
          Player Phone Number:{" "}
        </label>
        <input
          type="text"
          id="playerNumber"
          className="outline-none p-2 border-2 border-solid mt-1 "
          ref={numInputRef}
          onChange={(e) => setPlayerNum(e.target.value)}
        />
        <button type="submit" className={styles.submitBtn}>
          Add
        </button>
      </form>
      <div className="m-2">
        <h1 className="mt-5 mb-1 underline">Player List:</h1>
        <ul>
          {playersArr.map((player, i) => (
            <li key={player.number + Math.random()}>
              <span>{i + 1}. </span> {player.name}{" "}
              <span> -- #{player.number}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default page;
