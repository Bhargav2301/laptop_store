import React, { useState } from 'react';
import {
    Box,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
    Rating,
    Paper
} from '@mui/material';

interface Review {
    review_id: number;
    review_text: string;
    rating?: number;
}

interface Props {
    reviews: Review[];
    onAddReview: (text: string) => Promise<void>;
}

export const ReviewSection: React.FC<Props> = ({ reviews, onAddReview }) => {
    const [newReview, setNewReview] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!newReview.trim()) return;
        
        setSubmitting(true);
        try {
            await onAddReview(newReview);
            setNewReview('');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Paper sx={{ p: 3, mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Customer Reviews
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    placeholder="Write your review..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    sx={{ mb: 1 }}
                />
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={submitting || !newReview.trim()}
                >
                    Submit Review
                </Button>
            </Box>

            <List>
                {reviews.map((review) => (
                    <ListItem key={review.review_id} divider>
                        <ListItemText
                            primary={
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    {review.rating && (
                                        <Rating value={review.rating} readOnly sx={{ mr: 1 }} />
                                    )}
                                </Box>
                            }
                            secondary={review.review_text}
                        />
                    </ListItem>
                ))}
                {reviews.length === 0 && (
                    <Typography color="text.secondary" align="center">
                        No reviews yet. Be the first to review!
                    </Typography>
                )}
            </List>
        </Paper>
    );
};