import React, { useState } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    uploadBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    input: {
        display: 'none',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        width: '100%',
        marginBottom: '1rem',
    },

    translucentButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2) !important' ,
        color: '#000040 !important',
        borderRadius: '8px !important',
        padding: '0.5rem 1.5rem !important',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.4) !important',
        },
    },

    solidButton: {
        backgroundColor: '#000 !important',
        color: '#fff !important',
        borderRadius: '8px !important',
        padding: '0.5rem 2rem !important',
        fontWeight: 'bold !important',
        marginTop: '1rem',
        '&:hover': {
            backgroundColor: '#333',
        },
    },
    error: {
        color: '#f44336',
        marginTop: '1rem',
    },
    spinner: {
        marginTop: '1rem',
    },
}));
    

const FileUpload = ({ onUpload }) => {
    const classes = useStyles();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [useCamera, setUseCamera] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select an image');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/analyze-image/', formData);
            onUpload(response.data.recognized_items);
            setError(null);
            setLoading(false);
            // onEcoPoints(response.data.eco_points);
        } catch (err) {
            setError('Failed to upload image');
            setLoading(false);
        }
    };

    const captureImage = (webcamRef) => {
        const imageSrc = webcamRef.current.getScreenshot();
        // Convert base64 image to blob
        fetch(imageSrc)
            .then(res => res.blob())
            .then(blob => {
                const capturedFile = new File([blob], "capture.jpg", { type: "image/jpeg" });
                setFile(capturedFile);
                setUseCamera(false);
            });
    };

    return (
        <Box className={classes.uploadBox}>
        <Box className={classes.buttonGroup}>
            <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className={classes.input} 
                id="file-upload" 
            />
            <label htmlFor="file-upload">
                <Button variant="contained" component="span" className={classes.translucentButton}>
                    Select Image
                </Button>
            </label>
            <Button 
                variant="contained" 
                onClick={() => setUseCamera(true)} 
                className={classes.translucentButton}
            >
                Use Camera
            </Button>
        </Box>
        {useCamera && <WebcamCapture onCapture={captureImage} />}
        <Button 
            onClick={handleUpload} 
            className={classes.solidButton} 
            disabled={loading}
        >
            Upload
        </Button>
        {loading && <CircularProgress className={classes.spinner} />}
        {error && <Typography className={classes.error}>{error}</Typography>}
    </Box>
    );
};

const WebcamCapture = ({ onCapture }) => {
    const webcamRef = React.useRef(null);
    return (
        <Box>
            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
            <Button onClick={() => onCapture(webcamRef)}>Capture</Button>
        </Box>
    );
};

export default FileUpload;