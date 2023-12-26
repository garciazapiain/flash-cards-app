import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CardData } from "../../types";
import { useState } from "react";


const useStyles = makeStyles(() => ({
  centerTable: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh", // Center vertically within the viewport
    marginTop: "1rem"
  },
  header: {
    backgroundColor: "rgb(25, 118, 210)", // Light blue color
    color: "white",
    '& .MuiTableCell-root': { // Increase the specificity
      fontWeight: "bold",
    },
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#e0f7fa', // Light blue color
    },
  },
  searchBar: {
    width: "30%",
    marginBottom: "1rem",
    backgroundColor: "none",
  }
}));

interface ViewProps {
  cards: CardData[];
}

function View({ cards }: ViewProps): JSX.Element {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCards = cards.filter(card =>
    card.data.front.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(searchTerm.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()) ||
    card.data.back.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(searchTerm.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())
  );

  return (
    <div className={classes.centerTable}>
      <TextField
        variant="outlined"
        label="Search"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className={classes.searchBar}
        InputLabelProps={{ style: { color: 'white' } }}
        inputProps={{ style: { color: 'white' } }}
      />
      <TableContainer component={Paper}>
        <Table aria-label="Deck Table">
          <TableHead className={classes.header}>
            <TableRow>
              <TableCell align="center">Front</TableCell>
              <TableCell align="center">Back</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCards.map((card: CardData) => (
              <TableRow key={card.id} className={classes.row}>
                <TableCell align="center">{card.data.front}</TableCell>
                <TableCell align="center">{card.data.back}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default View;