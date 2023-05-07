import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <main className="min-h-screen flex items-center justify-between p-24 flex-col ">
      <div className="flex flex-row">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
    </main>
  );
}
