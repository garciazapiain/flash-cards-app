import { useState } from 'react';
import { Button, TextField, Typography, Grid } from '@mui/material';
import { addNewCard } from '../../api';

function AddNewCard() {
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    const handleAddCard = async () => {
        // Perform validation if needed
        if (!front || !back) {
            alert('Please fill in both front and back fields.');
            return;
        }

        try {
            // Call the addNewCard function to add the card to Firestore
            await addNewCard(front, back);

            // Clear the form fields
            setFront('');
            setBack('');

            // Optionally, you can display a success message or navigate to another page
            alert('Card added successfully');
        } catch (error) {
            console.error('Error adding card:', error);
        }
    };

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                    Add New Card:
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Front"
                    variant="outlined"
                    fullWidth
                    value={front}
                    onChange={(e) => setFront(e.target.value)}
                    InputLabelProps={{ style: { color: 'white' } }} 
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Back"
                    variant="outlined"
                    fullWidth
                    value={back}
                    onChange={(e) => setBack(e.target.value)}
                    InputLabelProps={{ style: { color: 'white' } }} 
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleAddCard}>
                    Add Card
                </Button>
            </Grid>
        </Grid>
    );
}

export default AddNewCard;
