import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import styles from "./ScoreTable.module.scss";
import { useEffect, useRef, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Player } from "../../models/Player";
import { db } from "@/app/firebase";

//🔥🏆🥇

interface Column {
  id:
    | "rank"
    | "name"
    | "points"
    | "wins"
    | "leagueWins"
    | "cupWins"
    | "mvp"
    | "attends";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "rank", label: "Rank", minWidth: 2, align: "center" },
  { id: "name", label: "Name", minWidth: 100, align: "center" },
  { id: "points", label: "EXP", minWidth: 2, align: "center" },
  {
    id: "wins",
    label: "W",
    minWidth: 2,
    align: "center",
  },
  {
    id: "leagueWins",
    label: "LegW",
    minWidth: 2,
    align: "center",
  },
  {
    id: "cupWins",
    label: "CupW",
    minWidth: 2,
    align: "center",
  },
  {
    id: "mvp",
    label: "MVP",
    minWidth: 2,
    align: "center",
  },
  {
    id: "attends",
    label: "Att",
    minWidth: 2,
    align: "center",
  },
];

interface Data {
  rank: number;
  name: string;
  id: string;
  points: number;
  wins: number;
  leagueWins: number;
  cupWins: number;
  mvp: number;
  attends: number;
}

export default function scoreTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [data, setData] = useState<Data[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const recentMvpRef = useRef<Player | null>(null);
  const [recentLegW, setRecentLegW] = useState<Player[]>([]);
  const [playersOnFire, setPlayersOnFire] = useState<Player[]>([]);
  const loadingRef = useRef<boolean>(true);

  const players2024statsCollection = collection(db, "players2024stats");
  const leagueScoresCollection = collection(db, "leagueScores");

  useEffect(() => {
    // update recent winners and recent mvp player

    if (!recentLegW.length) {
      (async () => {
        const q = query(
          leagueScoresCollection,
          orderBy("date", "desc"),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.docs.forEach((res, index) => {
          if (index === 0) {
            recentMvpRef.current = res.data().mvp;
            setRecentLegW(res.data().winnerTeam.teamPlayers);
          }
        });
      })();
    }
  });

  const getOnFire = async (playerId: string): Promise<boolean> => {
    //🔥
    let res: boolean;
    const q = query(
      collection(db, "streakHistory2024"),
      where("playerId", "==", playerId),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      if (querySnapshot.docs[0].data().currStreak >= 3) {
        res = true;
      } else {
        res = false;
      }
    } else {
      res = false;
    }
    return res;
  };

  useEffect(() => {
    // when recent winners available (for the emojis) add and rank all the players
    if (recentLegW.length) {
      (async () => {
        const querySnapshot = await getDocs(players2024statsCollection);
        querySnapshot.docs
          .sort((a, b) => b.data().exp - a.data().exp)
          .forEach((playerDoc, index) => {
            getOnFire(playerDoc.data().playerId).then((res) => {
              const onFire = res === true ? "🔥" : "";
              const isPlayerIdIncluded = recentLegW.some(
                (player) => player.id === playerDoc.data().playerId
              );
              const legWinnerEmoji = isPlayerIdIncluded ? "🏆" : "";
              const mvpEmoji =
                playerDoc.data().playerId === recentMvpRef.current?.id
                  ? "🥇"
                  : "";

              const playerStat: Data = {
                rank: index + 1,
                name:
                  playerDoc.data().playerName +
                  legWinnerEmoji +
                  mvpEmoji +
                  onFire,
                id: playerDoc.data().playerId,
                points: playerDoc.data().exp,
                wins: playerDoc.data().totalWins,
                leagueWins: playerDoc.data().leagueWins,
                cupWins: playerDoc.data().cupWins,
                mvp: playerDoc.data().mvpCount,
                attends: playerDoc.data().attCount,
              };
              data.push(playerStat);
              loadingRef.current = false;
              setRefresh(!refresh);
            });
          });
      })();
    }
  }, [recentLegW]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loadingRef.current) {
    return (
      <div className={styles.loading}>
        <p className="text-black text-center mt-16">LOADING...</p>
      </div>
    );
  } else {
    return (
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer
          sx={{
            paddingLeft: "4px",
            paddingRight: "4px",
            mt: 4,
            maxHeight: 505,
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    sx={{ fontSize: 11 }}
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      padding: "1px",
                    }}
                    className={
                      column.label == "EXP" ? styles.MuiTableCellPts : ""
                    }
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      // role="checkbox"
                      role="cell"
                      tabIndex={-1}
                      key={row.name + Math.random()}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            sx={{ fontSize: 14 }}
                            style={{
                              padding: "14px",
                            }}
                            className={
                              column.label == "EXP"
                                ? styles.MuiTableCellPts
                                : column.label == "Rank"
                                ? styles.MuiTableCellRank
                                : ""
                            }
                            key={column.id}
                            align={column.align}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
        rowsPerPageOptions={[15, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
        <h2 className="mt-3 mb-2 text-center text-sm">2023-2024 Season</h2>
      </Paper>
    );
  }
}
