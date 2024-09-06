import {
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, useSelect } from "@refinedev/core";
import React from "react";

export const CreateProduct: React.FC = () => {
  const { onFinish, mutation } = useForm({
    action: "create",
    resource: "products",
  });

  const { options } = useSelect({
    resource: "categories",
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());

    onFinish({
      ...data,
      price: Number(data.price).toFixed(2),
      category: { id: Number(data.category) },
    });
  };

  return (
    <Container maxWidth="xl" sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Create New Product
      </Typography>

      <form onSubmit={onSubmit}>
        <Box mb={2}>
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            required
            sx={{ marginBottom: "16px" }}
          />
        </Box>

        <Box mb={2}>
          <TextField
            id="description"
            name="description"
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            required
            sx={{ marginBottom: "16px" }}
          />
        </Box>

        <Box mb={2}>
          <TextField
            id="price"
            name="price"
            label="Price"
            type="number"
            InputProps={{ inputProps: { step: ".01" } }}
            variant="outlined"
            fullWidth
            required
            sx={{ marginBottom: "16px" }}
          />
        </Box>

        <Box mb={2}>
          <TextField
            id="material"
            name="material"
            label="Material"
            variant="outlined"
            fullWidth
            required
            sx={{ marginBottom: "16px" }}
          />
        </Box>

        <Box mb={2}>
          <TextField
            id="category"
            name="category"
            label="Category"
            select
            variant="outlined"
            fullWidth
            required
            sx={{ marginBottom: "16px" }}
          >
            {options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {mutation.isSuccess && (
          <Typography color="success.main" sx={{ marginBottom: "16px" }}>
            Successfully submitted!
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          {mutation.isLoading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </form>
    </Container>
  );
};

export default CreateProduct;
