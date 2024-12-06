import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { LaptopSpecs } from '../components/LaptopDetail/LaptopSpecs';
import { RelatedLaptops } from '../components/LaptopDetail/RelatedLaptops';
import { ReviewSection } from '../components/LaptopDetail/ReviewSection';
import { getLaptopDetails, getRelatedLaptops } from '../services/api';
import { LaptopDetail, Laptop } from '../types';
import { AxiosError } from 'axios';

interface ErrorResponse {
    detail: string;
}

export const LaptopDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [laptop, setLaptop] = useState<LaptopDetail | null>(null);
    const [relatedLaptops, setRelatedLaptops] = useState<Laptop[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            
            setLoading(true);
            try {
                const [laptopData, relatedData] = await Promise.all([
                    getLaptopDetails(parseInt(id)),
                    getRelatedLaptops(parseInt(id))
                ]);
                setLaptop(laptopData);
                setRelatedLaptops(relatedData);
                setError(null);
            } catch (err) {
                const error = err as AxiosError<ErrorResponse>;
                setError(error.response?.data?.detail ?? 'Failed to load laptop details');
                console.error('Error fetching laptop details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error || !laptop) {
        return (
            <Container maxWidth="lg">
                <Alert severity="error" sx={{ mt: 4 }}>
                    {error || 'Laptop not found'}
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {laptop.brand_name} {laptop.model_name}
                </Typography>
                <Typography variant="h5" color="primary" gutterBottom>
                    ${laptop.price.toLocaleString()}
                </Typography>
                
                <LaptopSpecs laptop={laptop} />
                <ReviewSection 
                    reviews={[]} 
                    onAddReview={async () => {}} 
                />
                <RelatedLaptops 
                    laptops={relatedLaptops}
                    loading={false}
                />
            </Box>
        </Container>
    );
};