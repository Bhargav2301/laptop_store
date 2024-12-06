import React, { useState } from 'react';
import { Box, TextField, Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';
import { SearchFilters as SearchFiltersType } from '../../types';

interface Props {
    filters: SearchFiltersType;
    onFilterChange: (filters: SearchFiltersType) => void;
}

export const SearchFiltersPanel: React.FC<Props> = ({ filters, onFilterChange }) => {
    const [localFilters, setLocalFilters] = useState<SearchFiltersType>(filters);

    const handleChange = (field: keyof SearchFiltersType, value: any) => {
        setLocalFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSearch = () => {
        onFilterChange(localFilters);
    };

    const handleReset = () => {
        const resetFilters: SearchFiltersType = {
            search_term: '',
            min_price: 0,
            max_price: 5000,
            brand_name: '',
            ram_size: undefined
        };
        setLocalFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
            <TextField
                label="Search"
                value={localFilters.search_term}
                onChange={(e) => handleChange('search_term', e.target.value)}
                fullWidth
            />

            <FormControl fullWidth>
                <InputLabel>Brand</InputLabel>
                <Select
                    value={localFilters.brand_name}
                    label="Brand"
                    onChange={(e) => handleChange('brand_name', e.target.value)}
                >
                    <MenuItem value="">All Brands</MenuItem>
                    <MenuItem value="HP">HP</MenuItem>
                    <MenuItem value="Dell">Dell</MenuItem>
                    <MenuItem value="Lenovo">Lenovo</MenuItem>
                    <MenuItem value="Asus">Asus</MenuItem>
                    <MenuItem value="Apple">Apple</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>RAM Size (GB)</InputLabel>
                <Select
                    value={localFilters.ram_size || ''}
                    label="RAM Size (GB)"
                    onChange={(e) => handleChange('ram_size', e.target.value ? Number(e.target.value) : undefined)}
                >
                    <MenuItem value="">Any</MenuItem>
                    <MenuItem value={8}>8 GB</MenuItem>
                    <MenuItem value={16}>16 GB</MenuItem>
                    <MenuItem value={32}>32 GB</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Min Price"
                type="number"
                value={localFilters.min_price}
                onChange={(e) => handleChange('min_price', Number(e.target.value))}
                fullWidth
            />

            <TextField
                label="Max Price"
                type="number"
                value={localFilters.max_price}
                onChange={(e) => handleChange('max_price', Number(e.target.value))}
                fullWidth
            />

            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSearch}
                fullWidth
            >
                Search
            </Button>

            <Button 
                variant="outlined" 
                onClick={handleReset}
                fullWidth
            >
                Reset
            </Button>
        </Box>
    );
};
