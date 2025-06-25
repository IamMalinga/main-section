// components/CreateEvent.js
import React, { useState, useRef } from 'react';
import { Button, TextField, Typography, Box, Modal } from '@mui/material';
import { useAuthContext } from '../../authentication/hooks/useAuthContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebaseConfig';

const CreateEvent = ({ open, onClose }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const { user } = useAuthContext();

    const handleImageUpload = async (event) => {
        const files = event.target.files;
        const uploadedImages = [];
        for (let file of files) {
            const imageRef = ref(storage, `events/${user.uid}/${file.name}`);
            await uploadBytes(imageRef, file);
            const url = await getDownloadURL(imageRef);
            uploadedImages.push(url);
        }
        setImages(uploadedImages);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Call backend API to create an event
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box>
                <Typography>Create Event</Typography>
                <TextField value={name} onChange={(e) => setName(e.target.value)} placeholder="Event Name" />
                <TextField value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <input type="file" multiple onChange={handleImageUpload} />
                <Button onClick={handleSubmit}>Submit</Button>
            </Box>
        </Modal>
    );
};

export default CreateEvent;
