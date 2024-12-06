import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { SearchFiltersPanel } from '../components/LaptopList/SearchFilters';
import { LaptopGrid } from '../components/LaptopList/LaptopGrid';
import { searchLaptops } from '../services/api';
import { Laptop, SearchFilters } from '../types';

export const SearchPage: React.FC = () => {
    const [laptops, setLaptops] = useState<Laptop[]>([]);
    const [filters, setFilters] = useState<SearchFilters>({
        search_term: '',
        min_price: 0,
        max_price: 5000,
        brand_name: '',
        ram_size: undefined
    });

    const handleFilterChange = async (newFilters: SearchFilters) => {
        setFilters(newFilters);
        const results = await searchLaptops(newFilters);
        setLaptops(results);
    };

    useEffect(() => {
        handleFilterChange(filters);
    }, []);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Search Laptops
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <SearchFiltersPanel 
                        filters={filters} 
                        onFilterChange={handleFilterChange} 
                    />
                </Grid>
                <Grid item xs={12} md={9}>
                    <LaptopGrid laptops={laptops} />
                </Grid>
            </Grid>
        </Container>
    );
};