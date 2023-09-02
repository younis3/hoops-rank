"use client";
import React from "react";
import styles from "./AddPlayerScore.module.scss";

const AddPlayerScoreModal: React.FunctionComponent<{
  isVisible: boolean;
  onClose: any;
  children: any;
}> = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  const handleClose = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLInputElement).id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[94vw] flex flex-col ">
        <button
          className="text-white text-xl place-self-end mr-1"
          onClick={() => onClose()}
        >
          X
        </button>
        <div className="bg-white p-2 rounded">{children}</div>
      </div>
    </div>
  );
};

export default AddPlayerScoreModal;
