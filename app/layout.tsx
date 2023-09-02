import Nav from "./_components/nav/horizontal/Nav";
import "./globals.css";
import { Inter } from "next/font/google";
import { UserContextProvider } from "./context/user";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HoopsRank",
  description: "Basketball Wadi Ara",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>{children}</UserContextProvider>
      </body>
    </html>
  );
}
