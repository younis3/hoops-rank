"use client";

import Image from "next/image";
import styles from "./pl.module.scss";
import maintenance from "../../../_assets/images/maintenance.png";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useUserContext } from "@/app/context/user";
import { useRouter } from "next/navigation";

const page = () => {
  const { userRole } = useUserContext();
  const router = useRouter();

  return (
    <div className={styles.page}>
      <div className={styles.underConstruction}>
        <Image src={maintenance} alt={"loading"} width={250} />
      </div>
      {userRole == "admin" && (
        <div
          className={styles.addBtn}
          onClick={() => router.push("/add-pl-score")}
        >
          <PostAddIcon color="action" className={styles.addIcon} />
        </div>
      )}
    </div>
  );
};

export default page;
