import React from 'react';
import { Grid, Box, CircularProgress } from '@mui/material';
import { LaptopCard } from './LaptopCard';
import { Laptop } from '../../types';

interface Props {
    laptops: Laptop[];
    loading?: boolean;
    onReaction?: () => void;  // Add callback for refreshing data
}

export const LaptopGrid: React.FC<Props> = ({ laptops, loading, onReaction }) => {
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Grid container spacing={3}>
            {laptops.map((laptop) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={laptop.laptop_id}>
                    <LaptopCard 
                        laptop={laptop} 
                        onReaction={onReaction}
                    />
                </Grid>
            ))}
        </Grid>
    );
};
