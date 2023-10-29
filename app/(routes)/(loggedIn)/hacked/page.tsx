import React from "react";
import Image from "next/image";
import styles from "./troll.module.scss";
import trollPic from "../../../_assets/images/trollhack2.webp";

const page = () => {
  return (
    <div className={styles.pic}>
      <Image
        src={trollPic}
        // width={390}
        // height={300}
        alt="player basketball"
        className="mb-20 mt-6"
      />
    </div>
  );
};

export default page;
