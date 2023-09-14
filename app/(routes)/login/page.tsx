"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.scss";
import playerPic from "../../_assets/images/basketball-player.png";
import logo from "../../_assets/images/ararabasketball-logo.png";
import { useUserContext } from "@/app/context/user";

export default function Login() {
  const router = useRouter();
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [isAdminChecked, setIsAdminChecked] = useState(false);
  const { setUserRole } = useUserContext();

  const handlePassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass((event.target as HTMLInputElement).value);
  };

  const checkboxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdminChecked(!isAdminChecked);
    // console.log((event.target as HTMLInputElement).checked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isAdminChecked) {
      if (pass === process.env.NEXT_PUBLIC_PASSWORD_ADMIN) {
        setErr("");
        setUserRole("admin");
        router.push("/home");
      } else {
        setErr("Wrong Admin Password!");
      }
    } else {
      if (pass === process.env.NEXT_PUBLIC_PASSWORD) {
        setErr("");
        setUserRole("user");
        router.push("/home");
      } else {
        setErr("Wrong Password!");
      }
    }
  };

  return (
    <main className={`${styles.page} min-h-screen`}>
      <div className="flex items-center pt-1 flex-col ">
        <Image
          src={logo}
          width={260}
          height={200}
          alt="player basketball"
          className="mb-20"
        />
        <Image
          src={playerPic}
          width={180}
          height={200}
          alt="player basketball"
          className="mb-12"
        />
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <input
            type="password"
            onChange={handlePassChange}
            className={`${styles.password} p-1`}
          />

          <input
            type="submit"
            value={"Login"}
            className={`${styles.loginBtn} cursor-pointer mt-3 p-2`}
          />
          <div className={styles.checkboxWrapper}>
            <input
              type="checkbox"
              id="checkbox"
              checked={isAdminChecked}
              onChange={checkboxHandler}
            />
            <label htmlFor="checkbox">Login as Admin</label>
          </div>
        </form>
        {err !== "" && <p className={styles.err}>{err}</p>}
      </div>
    </main>
  );
}
