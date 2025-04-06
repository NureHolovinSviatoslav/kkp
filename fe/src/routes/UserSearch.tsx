import { Delete, Edit } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useUserMutation } from "../features/useUserMutation";
import { useUserQuery } from "../features/useUserQuery";
import { getStyledDataGrid } from "../utils/getStyledDataGrid";

const StyledDataGrid = getStyledDataGrid();

export const UserSearch = () => {
  const query = useUserQuery();
  const mutation = useUserMutation();
  const [error, setError] = useState<string>("");

  const rows = useMemo(() => {
    return query.data || [];
  }, [query.data]);

  const columns = useMemo(() => {
    return [
      {
        field: "username",
        headerName: "Логін",
        type: "string",
        width: 200,
      },
      {
        field: "role",
        headerName: "Роль",
        type: "string",
        width: 200,
      },
      {
        field: "phone",
        headerName: "Телефон",
        type: "string",
        valueFormatter: (params) => {
          return params.value ? params.value : "-";
        },
        width: 300,
      },
      {
        field: "actions",
        headerName: "Дії",
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        width: 85,
        renderCell: (cellValues) => {
          return (
            <>
              <Link to={`/users/update/${cellValues.row.username}`}>
                <IconButton aria-label="edit">
                  <Edit />
                </IconButton>
              </Link>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  setError("");

                  const id = cellValues.row.username;

                  const confirm = window.confirm(`Видалити користувача ${id}?`);

                  if (!confirm) {
                    return;
                  }

                  mutation
                    .mutateAsync({
                      type: "delete",
                      data: { username: id },
                    })
                    .catch((error) => {
                      setError(error.message);
                    });
                }}
              >
                <Delete />
              </IconButton>
            </>
          ) as React.JSX.Element;
        },
      },
    ] as GridColDef[];
  }, [mutation]);

  useEffect(() => {
    if (query.isError) {
      setError((query.error as Error)?.message);
    }
  }, [query.isError, query.error]);

  return (
    <>
      <div
        style={{
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: ".25rem",
          }}
        >
          {
            <div style={{ color: "red" }}>
              {error && <>{`Щось пішло не так: ${error}`}</>}
            </div>
          }

          <Link to="/users/create">
            <Button variant="contained" color="success">
              Зареєструвати користувача
            </Button>
          </Link>
        </div>
      </div>

      <div
        style={{
          height: 550,
          borderRadius: "5px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <StyledDataGrid
          loading={query.isLoading}
          rows={rows}
          getRowId={(row) => row.username}
          columns={columns}
          columnBuffer={3}
          pageSizeOptions={[]}
          getRowHeight={() => "auto"}
          columnHeaderHeight={75}
          rowSelection={false}
          localeText={{
            noRowsLabel: "Даних немає",
          }}
        />
      </div>
    </>
  );
};

export default UserSearch;
