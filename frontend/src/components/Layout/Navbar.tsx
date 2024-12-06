import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import LaptopIcon from '@mui/icons-material/Laptop';

export const Navbar: React.FC = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <LaptopIcon sx={{ mr: 1 }} />
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{
                            flexGrow: 1,
                            textDecoration: 'none',
                            color: 'inherit',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        Laptop Store
                    </Typography>
                    <Box>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/search"
                        >
                            Search
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/"
                        >
                            Featured
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};