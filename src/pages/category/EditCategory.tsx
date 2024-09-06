import { Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import { useForm, useOne } from "@refinedev/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const EditCategory: React.FC = () => {
    const { id } = useParams();
    const { data: Category, isLoading: categoryLoading } = useOne({
        resource: "categories",
        id,
      });
      const [formValues, setFormValues] = useState({
        name: "",
      });
      const { onFinish, mutation } = useForm({
        action: "edit",
        resource: "categories",
        id,
      });
      useEffect(() => {
        if (Category) {
          setFormValues({
            name: Category?.data?.title || "",
          });
        }
      }, [Category]);
      const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const data = new FormData(event.currentTarget);
        const formData = Object.fromEntries(data.entries());
    
        onFinish({
          ...formData,
        });
      };
    
  return (
    <Container maxWidth="xl" sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Edit Product
      </Typography>
      {categoryLoading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={onSubmit}>
          <Box mb={2}>
            <TextField
              id="title"
              name="title"
              label="Title"
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
