import React from 'react';
import { Paper, Typography, Grid, Divider, Box } from '@mui/material';
import { LaptopDetail } from '../../types';
import { formatRAM, formatStorage } from '../../utils/formatters';

interface Props {
    laptop: LaptopDetail;
}

export const LaptopSpecs: React.FC<Props> = ({ laptop }) => {
    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Specifications
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1"><strong>Brand:</strong> {laptop.brand_name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1"><strong>Model:</strong> {laptop.model_name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1"><strong>Processor:</strong> {laptop.processor_specs}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1"><strong>RAM:</strong> {formatRAM(laptop.ram_gb, laptop.ram_type)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1"><strong>Storage:</strong> {formatStorage(laptop.storage_ssd, laptop.storage_hdd)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1"><strong>GPU:</strong> {laptop.gpu_name} ({laptop.gpu_brand})</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1"><strong>Display:</strong> {laptop.display_type}, {laptop.screen_size}"</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1"><strong>Operating System:</strong> {laptop.os_name}</Typography>
                </Grid>
                {laptop.battery_life_hours && (
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1"><strong>Battery Life:</strong> {laptop.battery_life_hours} hours</Typography>
                    </Grid>
                )}
                {laptop.adapter_watt && (
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1"><strong>Adapter Wattage:</strong> {laptop.adapter_watt} W</Typography>
                    </Grid>
                )}
            </Grid>
        </Paper>
    );
};