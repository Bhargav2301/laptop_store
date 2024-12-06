import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

export const AboutPage: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    About Laptop Store
                </Typography>
                
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Our Mission
                    </Typography>
                    <Typography paragraph>
                        At Laptop Store, we're dedicated to helping you find the perfect laptop 
                        that matches your needs and budget. We understand that choosing a laptop 
                        is an important decision, and we're here to make that process easier.
                    </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        What We Offer
                    </Typography>
                    <Typography paragraph>
                        • Comprehensive laptop database with detailed specifications<br />
                        • Advanced search functionality to filter by your requirements<br />
                        • Price comparisons across different models<br />
                        • Related laptop suggestions to help you make informed decisions
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="h6" gutterBottom>
                        Our Database
                    </Typography>
                    <Typography paragraph>
                        Our extensive database includes laptops from major manufacturers, 
                        featuring detailed specifications, pricing information, and performance 
                        metrics. We regularly update our database to ensure you have access to 
                        the latest models and accurate information.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}; 