import React, { useState } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { Button, Typography, Box } from '@mui/material';

const FileUpload = ({ onUpload }) => {
    const [file, setFile] = useState(null);
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

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/analyze-image/', formData);
            onUpload(response.data.recognized_items);
            setError(null);
            // onEcoPoints(response.data.eco_points);
        } catch (err) {
            setError('Failed to upload image');
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
        <Box>
            <input type="file" accept="image/*" onChange={handleFileChange} hidden={!useCamera} />
            {useCamera ? (
                <WebcamCapture onCapture={captureImage} />
            ) : (
                <Button variant="contained" component="label">
                    Upload Image
                    <input type="file" hidden onChange={handleFileChange} />
                </Button>
            )}
            <Button variant="outlined" onClick={() => setUseCamera(!useCamera)}>
                {useCamera ? 'Stop Camera' : 'Use Camera'}
            </Button>
            <Button variant="contained" onClick={handleUpload}>Upload</Button>
            {error && <Typography color="error">{error}</Typography>}
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