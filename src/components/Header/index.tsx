import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles"; // Import Theme type

// Define styles for the Header component
const useStyles = makeStyles((theme: Theme) => ({
  header: {
    color: theme.palette.primary.contrastText, // Customize the text color
    padding: "10px", // Add padding as needed
  },
  nav: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: "8px",
    height:"2rem",
    width:"2rem"
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <Link to="/" className={classes.link}>
          <HomeIcon className={classes.icon} />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
