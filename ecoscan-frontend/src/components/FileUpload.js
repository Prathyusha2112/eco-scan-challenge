import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography } from '@mui/material';

const FileUpload = ({ onUpload }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select an image');
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/analyze-image/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onUpload(response.data);
        } catch (err) {
            setError('Image recognition failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <Button variant="contained" onClick={handleUpload} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload Image'}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
        </div>
    );
};

export default FileUpload;