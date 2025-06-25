import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const MyShort = ({ content, image }) => {
    return (
        <Card sx={{
            height: '35vh',
            width: '12vw',
            marginRight: '10px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
        }}>
            {image && (
                <CardMedia
                    component="img"
                    src={image}
                    alt="Short Image"
                    sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
                />
            )}
            <CardContent>
                <Typography variant="body2" color="textSecondary">{content || "Shorts"}</Typography>
            </CardContent>
        </Card>
    );
};

export default MyShort;
