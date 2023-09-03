"use client";
import React from "react";
import styles from "./add-players.module.scss";

const page = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        />
        <label htmlFor="playerNumber" className="mt-3">
          Player Phone Number:{" "}
        </label>
        <input
          type="text"
          id="playerNumber"
          className="outline-none p-2 border-2 border-solid mt-1 "
        />
        <button type="submit" className={styles.submitBtn}>
          Add
        </button>
      </form>
      <div className="m-2">
        <h1 className="mt-5 mb-1 underline">Player List:</h1>
        <ul>
          <li>
            <span>1. </span> Ahmed Y. <span> -- #0502240345</span>
          </li>
          <li>
            <span>2. </span> Ahmed Y. <span> -- #0502240345</span>
          </li>
          <li>
            <span>3. </span> Ahmed Y. <span> -- #0502240345</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default page;
