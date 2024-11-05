// src/App.js
import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Results from './components/Results';
import Offers from './components/Offers';
import { Container, Typography } from '@mui/material';

const App = () => {
    const [recognizedItems, setRecognizedItems] = useState([]);
    const [ecoPoints, setEcoPoints] = useState(0);

    const handleUpload = (data) => {
        const formattedItems = data.recognized_items
            ? Object.keys(data.recognized_items).map(key => ({
                name: key,
                score: data.recognized_items[key]
            }))
            : [];
        setRecognizedItems(formattedItems);
    };

    const updateEcoPoints = (points) => {
        setEcoPoints(points);
    };

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Eco Scan
            </Typography>
            <FileUpload onUpload={handleUpload} />
            {recognizedItems.length > 0 && (
                <Results items={recognizedItems} onEcoPointsChange={updateEcoPoints} />
            )}
            {ecoPoints > 0 && <Offers ecoPoints={ecoPoints} />}
        </Container>
    );
};

export default App;
