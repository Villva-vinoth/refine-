import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { DeleteButton, Show } from "@refinedev/mui";
import React from "react";
import { useNavigate } from "react-router-dom";
import { usePriority } from "../../hooks/usePriority";
export const ShowCategory: React.FC = () => {
  const Responsibility = usePriority();

  const { query } = useShow();
  const record = query?.data?.data;

  const nav = useNavigate();

  const handleDeleteSuccess = () => {
    nav("/categories");
  };

  return (
    <Show>
      <Box
        sx={{
          padding: "2%",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Category Details
        </Typography>
        <Card sx={{ width: "100%", marginTop: "2%" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <strong>Product Id:</strong> {record?.id}
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              <strong>Category Name:</strong> {record?.title}
            </Typography>
            <Divider sx={{ my: 2 }} />
          </CardContent>
          {Responsibility.canDelete && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
              <DeleteButton onSuccess={handleDeleteSuccess} />
            </Box>
          )}
        </Card>
      </Box>
    </Show>
  );
};
