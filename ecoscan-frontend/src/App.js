import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import Results from './components/Results';
import Offers from './components/Offers';
import { Container, Typography } from '@mui/material';

const App = () => {
    const [recognizedItems, setRecognizedItems] = useState([]);
    const [ecoPoints, setEcoPoints] = useState(0);

    const handleUpload = (items) => {
        setRecognizedItems(items);
    };
    
    useEffect(() => {
        console.log(`Updated ecoPoints: ${ecoPoints}`);
    }, [ecoPoints]);

    return (
        <Container maxWidth="sm" style={{ padding: '1rem' }}>
            <Typography variant="h4" align="center" gutterBottom>Eco Scan</Typography>
            <FileUpload onUpload={handleUpload} />
            <Typography variant="h6" align="center" gutterBottom>
                Eco Points: {ecoPoints}
            </Typography>
            <Results items={recognizedItems} setEcoPoints={setEcoPoints} />
            <Offers ecoPoints={ecoPoints} />
        </Container>
    );
};

export default App;