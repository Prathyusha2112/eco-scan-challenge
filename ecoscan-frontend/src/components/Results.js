import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const Results = ({ items }) => (
    <div>
        <Typography variant="h5">Recognized Items</Typography>
        <List>
            {items.map((item, index) => (
                <ListItem key={index}>
                    <ListItemText primary={`${item.name}: ${item.score} eco points`} />
                </ListItem>
            ))}
        </List>
    </div>
);

export default Results;

