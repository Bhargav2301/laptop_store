import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const Footer: React.FC = () => {
    return (
        <Box 
            component="footer" 
            sx={{ 
                py: 3, 
                px: 2, 
                mt: 'auto',
                backgroundColor: (theme) => theme.palette.grey[200]
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <Typography variant="body2" color="text.secondary">
                        © {new Date().getFullYear()} Laptop Store. All rights reserved.
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <Link 
                            component={RouterLink} 
                            to="/about" 
                            color="inherit" 
                            sx={{ mx: 1 }}
                        >
                            About
                        </Link>
                        |
                        <Link 
                            component={RouterLink} 
                            to="/contact" 
                            color="inherit" 
                            sx={{ mx: 1 }}
                        >
                            Contact
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}; 