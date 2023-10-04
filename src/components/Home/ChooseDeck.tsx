import { Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function ChooseDeck() {
    return (
        <Grid container-column spacing={4} margin={2}>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                    Choose a Deck:
                </Typography>
            </Grid>
            <Grid item xs={12} margin={2}>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/deck/1"
                    fullWidth
                >
                    Deck 1
                </Button>
            </Grid>
            <Grid item xs={12} margin={2}>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/deck/2"
                    fullWidth
                >
                    Deck 2
                </Button>
            </Grid>
            <Grid item xs={12} margin={2}>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/deck/3"
                    fullWidth
                >
                    Deck 3
                </Button>
            </Grid>
            <Grid item xs={12} margin={2}>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/deck/4"
                    fullWidth
                >
                    Deck 4
                </Button>
            </Grid>
        </Grid>
    );
}

export default ChooseDeck;
