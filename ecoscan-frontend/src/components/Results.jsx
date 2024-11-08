import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import axios from 'axios';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    Results: {
        //background: 'rgba(255, 255, 255, 0.1)',
        //backdropFilter: 'blur(10px)',
        //borderRadius: '8px',
        //boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '1rem',
        //marginTop: '2rem',
        //marginBottom: '2rem',
        fontFamily: 'Poppins',
        fontWeight: '700',
    }
}));

const Results = ({ items, setEcoPoints }) => {
    const classes = useStyles();
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
        <div className={classes.Results}>
            <Typography variant="h6" gutterBottom className={classes.itemTitle}>
                Recognized Items
            </Typography>
            <div container spacing={2}>
                {items.map((item, index) => (
                    <div item xs={6} sm={4} key={index}>
                        <Typography>{item.name}</Typography>
                        <Typography variant="body2" className={classes.itemInfo}>
                            {item.carbonFootprint} kg CO₂
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Results;