import Image from "next/image";
import styles from "./pl.module.scss";
import maintenance from "../../../_assets/images/maintenance.png";

const page = () => {
  return (
    <div className={styles.page}>
      <div className={styles.underConstruction}>
        <Image src={maintenance} alt={"loading"} width={250} />
      </div>
    </div>
  );
};

export default page;
