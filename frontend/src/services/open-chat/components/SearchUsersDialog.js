import React, { useState } from 'react';
import { Dialog, DialogActions, Typography, DialogContent, DialogTitle, TextField, Button, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { useAuthContext } from '../../../authentication/hooks/useAuthContext';

const SearchUsersDialog = ({ open, handleClose, startChat }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuthContext();
    
    const handleSearch = async () => {
        try {
            if (!searchQuery.trim()) {
                setSearchResults([]);
                return;
            }
      
            setLoading(true);
            const response = await fetch('/api/users/search', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({ query: searchQuery }), 
            });
      
            if (!response.ok) {
                throw new Error('Error fetching users');
            }
      
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Error during user search:', error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Search Users</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Search by email or name"
                    type="text"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Search'}
                </Button>

                <List>
                    {searchResults.map((user) => (
                        <ListItem button key={user._id} onClick={() => startChat(user)}>
                            <ListItemText primary={`${user.firstName} ${user.lastName}`} secondary={user.email} />
                        </ListItem>
                    ))}
                </List>
                {searchResults.length === 0 && !loading && (
                    <Typography variant="body2" color="textSecondary">No users found.</Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SearchUsersDialog;
