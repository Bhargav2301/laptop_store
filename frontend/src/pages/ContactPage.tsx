import React from 'react';
import { 
    Container, 
    Typography, 
    Paper, 
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

export const ContactPage: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Contact Us
                </Typography>

                <Box sx={{ mb: 4 }}>
                    <Typography paragraph>
                        Have questions about a laptop or need assistance? We're here to help! 
                        Feel free to reach out to us through any of the following channels:
                    </Typography>
                </Box>

                <List>
                    <ListItem>
                        <ListItemIcon>
                            <EmailIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Email" 
                            secondary={
                                <>
                                    vdhara@buffalo.edu<br />
                                    thanmaya@buffalo.edu<br />
                                    lmasimuk@buffalo.edu
                                </>
                            }
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemIcon>
                            <PhoneIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Phone" 
                            secondary="XXXX-XXXX-XXXX"
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemIcon>
                            <LocationOnIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Address" 
                            secondary="State University of New York at Buffalo, Buffalo, NY 14260"
                        />
                    </ListItem>
                </List>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Business Hours
                    </Typography>
                    <Typography>
                        Monday - Friday: 9:00 AM - 6:00 PM (EST)<br />
                        Saturday: 10:00 AM - 4:00 PM (EST)<br />
                        Sunday: Closed
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}; 