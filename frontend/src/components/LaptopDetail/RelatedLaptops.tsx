import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { LaptopGrid } from '../LaptopList/LaptopGrid';
import { Laptop } from '../../types';

interface Props {
    laptops: Laptop[];
    loading?: boolean;
}

export const RelatedLaptops: React.FC<Props> = ({ laptops, loading }) => {
    if (laptops.length === 0) return null;

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Similar Laptops
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <LaptopGrid laptops={laptops} loading={loading} />
        </Box>
    );
};