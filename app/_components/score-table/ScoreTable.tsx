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
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Player } from "../../models/Player";
import { db } from "@/app/firebase";

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

  const players2024statsCollection = collection(db, "players2024stats");

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(players2024statsCollection);
      querySnapshot.docs
        .sort((a, b) => b.data().exp - a.data().exp)
        .forEach((playerDoc, index) => {
          const playerStat: Data = {
            rank: index + 1,
            name: playerDoc.data().playerName,
            points: playerDoc.data().exp,
            wins: playerDoc.data().totalWins,
            leagueWins: playerDoc.data().leagueWins,
            cupWins: playerDoc.data().cupWins,
            mvp: playerDoc.data().mvpCount,
            attends: playerDoc.data().attCount,
          };
          data.push(playerStat);
          setRefresh(!refresh);
        });
    })();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer
        sx={{ paddingLeft: "4px", paddingRight: "4px", mt: 4, maxHeight: 505 }}
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
      <h2 className="mt-2 mb-2 text-center text-sm">2023-2024 Season</h2>
    </Paper>
  );
}
