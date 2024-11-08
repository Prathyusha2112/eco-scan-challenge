import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    Offers: {
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '1rem',
        marginTop: '2rem',
        marginBottom: '2rem',
        fontFamily: 'Poppins',
        fontWeight: '700',
    }
}));

const Offers = ({ ecoPoints }) => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        setLoading(true);
        setError(null);
        console.log(`Fetching offers with eco_points=${ecoPoints}`);
        axios.get(`/api/offers/?eco_points=${ecoPoints}`)
            .then(response => {
                console.log('Offers fetched:', response.data);
                setOffers(response.data.available_offers || []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching offers:', error);
                setError('Failed to fetch offers');
                setLoading(false);
            });
    }, [ecoPoints]);

    if (loading) {
        return <Typography variant="h6" gutterBottom>Loading offers...</Typography>;
    }
    if (error) {
        return <Typography variant="h6" gutterBottom>{error}</Typography>;
    }

    if (!offers || offers.length === 0) {
        return <Typography variant="h6" gutterBottom>No offers available</Typography>;
    }

    return (
        <div className={ classes.Offers }>
            <Typography variant="h6" gutterBottom>Available Offers</Typography>
            <List>
                {offers.map((offer, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={offer.name} secondary={`${offer.points_req} eco_points`} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Offers;