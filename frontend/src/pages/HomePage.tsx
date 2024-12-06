import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { LaptopGrid } from '../components/LaptopList/LaptopGrid';
import { getLaptops } from '../services/api';
import { Laptop } from '../types';
import { WelcomeAnimation } from '../components/Welcome/WelcomeAnimation';

export const HomePage: React.FC = () => {
    const [laptops, setLaptops] = useState<Laptop[]>([]);
    const [showWelcome, setShowWelcome] = useState(true);

    const fetchLaptops = async () => {
        const results = await getLaptops(1, 8);
        setLaptops(results);
    };

    useEffect(() => {
        fetchLaptops();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {showWelcome && <WelcomeAnimation />}
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Welcome to Laptop Store
                    </Typography>
                    <Typography variant="h5" component="h2" color="text.secondary" gutterBottom>
                        Find your perfect laptop
                    </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" component="h2" gutterBottom>
                        Featured Laptops
                    </Typography>
                    <LaptopGrid 
                        laptops={laptops} 
                        onReaction={fetchLaptops}  // Refresh data after reaction
                    />
                </Box>
            </Container>
        </>
    );
}; 