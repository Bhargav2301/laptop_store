import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Laptop } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { api } from '../../services/api';

interface Props {
    laptop: Laptop;
    onReaction?: () => void;
}

export const LaptopCard: React.FC<Props> = ({ laptop, onReaction }) => {
    const handleReaction = async (isLike: boolean, e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await api.post(`/laptops/${laptop.laptop_id}/reaction`, { is_like: isLike });
            if (onReaction) {
                onReaction();
            }
        } catch (error) {
            console.error('Error recording reaction:', error);
        }
    };

    return (
        <Card 
            component={Link} 
            to={`/laptop/${laptop.laptop_id}`}
            sx={{ 
                textDecoration: 'none',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                    boxShadow: 3
                }
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" gutterBottom>
                    {laptop.model_name}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                    {laptop.brand_name}
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        {laptop.processor_specs}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {laptop.ram_gb}GB RAM
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {laptop.gpu_name}
                    </Typography>
                </Box>
                <Typography 
                    variant="h6" 
                    color="primary" 
                    sx={{ mt: 2 }}
                >
                    {formatPrice(laptop.price)}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                    <IconButton 
                        onClick={(e) => handleReaction(true, e)}
                        size="small"
                        color="primary"
                    >
                        <ThumbUp />
                    </IconButton>
                    <IconButton 
                        onClick={(e) => handleReaction(false, e)}
                        size="small"
                        color="error"
                    >
                        <ThumbDown />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};
