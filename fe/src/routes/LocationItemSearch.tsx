import { Delete, Edit } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useLocationItemMutation } from "../features/useLocationItemMutation";
import { useLocationItemQuery } from "../features/useLocationItemQuery";
import { getStyledDataGrid } from "../utils/getStyledDataGrid";
import { useLocationQuery } from "../features/useLocationQuery";
import { useVaccineQuery } from "../features/useVaccineQuery";

const StyledDataGrid = getStyledDataGrid();

export const LocationItemSearch = () => {
  const locationQuery = useLocationQuery();
  const locations = useMemo(() => {
    return locationQuery.data || [];
  }, [locationQuery.data]);

  const vaccineQuery = useVaccineQuery();
  const vaccines = useMemo(() => {
    return vaccineQuery.data || [];
  }, [vaccineQuery.data]);

  const query = useLocationItemQuery();
  const mutation = useLocationItemMutation();
  const [error, setError] = useState<string>("");

  const rows = useMemo(() => {
    return query.data || [];
  }, [query.data]);

  const columns = useMemo(() => {
    return [
      {
        field: "location_item_id",
        headerName: "ID",
        type: "number",
        width: 100,
        renderCell: (cellValues) => {
          return (
            <Link
              to={`/location-items/${cellValues.row.location_item_id}`}
              className="link"
            >
              {cellValues.value}
            </Link>
          );
        },
      },
      {
        field: "location_id",
        headerName: "Локація",
        type: "number",
        width: 300,
        renderCell: (params) => {
          const location = locations.find(
            (location) => location.location_id === params.value,
          );
          return location ? (
            <Link className="link" to={`/locations/${location.location_id}`}>
              {location.name}
            </Link>
          ) : (
            "-"
          );
        },
      },
      {
        field: "vaccine_id",
        headerName: "Вакцина",
        type: "number",
        width: 150,
        renderCell: (params) => {
          const vaccine = vaccines.find(
            (vaccine) => vaccine.vaccine_id === params.value,
          );

          return vaccine ? (
            <Link className="link" to={`/vaccines/${vaccine.vaccine_id}`}>
              {vaccine.name}
            </Link>
          ) : (
            "-"
          );
        },
      },
      {
        field: "quantity",
        headerName: "Місткість",
        type: "number",
        width: 150,
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
              <Link
                to={`/location-items/update/${cellValues.row.location_item_id}`}
              >
                <IconButton aria-label="edit">
                  <Edit />
                </IconButton>
              </Link>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  setError("");
                  const id = cellValues.row.location_item_id;
                  const confirm = window.confirm(
                    `Видалити елемент локації ${id}?`,
                  );
                  if (!confirm) {
                    return;
                  }
                  mutation
                    .mutateAsync({
                      type: "delete",
                      data: { location_item_id: id },
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
  }, [mutation, locations, vaccines]);

  useEffect(() => {
    if (query.isError) {
      setError((query.error as Error)?.message);
    }
    if (locationQuery.isError) {
      setError((locationQuery.error as Error)?.message);
    }
    if (vaccineQuery.isError) {
      setError((vaccineQuery.error as Error)?.message);
    }
  }, [
    query.isError,
    query.error,
    locationQuery.isError,
    locationQuery.error,
    vaccineQuery.isError,
    vaccineQuery.error,
  ]);

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: ".25rem",
          }}
        >
          <div style={{ color: "red" }}>
            {error && <>{`Щось пішло не так: ${error}`}</>}
          </div>
          <Link to="/location-items/create">
            <Button variant="contained" color="success">
              Додати елемент локації
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
          loading={
            query.isLoading || locationQuery.isLoading || vaccineQuery.isLoading
          }
          rows={rows}
          getRowId={(row) => row.location_item_id}
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

export default LocationItemSearch;
