"use client";
import Image from "next/image";
import { Inter } from "next/font/google";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function LoginPage() {
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
    <main className="min-h-screen flex items-center justify-between p-24 flex-col ">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handlePassChange} className="p-18 mr-2" />
        <input type="submit" value={"Login"} className="cursor-pointer" />
      </form>
      {err !== "" && <p className="error">{err}</p>}
    </main>
  );
}
