import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LaptopIcon from '@mui/icons-material/Laptop';

export const Header: React.FC = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <LaptopIcon sx={{ mr: 1 }} />
                    <Typography
                        variant="h6"
                        component={RouterLink}
                        to="/"
                        sx={{
                            textDecoration: 'none',
                            color: 'inherit',
                            flexGrow: 1
                        }}
                    >
                        Laptop Store
                    </Typography>
                </Box>

                <Button
                    color="inherit"
                    component={RouterLink}
                    to="/search"
                >
                    SEARCH
                </Button>
            </Toolbar>
        </AppBar>
    );
}; 