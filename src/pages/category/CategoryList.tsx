import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";
import { usePriority } from "../../hooks/usePriority";
export const CategoryList: React.FC = () => {

  const Responsibility = usePriority();

  const { dataGridProps } = useDataGrid();

  const cols = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "Id",
        sortable: true,
      },
      {
        field: "title",
        headerName: "Title",
        flex: 1,
        sortable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        width:150,
        renderCell: function render({ row }) {
          return (
            <Box sx={{ display: "flex" }}>
              <ShowButton hideText recordItemId={row.id} />
              {Responsibility.canEdit && <EditButton hideText recordItemId={row.id} />}
              {Responsibility.canDelete ? <DeleteButton hideText recordItemId={row.id} /> : ''}
            </Box>
          );
        },
      },
    ],
    []
  );

  return (
    <List canCreate={Responsibility.canCreate}>
      <DataGrid {...dataGridProps} columns={cols} autoHeight />
    </List>
  );
};
