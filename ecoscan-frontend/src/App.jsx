import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Results from './components/Results';
import Offers from './components/Offers';
import { Container, Typography, Card } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    '@global': {
        '*': {
            fontFamily: "'Poppins', sans-serif !important",
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
        },
        body: {
            margin: 0,
            padding: 0,
            backgroundImage: 'linear-gradient(to right, #000040, #42f5a4)',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: "'Poppins', sans-serif",
        },
    },
    container: {
        fontFamily: "'Poppins', sans-serif", 
        // width: '800px',
        // background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)) !important',
        // backdropFilter: 'blur(10px)',
        // padding: '2rem',
        // borderRadius: '8px',
        // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: '600',
        fontSize: '5rem', // Optional: Adjust the font size if needed
        marginBottom: '1.5rem',
        color: '#ffffff',
    },
    ecoPoints: {
        fontFamily: "'Poppins', sans-serif", 
        marginTop: '1rem',
        marginBottom: '1rem',
        color: '#ffffff',
        fontWeight: 'bold',
    },
    glassCard: {
        borderRadius: '5em',
        zIndex: '1',
        backgroundClip: 'padding-box',
        background: 'rgba(255, 255, 255, 0.3) !important',
        backdropFilter: 'blur(10px) !important',
        boxShadow: '10px 10px 10px rgba(46, 54, 68, 0.1) !important',
        borderTop: '1px solid rgba(6, 54, 68, 0.1) !important',
        borderLeft: '1px solid rgba(6, 54, 68, 0.1) !important',
        padding: '1rem',
        marginTop: '2rem',
        marginBottom: '2rem',
    },
}));


const App = () => {
    const classes = useStyles();
    const [recognizedItems, setRecognizedItems] = useState([]);
    const [ecoPoints, setEcoPoints] = useState(0);

    const handleUpload = (items) => {
        setRecognizedItems(items);
    };


    return (
        
        <Container className = {classes.container}>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", color: "#ffffff", marginBottom: '1rem', textAlign: 'center'}}>Eco Scan</h1>
            <FileUpload onUpload={handleUpload} />
            <Typography variant="h6" align="center" className={classes.ecoPoints}>
                Eco Points: {ecoPoints}
            </Typography>
            <Card className={classes.glassCard}>
                <Results items={recognizedItems} setEcoPoints={setEcoPoints} />
            </Card>
            <Card className={classes.glassCard}>
                <Offers ecoPoints={ecoPoints} />
            </Card>
        </Container>
    );
};

export default App;