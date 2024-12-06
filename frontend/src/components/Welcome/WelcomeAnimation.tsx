import React from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/system';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const WelcomeAnimation: React.FC = () => {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'rgba(0,0,0,0.8)',
                zIndex: 9999,
                animation: `${fadeIn} 2s ease-out forwards`
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    animation: `${fadeIn} 1s ease-out forwards`
                }}
            >
                Welcome to Laptop Store
            </Typography>
        </Box>
    );
}; 