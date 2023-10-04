import { useContext } from "react";
import { DeckContext } from "../index";
import { CardData } from "../../types";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  centerTable: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh", // Center vertically within the viewport
  },
  tableHead: {
    display: "flex",
  },
  tableCell: {
    flex: 1, // Equal flex for both columns
    width:"50%"
  },
}));

function View(): JSX.Element {
  const { cards } = useContext(DeckContext) as { cards: CardData[] };
  const classes = useStyles();

  return (
    <div className={classes.centerTable}>
      <TableContainer component={Paper}>
        <Table className={classes.centerTable} aria-label="Deck Table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell className={classes.tableCell}>Front</TableCell>
              <TableCell className={classes.tableCell}>Back</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map((card) => (
              <TableRow key={card.id}>
                <TableCell className={classes.tableCell}>{card.data.front}</TableCell>
                <TableCell className={classes.tableCell}>{card.data.back}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default View;
