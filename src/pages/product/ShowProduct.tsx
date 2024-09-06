import React from 'react';
import { Box, CircularProgress, Typography, Card, CardContent, Divider, Button } from "@mui/material";
import { useOne, useShow } from "@refinedev/core";
import { DeleteButton, Show } from "@refinedev/mui";
import { useNavigate } from 'react-router-dom';
import { usePriority } from '../../hooks/usePriority';

export const ShowProduct: React.FC = () => {
    const Responsibility = usePriority()
    const { query } = useShow();
    const record = query?.data?.data;

    const { data: categoryData, isLoading: categoryLoading } = useOne({
        resource: 'categories',
        id: record?.category?.id || "",
        queryOptions: {
            enabled: !!record?.category?.id
        }
    });

    const navigate = useNavigate(); 

    const handleDeleteSuccess = () => {
        navigate('/products'); 
    };

    if (categoryLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Show>
            <Box sx={{ padding: '2%', display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                <Typography variant="h4" gutterBottom>
                    Product Details
                </Typography>
                <Card sx={{ width: '100%', marginTop: '2%' }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            <strong>Product Id:</strong> {record?.id}
                        </Typography>
                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6" gutterBottom>
                            <strong>Product Name:</strong> {record?.name}
                        </Typography>
                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6" gutterBottom>
                            <strong>Product Price:</strong> ${record?.price}
                        </Typography>
                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6" gutterBottom>
                            <strong>Product Description:</strong> {record?.description}
                        </Typography>
                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6" gutterBottom>
                            <strong>Product Material:</strong> {record?.material}
                        </Typography>
                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6">
                            <strong>Product Category:</strong> {categoryData?.data?.title}
                        </Typography>
                    </CardContent>
                  { Responsibility.canDelete ? <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                        <DeleteButton onSuccess={handleDeleteSuccess} />
                    </Box> : ''}
                </Card>
            </Box>
        </Show>
    );
};
    