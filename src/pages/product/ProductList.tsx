import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";
import { useNavigate } from "react-router-dom";
import { usePriority } from "../../hooks/usePriority";

export const ProductList = () => {
  const Responsibility = usePriority();
  const nav = useNavigate();
  const { dataGridProps } = useDataGrid();
  const { data: categories, isLoading } = useMany({
    resource: "categories",
    ids:
      dataGridProps?.rows?.map((item) => item?.category?.id).filter(Boolean) ??
      [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", type: "number", sortable: true },
      { field: "name", flex: 1, headerName: "Name", sortable: false },
      {
        field: "category",
        flex: 1,
        headerName: "Category",
        renderCell: ({ value }) =>
          isLoading
            ? "Loading..."
            : categories?.data?.find((item) => item.id === value?.id)?.title,
      },
      { field: "material", flex: 1, headerName: "Material" },
      { field: "price", headerName: "Price" },
      {
        field: "actions",
        headerName: "Action",
        flex: 1,
        renderCell: function render({ row }) {
          return (
            <Box sx={{ width: "60%", display: "flex" }}>
              <ShowButton hideText recordItemId={row.id} />
              {Responsibility.canEdit ? (
                <EditButton hideText recordItemId={row.id} />
              ) : (
                ""
              )}
              {Responsibility.canDelete ? (
                <DeleteButton hideText recordItemId={row.id} />
              ) : (
                ""
              )}
            </Box>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [categories?.data, isLoading]
  );

  return (
    <List canCreate={Responsibility.canCreate}>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
