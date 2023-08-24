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

interface Column {
  id:
    | "rank"
    | "name"
    | "points"
    | "wins"
    | "loses"
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
    id: "loses",
    label: "L",
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
  loses: number;
  leagueWins: number;
  cupWins: number;
  mvp: number;
  attends: number;
}

function createData(
  rank: number,
  name: string,
  wins: number,
  loses: number,
  leagueWins: number,
  cupWins: number,
  mvp: number,
  attends: number
): Data {
  const points: number =
    wins * 10 + loses * 2 + leagueWins * 15 + cupWins * 40 + mvp * 10;
  return {
    rank,
    name,
    points,
    wins,
    loses,
    leagueWins,
    cupWins,
    mvp,
    attends,
  };
}

const rows = [
  createData(1, "Ahmed Y.", 100, 5, 4, 2, 0, 3),
  createData(2, "Hodifa Y.", 90, 2, 4, 2, 0, 3),
  createData(3, "Sadin Y.", 100, 4, 4, 2, 0, 3),
  createData(4, "Sadin Y.", 80, 5, 4, 2, 0, 3),
  createData(5, "Sadin Y.", 100, 5, 4, 2, 0, 3),

  createData(6, "Ahmed Y.", 100, 5, 4, 2, 0, 3),
  createData(7, "Hodifa Y.", 100, 5, 4, 2, 0, 3),
  createData(8, "Sadin Y.", 100, 5, 4, 2, 0, 3),
  createData(9, "Sadin Y.", 100, 5, 4, 2, 0, 3),
  createData(10, "Sadin Y.", 100, 5, 4, 2, 0, 3),

  createData(11, "Ahmed Y.", 100, 5, 4, 2, 0, 3),
  createData(12, "Hodifa Y.", 100, 5, 4, 2, 0, 3),
  createData(13, "Sadin Y.", 100, 5, 4, 2, 0, 3),
  createData(14, "Sadin Y.", 100, 5, 4, 2, 0, 3),
  createData(15, "Sadin Y.", 100, 5, 4, 2, 0, 3),
];

export default function scoreTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

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
            {rows
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
    </Paper>
  );
}
