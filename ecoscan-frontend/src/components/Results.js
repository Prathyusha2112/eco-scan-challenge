import React, { useEffect } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import axios from 'axios';

const Results = ({ items, setEcoPoints }) => {
    useEffect(() => {
        const fetchEcoPoints = async () => {
            try {
                const response = await axios.get('/api/eco-score/', {
                    params: {
                        recognized_items: JSON.stringify(items)
                    }
                });
                setEcoPoints(response.data.eco_points);
            } catch (error) {
                console.error('Error fetching eco points:', error);
            }
        };

        fetchEcoPoints();
    }, [items, setEcoPoints]);

    return (
        <Box>
            <Typography variant="h6" gutterBottom>Recognized Items</Typography>
            <Grid container spacing={2}>
                {items.map((item, index) => (
                    <Grid item xs={6} sm={4} key={index}>
                        <Typography>{item.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {item.carbonFootprint} kg CO₂
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Results;