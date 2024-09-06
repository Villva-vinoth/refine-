import { Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import { useForm } from "@refinedev/core";

export const CreateCategory: React.FC = () => {
  const { onFinish, mutation } = useForm({
    action: "create",
    resource: "categories",
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());

    onFinish({
      ...data,
    });
  };

  return (
    <Container maxWidth="xl" sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Create New Category
      </Typography>
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
          />
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
