"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.scss";
import playerPic from "../../_assets/images/basketball-player.png";
import logo from "../../_assets/images/ararabasketball-logo.png";

export default function Login() {
  const router = useRouter();
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const handlePassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass((event.target as HTMLInputElement).value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (pass === process.env.NEXT_PUBLIC_PASSWORD) {
      setErr("");
      router.push("/home");
    } else {
      setErr("Wrong Password!");
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
        </form>
        {err !== "" && <p className="error">{err}</p>}
      </div>
    </main>
  );
}
