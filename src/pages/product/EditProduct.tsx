import {
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, useOne, useSelect } from "@refinedev/core";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditProduct: React.FC = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const { data: product, isLoading: productLoading } = useOne({
    resource: "products",
    id,
  });

  const { options } = useSelect({
    resource: "categories",
  });

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    material: "",
    category: "",
  });

  const { onFinish, mutation } = useForm({
    action: "edit",
    resource: "products",
    id,
  });

  useEffect(() => {
    if (product) {
      setFormValues({
        name: product?.data?.name || "",
        description: product?.data?.description || "",
        price: product?.data?.price || "",
        material: product?.data?.material || "",
        category: product?.data?.category?.id || "",
      });
    }
  }, [product]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const formData = Object.fromEntries(data.entries());

    onFinish({
      ...formData,
      price: Number(formData.price).toFixed(2),
      category: { id: Number(formData.category) },
    });
  };

  return (
    <Container maxWidth="xl" sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Edit Product
      </Typography>

      {productLoading ? (
        <CircularProgress />
      ) : (
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
              value={formValues.name}
              onChange={(e) =>
                setFormValues((prev) => ({ ...prev, name: e.target.value }))
              }
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
              value={formValues.description}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
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
              value={formValues.price}
              onChange={(e) =>
                setFormValues((prev) => ({ ...prev, price: e.target.value }))
              }
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
              value={formValues.material}
              onChange={(e) =>
                setFormValues((prev) => ({ ...prev, material: e.target.value }))
              }
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
              value={formValues.category}
              onChange={(e) =>
                setFormValues((prev) => ({ ...prev, category: e.target.value }))
              }
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
              Successfully updated!
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            {mutation.isLoading ? (
              <CircularProgress size={24} />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      )}
    </Container>
  );
};
