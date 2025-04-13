import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";

import { useNotificationQuery } from "../features/useNotificationQuery";
import { getStyledDataGrid } from "../utils/getStyledDataGrid";
import { Link } from "react-router-dom";

const StyledDataGrid = getStyledDataGrid();

export const NotificationSearch = () => {
  const query = useNotificationQuery();
  const [error, setError] = useState<string>("");

  const rows = useMemo(() => {
    return query.data || [];
  }, [query.data]);

  const columns = useMemo(() => {
    return [
      {
        field: "notification_id",
        headerName: "ID",
        type: "number",
        width: 100,
        renderCell: (cellValues) => {
          return (
            <Link
              to={`/notifications/${cellValues.row.notification_id}`}
              className="link"
            >
              {cellValues.value}
            </Link>
          );
        },
      },
      {
        field: "notified_username",
        headerName: "Оператор",
        type: "string",
        width: 200,
        renderCell: (cellValues) => {
          if (!cellValues.value) {
            return "-";
          }

          return (
            <Link
              to={`/users/${cellValues.row.notified_username}`}
              className="link"
            >
              {cellValues.value}
            </Link>
          );
        },
      },
      {
        field: "phone",
        headerName: "Телефон",
        type: "string",
        width: 150,
        renderCell: (cellValues) => {
          if (!cellValues.value) {
            return "-";
          }

          return (
            <a className="link" href={`tel:${cellValues.value}`}>
              {cellValues.value}
            </a>
          );
        },
      },
      {
        field: "sent_at",
        headerName: "Відправлено",
        type: "dateTime",
        width: 200,
        valueFormatter: (params) => {
          return new Date(params.value).toLocaleString();
        },
      },
      {
        field: "message",
        headerName: "Повідомлення",
        type: "string",
        width: 300,
      },
      {
        field: "notification_type",
        headerName: "Тип",
        type: "string",
        width: 150,
      },
    ] as GridColDef[];
  }, []);

  useEffect(() => {
    if (query.isError) {
      setError((query.error as Error)?.message);
    }
  }, [query.isError, query.error]);

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
          getRowId={(row) => row.notification_id}
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

export default NotificationSearch;
