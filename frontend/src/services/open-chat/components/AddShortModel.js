import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    IconButton,
    Modal,
    Card,
    CardContent,
    CardActions,
    Typography,
    CircularProgress,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../config/firebaseConfig'; 
import { useAuthContext } from "../../../authentication/hooks/useAuthContext";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddShortModel = ({ open, handleClose, addShort }) => {
    const { user } = useAuthContext(); 
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!content) {
            alert("Content is required");
            return;
        }

        setUploading(true);
        let imageUrl = '';

        if (image) {
            const storageRef = ref(storage, `shorts/${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);

            try {
                imageUrl = await new Promise((resolve, reject) => {
                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {},
                        (error) => {
                            reject(error);
                        },
                        async () => {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            resolve(downloadURL);
                        }
                    );
                });
            } catch (error) {
                setUploading(false);
                return;
            }
        }

        try {
            const response = await fetch('/api/services/open-chat/shorts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({ content, image: imageUrl }),
            });

            if (!response.ok) throw new Error('Failed to add short');

            const result = await response.json();
            addShort(result);
            handleClose();
        } catch (error) {
            console.error(error);
        } finally {
            setUploading(false);
            setContent("");
            setImage(null);
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="add-short-modal-title"
            aria-describedby="add-short-modal-description"
        >
            <Box sx={style}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>Add Short</Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={2}
                            variant="outlined"
                            placeholder="What's on your mind?"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            sx={{ marginBottom: 2 }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton color="primary" component="label">
                                <input hidden type="file" accept="image/*" onChange={handleImageUpload} />
                                <PhotoCamera />
                            </IconButton>
                            {image && <Typography variant="body2" sx={{ marginLeft: 1 }}>{image.name}</Typography>}
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={uploading}>
                            {uploading ? <CircularProgress size={24} /> : 'Add Short'}
                        </Button>
                        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    </CardActions>
                </Card>
            </Box>
        </Modal>
    );
};

export default AddShortModel;
